import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getPublicBusiness,
    getPublicServices,
    getPublicEmployees,
    getAvailability,
    createPublicBooking,
} from "../services/publicService";
import "./PublicBooking.css";

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function PublicBooking() {
    const { slug } = useParams();
    const [business, setBusiness] = useState(null);
    const [services, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [serviceId, setServiceId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState([]);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [slotsError, setSlotsError] = useState(null);
    const [startAt, setStartAt] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [success, setSuccess] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const now = new Date();
    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
    ].join("-");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const businessData = await getPublicBusiness(slug);
                const servicesData = await getPublicServices(slug);
                const employeesData = await getPublicEmployees(slug);
                setBusiness(businessData);
                setServices(servicesData);
                setEmployees(employeesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    useEffect(() => {
        if (!serviceId || !employeeId || !date) {
            setSlots([]);
            setSlotsError(null);
            setStartAt("");
            return;
        }

        const fetchSlots = async () => {
            setSlotsLoading(true);
            setSlotsError(null);
            try {
                const data = await getAvailability(slug, serviceId, employeeId, date);
                setSlots(data);
                setStartAt("");
            } catch (err) {
                setSlots([]);
                setStartAt("");
                setSlotsError(err.message || "No se pudieron cargar los horarios");
            } finally {
                setSlotsLoading(false);
            }
        };

        fetchSlots();
    }, [slug, serviceId, employeeId, date]);

    if (loading) {
        return (
            <div className="public-loading">
                <div className="public-loading-spinner" />
                <p>Cargando información del negocio...</p>
            </div>
        );
    }

    if (error && !business) {
        return (
            <div className="public-error-page">
                <div className="public-error-card">
                    <span className="public-error-icon">!</span>
                    <h1>No se pudo cargar la página</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!business) {
        return (
            <div className="public-error-page">
                <div className="public-error-card">
                    <span className="public-error-icon">?</span>
                    <h1>Negocio no encontrado</h1>
                    <p>Comprueba que el enlace sea correcto.</p>
                </div>
            </div>
        );
    }

    const selectedService = services.find((s) => String(s.id) === serviceId);
    const selectedEmployee = employees.find((e) => String(e.id) === employeeId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await createPublicBooking(slug, {
                serviceId: Number(serviceId),
                employeeId: Number(employeeId),
                startAt,
                customerName,
                customerPhone,
            });
            setSuccess("¡Reserva confirmada! Te esperamos.");
            setServiceId("");
            setEmployeeId("");
            setDate("");
            setSlots([]);
            setSlotsError(null);
            setStartAt("");
            setCustomerName("");
            setCustomerPhone("");
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const scrollToBooking = () => {
        document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="public-page">
            <header className="public-hero">
                <div
                    className="public-hero-bg"
                    style={
                        business.coverImage
                            ? { backgroundImage: `url(${business.coverImage})` }
                            : undefined
                    }
                    aria-hidden="true"
                />
                <div className="public-hero-inner">
                    <span className="public-badge">Reservas online</span>
                    <h1>{business.name}</h1>
                    <p className="public-hero-subtitle">
                        Reserva tu cita en pocos pasos. Elige servicio, profesional y horario.
                    </p>

                    {(business.email || business.phone || business.address) && (
                        <div className="public-contact">
                            {business.email && (
                                <a href={`mailto:${business.email}`} className="public-contact-chip">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16v16H4z" opacity="0" />
                                        <path d="M4 6l8 6 8-6" />
                                        <rect x="4" y="6" width="16" height="12" rx="2" />
                                    </svg>
                                    {business.email}
                                </a>
                            )}
                            {business.phone && (
                                <a href={`tel:${business.phone}`} className="public-contact-chip">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.18a1 1 0 011 1 11.4 11.4 0 00.57 3.56 1 1 0 01-.24 1z" />
                                    </svg>
                                    {business.phone}
                                </a>
                            )}
                            {business.address && (
                                <span className="public-contact-chip">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>
                                    {business.address}
                                </span>
                            )}
                        </div>
                    )}

                    <button type="button" className="public-hero-cta" onClick={scrollToBooking}>
                        Reservar ahora
                    </button>
                </div>
            </header>

            {business.logo && (
                <div className="public-logo-row">
                    <div className="public-logo-wrap">
                        <img
                            src={business.logo}
                            alt={business.name}
                            className="public-logo"
                        />
                    </div>
                </div>
            )}

            <main className={`public-main${business.logo ? " public-main--with-logo" : ""}`}>
                {services.length > 0 && (
                    <section className="public-section">
                        <div className="public-section-header">
                            <h2>Servicios</h2>
                            <p>Selecciona el servicio que deseas reservar</p>
                        </div>
                        <div className="public-grid">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    type="button"
                                    className={`public-service-card ${String(service.id) === serviceId ? "selected" : ""}`}
                                    onClick={() => setServiceId(String(service.id))}
                                >
                                    <div className="public-service-top">
                                        <h3>{service.name}</h3>
                                        {service.duration && (
                                            <span className="public-service-duration">{service.duration} min</span>
                                        )}
                                    </div>
                                    <p className="public-service-price">
                                        S/ {Number(service.price).toFixed(2)}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {employees.length > 0 && (
                    <section className="public-section">
                        <div className="public-section-header">
                            <h2>Profesionales</h2>
                            <p>Elige con quién quieres tu cita</p>
                        </div>
                        <div className="public-grid public-grid-team">
                            {employees.map((employee) => (
                                <button
                                    key={employee.id}
                                    type="button"
                                    className={`public-team-card ${String(employee.id) === employeeId ? "selected" : ""}`}
                                    onClick={() => setEmployeeId(String(employee.id))}
                                >
                                    <span className="public-team-avatar">{getInitials(employee.name)}</span>
                                    <span className="public-team-name">{employee.name}</span>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                <section className="public-section public-booking-section" id="reservar">
                    <div className="public-booking-layout">
                        <div className="public-booking-intro">
                            <h2>Completa tu reserva</h2>
                            <p>Indica fecha, hora y tus datos de contacto</p>

                            {(selectedService || selectedEmployee) && (
                                <div className="public-booking-summary">
                                    {selectedService && (
                                        <div className="public-summary-item">
                                            <span className="public-summary-label">Servicio</span>
                                            <span className="public-summary-value">{selectedService.name}</span>
                                        </div>
                                    )}
                                    {selectedEmployee && (
                                        <div className="public-summary-item">
                                            <span className="public-summary-label">Profesional</span>
                                            <span className="public-summary-value">{selectedEmployee.name}</span>
                                        </div>
                                    )}
                                    {selectedService && (
                                        <div className="public-summary-item">
                                            <span className="public-summary-label">Precio</span>
                                            <span className="public-summary-value public-summary-price">
                                                S/ {Number(selectedService.price).toFixed(2)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <form className="public-form" onSubmit={handleSubmit}>
                            <div className="public-form-group">
                                <label htmlFor="service-select">Servicio</label>
                                <select
                                    id="service-select"
                                    value={serviceId}
                                    onChange={(e) => setServiceId(e.target.value)}
                                >
                                    <option value="">Selecciona servicio</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name} — S/ {Number(service.price).toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="public-form-group">
                                <label htmlFor="employee-select">Profesional</label>
                                <select
                                    id="employee-select"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                >
                                    <option value="">Selecciona profesional</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="public-form-group">
                                <label htmlFor="booking-date">Fecha</label>
                                <input
                                    id="booking-date"
                                    type="date"
                                    value={date}
                                    min={today}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>

                            {serviceId && employeeId && date && (
                                <div className="public-form-group">
                                    <label>Horario disponible</label>
                                    <div className="public-slots">
                                        {slotsLoading && (
                                            <div className="public-slots-loading">
                                                <div className="public-loading-spinner public-loading-spinner-sm" />
                                                <span>Buscando horarios...</span>
                                            </div>
                                        )}
                                        {!slotsLoading && slotsError && (
                                            <p className="public-slots-empty" role="alert">
                                                {slotsError}
                                            </p>
                                        )}
                                        {!slotsLoading && !slotsError && slots.length === 0 && (
                                            <p className="public-slots-empty">
                                                No hay horarios disponibles para esta fecha
                                            </p>
                                        )}
                                        {!slotsLoading && !slotsError && slots.length > 0 && (
                                            <div className="public-slots-grid">
                                                {slots.map((slot) => (
                                                    <button
                                                        key={slot}
                                                        type="button"
                                                        className={`public-slot-btn ${startAt === slot ? "selected" : ""}`}
                                                        onClick={() => setStartAt(slot)}
                                                    >
                                                        {new Date(slot).toLocaleTimeString("es-ES", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="public-form-divider" />

                            <div className="public-form-group">
                                <label htmlFor="customer-name">Tu nombre</label>
                                <input
                                    id="customer-name"
                                    type="text"
                                    placeholder="Nombre completo"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="public-form-group">
                                <label htmlFor="customer-phone">Teléfono</label>
                                <input
                                    id="customer-phone"
                                    type="tel"
                                    placeholder="600 000 000"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    required
                                />
                            </div>

                            {error && (
                                <p className="public-form-error" role="alert">
                                    {error}
                                </p>
                            )}

                            <button type="submit" disabled={!startAt || submitting}>
                                {submitting ? "Confirmando..." : "Confirmar reserva"}
                            </button>
                        </form>
                    </div>

                    {success && (
                        <div className="public-success" role="status">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            <span>{success}</span>
                        </div>
                    )}
                </section>
            </main>

            <footer className="public-footer">
                <p>© {new Date().getFullYear()} {business.name}</p>
            </footer>
        </div>
    );
}

export default PublicBooking;
