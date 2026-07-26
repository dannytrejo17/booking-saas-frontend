import { NavLink } from "react-router-dom";

function Sidebar({ user, onLogout, open, onClose }) {
    const handleNav = () => {
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
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) => `sidebar-btn${isActive ? " active" : ""}`}
                        onClick={handleNav}
                    >
                        <span className="sidebar-btn-icon">▦</span>
                        Resumen
                    </NavLink>
                    <NavLink
                        to="/dashboard/servicios"
                        className={({ isActive }) => `sidebar-btn${isActive ? " active" : ""}`}
                        onClick={handleNav}
                    >
                        <span className="sidebar-btn-icon">📋</span>
                        Servicios
                    </NavLink>
                    <NavLink
                        to="/dashboard/empleados"
                        className={({ isActive }) => `sidebar-btn${isActive ? " active" : ""}`}
                        onClick={handleNav}
                    >
                        <span className="sidebar-btn-icon">👤</span>
                        Empleados
                    </NavLink>
                    <NavLink
                        to="/dashboard/reservas"
                        className={({ isActive }) => `sidebar-btn${isActive ? " active" : ""}`}
                        onClick={handleNav}
                    >
                        <span className="sidebar-btn-icon">📅</span>
                        Reservas
                    </NavLink>
                    <NavLink
                        to="/dashboard/horarios"
                        className={({ isActive }) => `sidebar-btn${isActive ? " active" : ""}`}
                        onClick={handleNav}
                    >
                        <span className="sidebar-btn-icon">🕐</span>
                        Horarios
                    </NavLink>
                    <NavLink
                        to="/dashboard/reseñas"
                        className={({ isActive }) => `sidebar-btn${isActive ? " active" : ""}`}
                        onClick={handleNav}
                    >
                        <span className="sidebar-btn-icon">💬</span>
                        Reseñas
                    </NavLink>
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

export default Sidebar;
