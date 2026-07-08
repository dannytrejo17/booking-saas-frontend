import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../../services/authService";
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    const token = getToken();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="header">
            <Link to="/" className="header-logo">
                <div className="header-logo-icon">R</div>
                <span className="header-logo-text">ReservaApp</span>
            </Link>

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
