import { useState, useEffect } from "react";
import { getEmployees, createEmployee } from "../../services/authService";

function DashboardEmployees() {
    const [employees, setEmployees] = useState([]);
    const [employeeName, setEmployeeName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchEmployees();
    }, []);

    const handleCreateEmployee = async (e) => {
        e.preventDefault();

        try {
            await createEmployee(employeeName);
            const data = await getEmployees();
            setEmployees(data);
            setEmployeeName("");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="dash-section">
            <h2 className="dash-section-title">Empleados</h2>

            <form className="dash-form dash-form-inline" onSubmit={handleCreateEmployee}>
                <input
                    type="text"
                    placeholder="Nombre del empleado"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                />
                <button type="submit">Añadir empleado</button>
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashboardEmployees;
