import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/login")}>
            Iniciar sesión
        </button>
    );
}

export default Header;