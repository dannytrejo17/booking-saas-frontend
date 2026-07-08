import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../../services/authService";


function Header() {
    const navigate = useNavigate();
    const token = getToken();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <div>
            {token ? (
                <button onClick={handleLogout}>Cerrar sesión</button>
            ) : (
                <button onClick={() => navigate("/login")}>Iniciar sesión</button>
            )}
        </div>
    );
}

export default Header;
