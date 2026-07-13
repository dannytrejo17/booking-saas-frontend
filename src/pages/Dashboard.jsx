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
    createBooking,
    editBooking,
    deleteBooking,
    createSchedule,
    getSchedule,
    editService,
    deleteService,
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
    const [bookingServiceId, setBookingServiceId] = useState("");
    const [bookingEmployeeId, setBookingEmployeeId] = useState("");
    const [bookingStartAt, setBookingStartAt] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [editingBookingId, setEditingBookingId] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [scheduleDay, setScheduleDay] = useState("");
    const [scheduleOpen, setScheduleOpen] = useState("");
    const [scheduleClose, setScheduleClose] = useState("");
    const [editingServiceId, setEditingServiceId] = useState(null);


    const navigate = useNavigate();

    const clearBookingForm = () => {
        setBookingServiceId("");
        setBookingEmployeeId("");
        setBookingStartAt("");
        setCustomerName("");
        setCustomerPhone("");
        setEditingBookingId(null);
    };

    const getBookingPayload = () => ({
        serviceId: Number(bookingServiceId),
        employeeId: Number(bookingEmployeeId),
        startAt: bookingStartAt,
        customerName,
        customerPhone,
    });

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


    const handleSubmitService = async (e) => {
        e.preventDefault();
    
        try {

            if(editingServiceId) {
            await editService(editingServiceId, {
                name: serviceName,
                price: Number(servicePrice),
                duration: Number(serviceDuration)
            });
    
        }else 
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
            setEditingServiceId(null);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleStartEditService = (service) => {
        setEditingServiceId(service.id);
        setServiceName(service.name);
        setServicePrice(String(service.price));
        setServiceDuration(String(service.duration));
        setError("");
    };

    const handleDeleteService = async (id) => {
        try {
            await deleteService(id);
            const data = await getServices();
            setServices(data);
            setError("");
            if (editingServiceId === id) {
                setServiceName("");
                setServicePrice("");
                setServiceDuration("");
                setEditingServiceId(null);
            }
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


    const handleSubmitBooking = async (e) => {
        e.preventDefault();

        try {
            const payload = getBookingPayload();

            if (editingBookingId) {
                await editBooking(editingBookingId, payload);
            } else {
                await createBooking(payload);
            }

            const data = await getBookings();
            setBookings(data);
            setError("");
            clearBookingForm();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleStartEdit = (booking) => {
        const serviceId =
            booking.serviceId ??
            services.find((s) => s.name === booking.serviceName)?.id;
        const employeeId =
            booking.employeeId ??
            employees.find((e) => e.name === booking.employeeName)?.id;

        setEditingBookingId(booking.id);
        setBookingServiceId(serviceId != null ? String(serviceId) : "");
        setBookingEmployeeId(employeeId != null ? String(employeeId) : "");
        setBookingStartAt(booking.startAt ? booking.startAt.slice(0, 16) : "");
        setCustomerName(booking.customerName || "");
        setCustomerPhone(booking.customerPhone || "");
        setError("");
    };

    const handleCancelEdit = () => {
        clearBookingForm();
        setError("");
    };

    const handleDeleteBooking = async (id) => {
        try {
            await deleteBooking(id);
            const data = await getBookings();
            setBookings(data);
            setError("");
            if (editingBookingId === id) {
                clearBookingForm();
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (active !== "resumen") return;

        const fetchSummary = async () => {
            const [servicesData, employeesData, bookingsData] = await Promise.all([
                getServices(),
                getEmployees(),
                getBookings(),
            ]);
            setServices(servicesData);
            setEmployees(employeesData);
            setBookings(bookingsData);
        };
        fetchSummary();
    }, [active]);

    useEffect(() => {
        if (active !== "reservas") return;
    
        const fetchData = async () => {
            const bookingsData = await getBookings();
            const servicesData = await getServices();
            const employeesData = await getEmployees();
            setBookings(bookingsData);
            setServices(servicesData);
            setEmployees(employeesData);
        };
        fetchData();
    }, [active]);


    useEffect(() => {
        if (active !== "empleados") return;
    
        const fetchEmployees = async () => {
            const data = await getEmployees();
            setEmployees(data);
        };
        fetchEmployees();
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


    const handleCreateSchedule = async (e) => {
        e.preventDefault();

        if (!scheduleDay || !scheduleOpen || !scheduleClose) {
            setError("Completa día, apertura y cierre");
            return;
        }

        try {
            await createSchedule({
                dayOfWeek: scheduleDay,
                openTime: scheduleOpen,
                closeTime: scheduleClose,
            });

            const data = await getSchedule();
            setSchedule(data);
            setScheduleDay("");
            setScheduleOpen("");
            setScheduleClose("");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };


    useEffect(() => {
        if (active !== "horarios") return;
    
        const fetchSchedule = async () => {
            const data = await getSchedule();
            setSchedule(data);
        };
        fetchSchedule();
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

    const todayLocal = (() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    })();

    const todayBookingsCount = bookings.filter((booking) => {
        if (!booking.startAt) return false;
        const bookingDate = booking.startAt.slice(0, 10);
        return bookingDate === todayLocal;
    }).length;

    const sortedBookings = [...bookings].sort((a, b) =>
        (a.startAt || "").localeCompare(b.startAt || "")
    );

    const dayLabels = {
        MONDAY: "Lunes",
        TUESDAY: "Martes",
        WEDNESDAY: "Miércoles",
        THURSDAY: "Jueves",
        FRIDAY: "Viernes",
        SATURDAY: "Sábado",
        SUNDAY: "Domingo",
    };

    const dayOrder = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
    ];

    const scheduleByDay = schedule.reduce((acc, item) => {
        if (!acc[item.dayOfWeek]) {
            acc[item.dayOfWeek] = [];
        }
        acc[item.dayOfWeek].push(item);
        return acc;
    }, {});

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
                    <button
                        className={`sidebar-btn ${active === "horarios" ? "active" : ""}`}
                        onClick={() => setActive("horarios")}
                    >
                        <span className="sidebar-btn-icon">🕐</span>
                        Horarios
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
                        <div className="dash-section">
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
                                    <span className="dash-card-value">/reservar/{user.business.slug}</span>
                                </div>
                            </div>

                            <div className="dash-summary-actions">
                                <a
                                    href={`/reservar/${user.business.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="dash-public-btn"
                                >
                                    Abrir mi página de reservas
                                </a>
                                <p className="dash-public-url">
                                    {window.location.origin}/reservar/{user.business.slug}
                                </p>
                            </div>

                            <div className="dash-stats">
                                <div className="dash-stat-card">
                                    <span className="dash-stat-value">{services.length}</span>
                                    <span className="dash-stat-label">Servicios</span>
                                </div>
                                <div className="dash-stat-card">
                                    <span className="dash-stat-value">{employees.length}</span>
                                    <span className="dash-stat-label">Empleados</span>
                                </div>
                                <div className="dash-stat-card">
                                    <span className="dash-stat-value">{bookings.length}</span>
                                    <span className="dash-stat-label">Reservas</span>
                                </div>
                                <div className="dash-stat-card">
                                    <span className="dash-stat-value">{todayBookingsCount}</span>
                                    <span className="dash-stat-label">Hoy</span>
                                </div>
                            </div>
                        </div>
                    )}


                    {active === "servicios" && (
                        <div className="dash-section">
                            <h2 className="dash-section-title">Servicios</h2>

                            <form className="dash-form" onSubmit={handleSubmitService}>
                                <input
                                    type="text"
                                    placeholder="Nombre del servicio"
                                    value={serviceName}
                                    onChange={(e) => setServiceName(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Precio (€)"
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
                                <p className="dash-empty">No hay servicios todavía</p>
                            )}

                            <div className="dash-service-grid">
                                {services.map((service) => (
                                    <div key={service.id} className="dash-service-card">
                                        <h3>{service.name}</h3>
                                        <p className="dash-service-price">{service.price} €</p>
                                        <p className="dash-service-duration">{service.duration} min</p>
                                        <button
                                        type="button"
                                        className="dash-btn-edit"
                                        onClick={() => handleStartEditService(service)}
                                        > editar</button>
                                        <button
                                        type="button"
                                        className="dash-btn-delete"
                                        onClick={() => handleDeleteService(service.id)}
                                        > eliminar</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}



                    {active === "empleados" && (
                        <div className="dash-section">
                            <h2 className="dash-section-title">Empleados</h2>

                            <form className="dash-form dash-form-inline" onSubmit={handleCreateEmployee}>
                                <input
                                    type="text"
                                    placeholder="Nombre del empleado"
                                    value={employeeName}
                                    onChange={(e) => setEmployeeName(e.target.value)}
                                />
                                <button type="submit">Añadir empleado</button>
                            </form>

                            {employees.length === 0 && (
                                <p className="dash-empty">No hay empleados todavía</p>
                            )}

                            <div className="dash-employee-grid">
                                {employees.map((employee) => (
                                    <div key={employee.id} className="dash-employee-card">
                                        <div className="dash-employee-avatar">
                                            {employee.name.charAt(0).toUpperCase()}
                                        </div>
                                        <h3>{employee.name}</h3>
                                        <span className={`dash-employee-status ${employee.active ? "active" : ""}`}>
                                            {employee.active ? "Activo" : "Inactivo"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {active === "reservas" && (
                        <div className="dash-section">
                            <h2 className="dash-section-title">Reservas</h2>

                            <form className="dash-form dash-form-booking" onSubmit={handleSubmitBooking}>
                                <select
                                    value={bookingServiceId}
                                    onChange={(e) => setBookingServiceId(e.target.value)}
                                >
                                    <option value="">Selecciona servicio</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={bookingEmployeeId}
                                    onChange={(e) => setBookingEmployeeId(e.target.value)}
                                >
                                    <option value="">Selecciona empleado</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.name}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="datetime-local"
                                    value={bookingStartAt}
                                    onChange={(e) => setBookingStartAt(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Nombre del cliente"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                                <input
                                    type="tel"
                                    placeholder="Teléfono del cliente"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                />
                                <div className="dash-form-actions">
                                    <button type="submit">
                                        {editingBookingId ? "Guardar cambios" : "Crear reserva"}
                                    </button>
                                    {editingBookingId && (
                                        <button type="button" className="dash-btn-secondary" onClick={handleCancelEdit}>
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            </form>

                            {error && <p className="dash-error">{error}</p>}

                            {bookings.length === 0 && (
                                <p className="dash-empty">No hay reservas todavía</p>
                            )}

                            <div className="dash-booking-grid">
                                {sortedBookings.map((booking) => (
                                    <div key={booking.id} className="dash-booking-card">
                                        <h3>{booking.customerName}</h3>
                                        <div className="dash-booking-details">
                                            <p><span>Servicio</span>{booking.serviceName}</p>
                                            <p><span>Empleado</span>{booking.employeeName}</p>
                                            <p>
                                                <span>Fecha</span>
                                                {new Date(booking.startAt).toLocaleString("es-ES", {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                })}
                                            </p>
                                            <p><span>Teléfono</span>{booking.customerPhone}</p>
                                        </div>
                                        <div className="dash-booking-actions">
                                            <button
                                                type="button"
                                                className="dash-btn-edit"
                                                onClick={() => handleStartEdit(booking)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="dash-btn-delete"
                                                onClick={() => handleDeleteBooking(booking.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {active === "horarios" && (
                        <div className="dash-section">
                            <h2 className="dash-section-title">Horarios</h2>

                            <form className="dash-form" onSubmit={handleCreateSchedule}>
                                <select
                                    value={scheduleDay}
                                    onChange={(e) => setScheduleDay(e.target.value)}
                                >
                                    <option value="">Selecciona día</option>
                                    <option value="MONDAY">Lunes</option>
                                    <option value="TUESDAY">Martes</option>
                                    <option value="WEDNESDAY">Miércoles</option>
                                    <option value="THURSDAY">Jueves</option>
                                    <option value="FRIDAY">Viernes</option>
                                    <option value="SATURDAY">Sábado</option>
                                    <option value="SUNDAY">Domingo</option>
                                </select>
                                <input
                                    type="time"
                                    value={scheduleOpen}
                                    onChange={(e) => setScheduleOpen(e.target.value)}
                                />
                                <input
                                    type="time"
                                    value={scheduleClose}
                                    onChange={(e) => setScheduleClose(e.target.value)}
                                />
                                <button type="submit">Añadir horario</button>
                            </form>

                            {error && <p className="dash-error">{error}</p>}

                            {schedule.length === 0 && (
                                <p className="dash-empty">No hay horarios todavía</p>
                            )}

                            <div className="dash-service-grid">
                                {dayOrder
                                    .filter((day) => scheduleByDay[day]?.length)
                                    .map((day) => (
                                        <div key={day} className="dash-service-card">
                                            <h3>{dayLabels[day]}</h3>
                                            {scheduleByDay[day]
                                                .sort((a, b) =>
                                                    (a.openTime || "").localeCompare(b.openTime || "")
                                                )
                                                .map((item) => (
                                                    <p key={item.id} className="dash-service-duration">
                                                        {item.openTime?.slice(0, 5)} - {item.closeTime?.slice(0, 5)}
                                                    </p>
                                                ))}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
