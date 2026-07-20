function DashboardSidebar({ user, active, onChangeSection, onLogout, open, onClose }) {
    const handleSection = (section) => {
        onChangeSection(section);
        onClose?.();
    };

    return (
        <>
            {open && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    aria-label="Cerrar menú"
                    onClick={onClose}
                />
            )}

            <aside className={`sidebar${open ? " sidebar--open" : ""}`}>
                <div className="sidebar-brand">
                    <img
                        src="/brand/turnexa-logo.png"
                        alt="Turnexa"
                        className="sidebar-logo"
                        width={42}
                        height={42}
                    />
                    <div>
                        <p className="sidebar-brand-name">{user.business.name}</p>
                        <p className="sidebar-brand-sub">Panel de control</p>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`sidebar-btn ${active === "resumen" ? "active" : ""}`}
                        onClick={() => handleSection("resumen")}
                    >
                        <span className="sidebar-btn-icon">▦</span>
                        Resumen
                    </button>
                    <button
                        className={`sidebar-btn ${active === "servicios" ? "active" : ""}`}
                        onClick={() => handleSection("servicios")}
                    >
                        <span className="sidebar-btn-icon">📋</span>
                        Servicios
                    </button>
                    <button
                        className={`sidebar-btn ${active === "empleados" ? "active" : ""}`}
                        onClick={() => handleSection("empleados")}
                    >
                        <span className="sidebar-btn-icon">👤</span>
                        Empleados
                    </button>
                    <button
                        className={`sidebar-btn ${active === "reservas" ? "active" : ""}`}
                        onClick={() => handleSection("reservas")}
                    >
                        <span className="sidebar-btn-icon">📅</span>
                        Reservas
                    </button>
                    <button
                        className={`sidebar-btn ${active === "horarios" ? "active" : ""}`}
                        onClick={() => handleSection("horarios")}
                    >
                        <span className="sidebar-btn-icon">🕐</span>
                        Horarios
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-avatar">{user.name.charAt(0).toUpperCase()}</div>
                        <div>
                            <p className="sidebar-user-name">{user.name}</p>
                            <p className="sidebar-user-email">{user.email}</p>
                        </div>
                    </div>
                    <button className="sidebar-logout" onClick={onLogout}>
                        Cerrar sesión
                    </button>
                </div>
            </aside>
        </>
    );
}

export default DashboardSidebar;
