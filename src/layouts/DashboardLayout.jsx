import { useState, useEffect } from "react";
import { getMe, logout } from "../features/auth/api";
import { useNavigate, Outlet } from "react-router-dom";
import Onboarding from "../features/business/components/Onboarding";
import Sidebar from "../features/dashboard/components/Sidebar";
import "../features/dashboard/Dashboard.css";

function DashboardLayout() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const refreshUser = async () => {
        try {
            const data = await getMe();
            setUser(data);
        } catch {
            logout();
            navigate("/login");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe();
                setUser(data);
            } catch {
                logout();
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) {
        return <div className="dash-loading">Cargando...</div>;
    }

    if (!user.business) {
        return <Onboarding onBusinessCreated={refreshUser} />;
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />

            <main className="dashboard-main">
                <header className="dashboard-topbar">
                    <button
                        type="button"
                        className="dashboard-menu-btn"
                        aria-label="Abrir menú"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(true)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <div>
                        <h1>Hola, {user.name}</h1>
                        <p>Gestiona tu negocio de forma fácil y eficiente</p>
                    </div>
                </header>

                <section className="dashboard-content">
                    <Outlet context={{ user, refreshUser }} />
                </section>
            </main>
        </div>
    );
}

export default DashboardLayout;
