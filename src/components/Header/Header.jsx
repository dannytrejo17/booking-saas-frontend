import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../../services/authService";
import "./Header.css";

function Header({ variant }) {
    const navigate = useNavigate();
    const token = getToken();
    const isLanding = variant === "landing";

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className={`header${isLanding ? " header--landing" : ""}`}>
            <Link to="/" className="header-logo">
                <div className="header-logo-icon">R</div>
                <span className="header-logo-text">ReservaApp</span>
            </Link>

            {isLanding && (
                <nav className="header-nav" aria-label="Navegación principal">
                    <a href="#features" className="header-nav-link">Funciones</a>
                    <a href="#pricing" className="header-nav-link">Precios</a>
                    <a href="#sectors" className="header-nav-link">
                        Sectores
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="#resources" className="header-nav-link">
                        Recursos
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="#contact" className="header-nav-link">Contacto</a>
                </nav>
            )}

            <div className="header-actions">
                {token ? (
                    <>
                        <Link to="/dashboard" className="header-link">Dashboard</Link>
                        <button className="header-btn header-btn-outline" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <>
                        <button className="header-link" onClick={() => navigate("/login")}>
                            Iniciar sesión
                        </button>
                        <Link to="/register" className="header-btn">
                            Prueba gratis
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
