import { useState, useEffect } from "react";
import {
    createSchedule,
    getSchedule,
    getEmployees,
    createEmployeeSchedule,
    getEmployeeSchedule,
    deleteSchedule,
    deleteEmployeeSchedule,
} from "../../services/authService";

const dayLabels = {
    MONDAY: "Lunes",
    TUESDAY: "Martes",
    WEDNESDAY: "Miércoles",
    THURSDAY: "Jueves",
    FRIDAY: "Viernes",
    SATURDAY: "Sábado",
    SUNDAY: "Domingo",
};

const dayOrder = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
];


function groupScheduleByDay(items) {
    const result = {};

    for (const item of items) {
        const day = item.dayOfWeek;

        if (!result[day]) {
            result[day] = [];
        }
        result[day].push(item);
    }
    return result;
}

function DashboardSchedules() {
    const [schedule, setSchedule] = useState([]);
    const [scheduleDay, setScheduleDay] = useState("");
    const [scheduleOpen, setScheduleOpen] = useState("");
    const [scheduleClose, setScheduleClose] = useState("");
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
    const [employeeSchedule, setEmployeeSchedule] = useState([]);
    const [empScheduleDay, setEmpScheduleDay] = useState("");
    const [empScheduleOpen, setEmpScheduleOpen] = useState("");
    const [empScheduleClose, setEmpScheduleClose] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [scheduleData, employeesData] = await Promise.all([
                    getSchedule(),
                    getEmployees(),
                ]);
                setSchedule(scheduleData);
                setEmployees(employeesData);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (!selectedEmployeeId) {
            setEmployeeSchedule([]);
            return;
        }

        const fetchEmployeeSchedule = async () => {
            try {
                const data = await getEmployeeSchedule(selectedEmployeeId);
                setEmployeeSchedule(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchEmployeeSchedule();
    }, [selectedEmployeeId]);

    const scheduleByDay = groupScheduleByDay(schedule);
    const employeeScheduleByDay = groupScheduleByDay(employeeSchedule);

    const handleCreateSchedule = async (e) => {
        e.preventDefault();

        if (!scheduleDay || !scheduleOpen || !scheduleClose) {
            setError("Completa día, apertura y cierre");
            return;
        }

        try {
            await createSchedule({
                dayOfWeek: scheduleDay,
                openTime: scheduleOpen,
                closeTime: scheduleClose,
            });

            const data = await getSchedule();
            setSchedule(data);
            setScheduleDay("");
            setScheduleOpen("");
            setScheduleClose("");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteSchedule = async (day) => {
        try {
            await deleteSchedule(day);
            const data = await getSchedule();
            setSchedule(data);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCreateEmployeeSchedule = async (e) => {
        e.preventDefault();

        if (!selectedEmployeeId) {
            setError("Selecciona un empleado");
            return;
        }

        if (!empScheduleDay || !empScheduleOpen || !empScheduleClose) {
            setError("Completa día, apertura y cierre del empleado");
            return;
        }

        try {
            await createEmployeeSchedule(selectedEmployeeId, {
                dayOfWeek: empScheduleDay,
                openTime: empScheduleOpen,
                closeTime: empScheduleClose,
            });

            const data = await getEmployeeSchedule(selectedEmployeeId);
            setEmployeeSchedule(data);
            setEmpScheduleDay("");
            setEmpScheduleOpen("");
            setEmpScheduleClose("");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteEmployeeSchedule = async (day) => {
        try {
            await deleteEmployeeSchedule(selectedEmployeeId, day);
            const data = await getEmployeeSchedule(selectedEmployeeId);
            setEmployeeSchedule(data);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="dash-section">
            <h2 className="dash-section-title">Horarios del negocio</h2>

            <form className="dash-form" onSubmit={handleCreateSchedule}>
                <select
                    value={scheduleDay}
                    onChange={(e) => setScheduleDay(e.target.value)}
                >
                    <option value="">Selecciona día</option>
                    <option value="MONDAY">Lunes</option>
                    <option value="TUESDAY">Martes</option>
                    <option value="WEDNESDAY">Miércoles</option>
                    <option value="THURSDAY">Jueves</option>
                    <option value="FRIDAY">Viernes</option>
                    <option value="SATURDAY">Sábado</option>
                    <option value="SUNDAY">Domingo</option>
                </select>
                <input
                    type="time"
                    value={scheduleOpen}
                    onChange={(e) => setScheduleOpen(e.target.value)}
                />
                <input
                    type="time"
                    value={scheduleClose}
                    onChange={(e) => setScheduleClose(e.target.value)}
                />
                <button type="submit">Añadir horario</button>
            </form>

            {schedule.length === 0 && (
                <p className="dash-empty">No hay horarios del negocio todavía</p>
            )}

            <div className="dash-service-grid">
                {dayOrder
                    .filter((day) => scheduleByDay[day]?.length)
                    .map((day) => (
                        <div key={day} className="dash-service-card">
                            <h3>{dayLabels[day]}</h3>
                            {scheduleByDay[day]
                                .sort((a, b) =>
                                    (a.openTime || "").localeCompare(b.openTime || "")
                                )
                                .map((item) => (
                                    <p key={item.id} className="dash-service-duration">
                                        {item.openTime?.slice(0, 5)} - {item.closeTime?.slice(0, 5)}
                                    </p>
                                ))}
                                 <button
                                type="button"
                                className="dash-btn-delete"
                                onClick={() => handleDeleteSchedule(day)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
            </div>

            <h2 className="dash-section-title" style={{ marginTop: "2.5rem" }}>
                Horarios por empleado
            </h2>

            <form className="dash-form" onSubmit={handleCreateEmployeeSchedule}>
                <select
                    value={selectedEmployeeId}
                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                >
                    <option value="">Selecciona empleado</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
                <select
                    value={empScheduleDay}
                    onChange={(e) => setEmpScheduleDay(e.target.value)}
                >
                    <option value="">Selecciona día</option>
                    <option value="MONDAY">Lunes</option>
                    <option value="TUESDAY">Martes</option>
                    <option value="WEDNESDAY">Miércoles</option>
                    <option value="THURSDAY">Jueves</option>
                    <option value="FRIDAY">Viernes</option>
                    <option value="SATURDAY">Sábado</option>
                    <option value="SUNDAY">Domingo</option>
                </select>
                <input
                    type="time"
                    value={empScheduleOpen}
                    onChange={(e) => setEmpScheduleOpen(e.target.value)}
                />
                <input
                    type="time"
                    value={empScheduleClose}
                    onChange={(e) => setEmpScheduleClose(e.target.value)}
                />
                <button type="submit">Añadir horario empleado</button>
            </form>

            {!selectedEmployeeId && (
                <p className="dash-empty">Selecciona un empleado para ver o añadir horarios</p>
            )}

            {selectedEmployeeId && employeeSchedule.length === 0 && (
                <p className="dash-empty">Este empleado no tiene horarios todavía</p>
            )}

            {selectedEmployeeId && employeeSchedule.length > 0 && (
                <div className="dash-service-grid">
                    {dayOrder
                        .filter((day) => employeeScheduleByDay[day]?.length)
                        .map((day) => (
                            <div key={day} className="dash-service-card">
                                <h3>{dayLabels[day]}</h3>
                                {employeeScheduleByDay[day]
                                    .sort((a, b) =>
                                        (a.openTime || "").localeCompare(b.openTime || "")
                                    )
                                    .map((item) => (
                                        <p key={item.id} className="dash-service-duration">
                                            {item.openTime?.slice(0, 5)} - {item.closeTime?.slice(0, 5)}
                                        </p>
                                    ))}
                                <button
                                    type="button"
                                    className="dash-btn-delete"
                                    onClick={() => handleDeleteEmployeeSchedule(day)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                </div>
            )}

            {error && <p className="dash-error">{error}</p>}
        </div>
    );
}

export default DashboardSchedules;
