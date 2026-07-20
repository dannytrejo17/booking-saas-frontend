import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../../services/authService";
import "./Header.css";

function Header({ variant }) {
    const navigate = useNavigate();
    const token = getToken();
    const isLanding = variant === "landing";
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/login");
    };

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        if (!menuOpen) return undefined;

        const onKeyDown = (event) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [menuOpen]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 1024) setMenuOpen(false);
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <header className={`header${isLanding ? " header--landing" : ""}${menuOpen ? " header--menu-open" : ""}`}>
            <Link to="/" className="header-logo" onClick={closeMenu}>
                <img
                    src="/brand/turnexa-logo.png"
                    alt=""
                    className="header-logo-icon"
                    width={36}
                    height={36}
                />
                <span className="header-logo-text">Turnexa</span>
            </Link>

            <div className="header-actions header-actions--desktop">
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

            <button
                type="button"
                className="header-menu-btn"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
            >
                <span />
                <span />
                <span />
            </button>

            {menuOpen && (
                <button
                    type="button"
                    className="header-backdrop"
                    aria-label="Cerrar menú"
                    onClick={closeMenu}
                />
            )}

            <div className={`header-mobile-panel${menuOpen ? " header-mobile-panel--open" : ""}`}>
                <div className="header-mobile-actions">
                    {token ? (
                        <>
                            <Link to="/dashboard" className="header-btn" onClick={closeMenu}>
                                Dashboard
                            </Link>
                            <button className="header-btn header-btn-outline" onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="header-btn header-btn-outline"
                                onClick={() => {
                                    closeMenu();
                                    navigate("/login");
                                }}
                            >
                                Iniciar sesión
                            </button>
                            <Link to="/register" className="header-btn" onClick={closeMenu}>
                                Prueba gratis
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
