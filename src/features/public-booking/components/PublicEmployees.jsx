function PublicEmployees({ employees, employeeId, setEmployeeId, getInitials }) {
    if (employees.length === 0) {
        return null;
    }

    const anyProfessional = employeeId === "any";

    return (
        <section className="public-section">
            <div className="public-section-header">
                <h2>Profesionales</h2>
                <p>Elige con quién quieres tu cita</p>
            </div>

            <div className="public-grid public-grid-team">
                <button
                    type="button"
                    className={`public-team-card ${anyProfessional ? "selected" : ""}`}
                    onClick={() => setEmployeeId("any")}
                >
                    <span className="public-team-avatar public-team-avatar--any">
                        ?
                    </span>
                    <span className="public-team-name">
                        Cualquier profesional
                    </span>
                </button>

                {employees.map((employee) => (
                    <button
                        key={employee.id}
                        type="button"
                        className={`public-team-card ${
                            String(employee.id) === employeeId ? "selected" : ""
                        }`}
                        onClick={() => setEmployeeId(String(employee.id))}
                    >
                        <span className="public-team-avatar">
                            {getInitials(employee.name)}
                        </span>

                        <span className="public-team-name">
                            {employee.name}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default PublicEmployees;