import { useState, useEffect } from "react";
import { getMe, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import DashboardOnboarding from "../components/dashboard/DashboardOnboarding";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import DashboardServices from "../components/dashboard/DashboardServices";
import DashboardEmployees from "../components/dashboard/DashboardEmployees";
import DashboardBookings from "../components/dashboard/DashboardBookings";
import DashboardSchedules from "../components/dashboard/DashboardSchedules";
import "./Dashboard.css";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [active, setActive] = useState("resumen");
    const navigate = useNavigate();

    const refreshUser = async () => {
        const data = await getMe();
        setUser(data);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getMe();
            setUser(data);
        };
        fetchUser();
    }, []);

    if (!user) {
        return <div className="dash-loading">Cargando...</div>;
    }

    if (!user.business) {
        return <DashboardOnboarding onBusinessCreated={refreshUser} />;
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard">
            <DashboardSidebar
                user={user}
                active={active}
                onChangeSection={setActive}
                onLogout={handleLogout}
            />

            <main className="dashboard-main">
                <header className="dashboard-topbar">
                    <div>
                        <h1>Hola, {user.name}</h1>
                        <p>Gestiona {user.business.name} desde aquí</p>
                    </div>
                </header>

                <section className="dashboard-content">
                    {active === "resumen" && (
                        <DashboardSummary user={user} onUserUpdate={refreshUser} />
                    )}
                    {active === "servicios" && <DashboardServices />}
                    {active === "empleados" && <DashboardEmployees />}
                    {active === "reservas" && <DashboardBookings />}
                    {active === "horarios" && <DashboardSchedules />}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
