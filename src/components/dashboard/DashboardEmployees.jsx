import { useState, useEffect } from "react";
import {
    getEmployees,
    createEmployee,
    editEmployee,
    deleteEmployee,
} from "../../services/authService";

function DashboardEmployees() {
    const [employees, setEmployees] = useState([]);
    const [employeeName, setEmployeeName] = useState("");
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [error, setError] = useState("");

    const loadEmployees = async () => {
        const data = await getEmployees();
        setEmployees(data);
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                await loadEmployees();
            } catch (err) {
                setError(err.message);
            }
        };
        fetchEmployees();
    }, []);

    const clearForm = () => {
        setEmployeeName("");
        setEditingEmployeeId(null);
    };

    const handleSubmitEmployee = async (e) => {
        e.preventDefault();

        try {
            if (editingEmployeeId) {
                const current = employees.find((emp) => emp.id === editingEmployeeId);
                await editEmployee(editingEmployeeId, {
                    name: employeeName,
                    active: current?.active ?? true,
                });
            } else {
                await createEmployee(employeeName);
            }

            await loadEmployees();
            clearForm();
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleStartEdit = (employee) => {
        setEditingEmployeeId(employee.id);
        setEmployeeName(employee.name);
        setError("");
    };

    const handleToggleActive = async (employee) => {
        try {
            await editEmployee(employee.id, {
                name: employee.name,
                active: !employee.active,
            });
            await loadEmployees();
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteEmployee = async (id) => {
        const confirmed = window.confirm(
            "¿Eliminar este empleado? Esta acción no se puede deshacer."
        );
        if (!confirmed) return;

        try {
            await deleteEmployee(id);
            await loadEmployees();
            if (editingEmployeeId === id) {
                clearForm();
            }
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="dash-section">
            <h2 className="dash-section-title">Empleados</h2>

            <form className="dash-form dash-form-inline" onSubmit={handleSubmitEmployee}>
                <input
                    type="text"
                    placeholder="Nombre del empleado"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    required
                />
                <button type="submit">
                    {editingEmployeeId ? "Guardar cambios" : "Añadir empleado"}
                </button>
                {editingEmployeeId && (
                    <button
                        type="button"
                        className="dash-btn-secondary"
                        onClick={clearForm}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            {error && <p className="dash-error">{error}</p>}

            {employees.length === 0 && (
                <p className="dash-empty">No hay empleados todavía</p>
            )}

            <div className="dash-employee-grid">
                {employees.map((employee) => (
                    <div key={employee.id} className="dash-employee-card">
                        <div className="dash-employee-avatar">
                            {employee.name.charAt(0).toUpperCase()}
                        </div>
                        <h3>{employee.name}</h3>
                        <span className={`dash-employee-status ${employee.active ? "active" : ""}`}>
                            {employee.active ? "Activo" : "Inactivo"}
                        </span>
                        <div className="dash-employee-actions">
                            <button
                                type="button"
                                className="dash-btn-edit"
                                onClick={() => handleStartEdit(employee)}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="dash-btn-secondary"
                                onClick={() => handleToggleActive(employee)}
                            >
                                {employee.active ? "Desactivar" : "Activar"}
                            </button>
                            <button
                                type="button"
                                className="dash-btn-delete"
                                onClick={() => handleDeleteEmployee(employee.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashboardEmployees;
