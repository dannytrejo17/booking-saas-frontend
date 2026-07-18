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
                    <a href="#sectors" className="header-nav-link">Sectores</a>
                    <a href="#start" className="header-nav-link">Empezar</a>
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
