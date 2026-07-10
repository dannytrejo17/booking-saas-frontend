import { useState, useEffect } from "react";
import {
    getMe,
    createBusiness,
    logout,
    getServices,
    createService,
    getEmployees,
    createEmployee,
    getBookings,
} from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [active, setActive] = useState("resumen");
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [serviceDuration, setServiceDuration] = useState("");
    const [employees, setEmployees] = useState([]);
    const [employeeName, setEmployeeName] = useState("");
    const [bookings, setBookings] = useState([]);
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


    const handleCreateService = async (e) => {
        e.preventDefault();
    
        try {
            await createService({
                name: serviceName,
                price: Number(servicePrice),
                duration: Number(serviceDuration)
            });
    
            const data = await getServices();
            setServices(data);
    
            setServiceName("");
            setServicePrice("");
            setServiceDuration("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCreateEmployee = async (e) => {
        e.preventDefault();

        try {
            await createEmployee(employeeName);
            const data = await getEmployees();
            setEmployees(data);
            setEmployeeName("");
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (active !== "empleados") return;
    
        const fetchEmployees = async () => {
            const data = await getEmployees();
            setEmployees(data);
        };
        fetchEmployees();
    }, [active]);



    useEffect(() => {
        if (active !== "reservas") return;
    
        const fetchBookings = async () => {
            const data = await getBookings();
            setBookings(data);
        };
        fetchBookings();
    }, [active]);



    useEffect(() => {
        const fetchUser = async () => {
            const data = await getMe();
            setUser(data);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (active !== "servicios") return;
    
        const fetchServices = async () => {
            const data = await getServices();
            setServices(data);
        };
        fetchServices();
    }, [active]);

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

                    <button
    className={`sidebar-btn ${active === "reservas" ? "active" : ""}`}
    onClick={() => setActive("reservas")}
>
    <span className="sidebar-btn-icon">📅</span>
    Reservas
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
                        <div>
                            <h2>Servicios</h2>

                            <form onSubmit={handleCreateService}>
                                <input
                                    type="text"
                                    placeholder="Nombre del servicio"
                                    value={serviceName}
                                    onChange={(e) => setServiceName(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    value={servicePrice}
                                    onChange={(e) => setServicePrice(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Duración (minutos)"
                                    value={serviceDuration}
                                    onChange={(e) => setServiceDuration(e.target.value)}
                                />
                                <button type="submit">Añadir servicio</button>
                            </form>

                            {services.length === 0 && (
                                <p>No hay servicios todavía</p>
                            )}

                            {services.map((service) => (
                                <div key={service.id} className="dash-card">
                                    <p><strong>{service.name}</strong></p>
                                    <p>Precio: {service.price} €</p>
                                    <p>Duración: {service.duration} min</p>
                                </div>
                            ))}
                        </div>
                    )}



                    {active === "empleados" && (
                        <div>
                            <h2>Empleados</h2>

                            <form onSubmit={handleCreateEmployee}>
                                <input
                                    type="text"
                                    placeholder="Nombre del empleado"
                                    value={employeeName}
                                    onChange={(e) => setEmployeeName(e.target.value)}
                                />
                                <button type="submit">Añadir empleado</button>
                            </form>

                            {employees.length === 0 && (
                                <p>No hay empleados todavía</p>
                            )}

                            {employees.map((employee) => (
                                <div key={employee.id} className="dash-card">
                                    <p><strong>{employee.name}</strong></p>
                                    <p>{employee.active ? "Activo" : "Inactivo"}</p>
                                </div>
                            ))}
                        </div>
                    )}


{active === "reservas" && (
    <div>
        <h2>Reservas</h2>

        {bookings.length === 0 && (
            <p>No hay reservas todavía</p>
        )}

        {bookings.map((booking) => (
            <div key={booking.id} className="dash-card">
                <p><strong>{booking.customerName}</strong></p>
                <p>Servicio: {booking.serviceName}</p>
                <p>Empleado: {booking.employeeName}</p>
                <p>Fecha: {booking.startAt}</p>
                <p>Tel: {booking.customerPhone}</p>
            </div>
        ))}
    </div>
)}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
