import { useState, useEffect } from "react";
import { getMe, createBusiness, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [active, setActive] = useState("resumen");
    const navigate = useNavigate();

    const handleCreateBusiness = async (e) => {
        e.preventDefault();

        try {
            await createBusiness({ name, slug, email, phone: "", address: "", logo: "" });
            const data = await getMe();
            setUser(data);
        } catch (err) {
            setError(err.message);
        }
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
        return (
            <div className="onboarding-page">
                <div className="onboarding-card">
                    <span className="onboarding-badge">Primer paso</span>
                    <h1>Crea tu negocio</h1>
                    <p className="onboarding-subtitle">
                        Configura tu negocio para empezar a gestionar servicios y empleados.
                    </p>
                    <form className="onboarding-form" onSubmit={handleCreateBusiness}>
                        <input
                            type="text"
                            placeholder="Nombre del negocio"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="mi-barberia"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email del negocio"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit">Crear mi negocio</button>
                    </form>
                    {error && <p className="onboarding-error">{error}</p>}
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <div className="sidebar-logo">R</div>
                    <div>
                        <p className="sidebar-brand-name">{user.business.name}</p>
                        <p className="sidebar-brand-sub">Panel de control</p>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`sidebar-btn ${active === "resumen" ? "active" : ""}`}
                        onClick={() => setActive("resumen")}
                    >
                        <span className="sidebar-btn-icon">▦</span>
                        Resumen
                    </button>
                    <button
                        className={`sidebar-btn ${active === "servicios" ? "active" : ""}`}
                        onClick={() => setActive("servicios")}
                    >
                        <span className="sidebar-btn-icon">✂</span>
                        Servicios
                    </button>
                    <button
                        className={`sidebar-btn ${active === "empleados" ? "active" : ""}`}
                        onClick={() => setActive("empleados")}
                    >
                        <span className="sidebar-btn-icon">👤</span>
                        Empleados
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
                    <button className="sidebar-logout" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-topbar">
                    <div>
                        <h1>Hola, {user.name}</h1>
                        <p>Gestiona {user.business.name} desde aquí</p>
                    </div>
                </header>

                <section className="dashboard-content">
                    {active === "resumen" && (
                        <div className="dash-cards">
                            <div className="dash-card">
                                <span className="dash-card-label">Negocio</span>
                                <span className="dash-card-value">{user.business.name}</span>
                            </div>
                            <div className="dash-card">
                                <span className="dash-card-label">Email</span>
                                <span className="dash-card-value">{user.business.email}</span>
                            </div>
                            <div className="dash-card">
                                <span className="dash-card-label">URL pública</span>
                                <span className="dash-card-value">/{user.business.slug}</span>
                            </div>
                        </div>
                    )}

                    {active === "servicios" && (
                        <div className="dash-placeholder">
                            <h2>Servicios</h2>
                            <p>Aquí podrás crear y gestionar tus servicios. (Próximo paso)</p>
                        </div>
                    )}

                    {active === "empleados" && (
                        <div className="dash-placeholder">
                            <h2>Empleados</h2>
                            <p>Aquí podrás gestionar tu equipo. (Próximo paso)</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
