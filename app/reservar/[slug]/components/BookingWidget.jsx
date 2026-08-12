"use client";

import { useState, useEffect, useRef } from "react";
import { getAvailability, createPublicBooking } from "../../../../src/features/public-booking/api";
import { formatPrice } from "../../../../src/shared/currency";

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function formatBookingWhen(startAt) {
    const when = new Date(startAt);
    const dateLabel = when.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
    const timeLabel = when.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${dateLabel} a las ${timeLabel}`;
}

function BookingWidget({ slug, services, employees, currency }) {
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
    const [error, setError] = useState(null);
    const successRef = useRef(null);

    const now = new Date();
    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
    ].join("-");

    useEffect(() => {
        if (!success) return;

        const active = document.activeElement;
        if (active instanceof HTMLElement) {
            active.blur();
        }

        const timer = window.setTimeout(() => {
            successRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 100);

        return () => window.clearTimeout(timer);
    }, [success]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const anyProfessional = employeeId === "any";
            const bookingData = {
                serviceId: Number(serviceId),
                startAt,
                customerName,
                customerPhone,
            };
            if (!anyProfessional) {
                bookingData.employeeId = Number(employeeId);
            }

            await createPublicBooking(slug, bookingData);
            setSuccess(
                `¡Reserva confirmada! Te esperamos el ${formatBookingWhen(startAt)}.`
            );
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

    const selectedService = services.find((s) => String(s.id) === serviceId);
    const selectedEmployee = employees.find((e) => String(e.id) === employeeId);
    const anyProfessional = employeeId === "any";

    return (
        <div className="public-booking-panel">
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
                                    {formatPrice(service.price, currency)}
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
                        <button
                            type="button"
                            className={`public-team-card ${anyProfessional ? "selected" : ""}`}
                            onClick={() => setEmployeeId("any")}
                        >
                            <span className="public-team-avatar public-team-avatar--any">?</span>
                            <span className="public-team-name">Cualquier profesional</span>
                        </button>
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

                        {(selectedService || selectedEmployee || anyProfessional) && (
                            <div className="public-booking-summary">
                                {selectedService && (
                                    <div className="public-summary-item">
                                        <span className="public-summary-label">Servicio</span>
                                        <span className="public-summary-value">{selectedService.name}</span>
                                    </div>
                                )}
                                {(selectedEmployee || anyProfessional) && (
                                    <div className="public-summary-item">
                                        <span className="public-summary-label">Profesional</span>
                                        <span className="public-summary-value">
                                            {anyProfessional ? "Cualquier profesional" : selectedEmployee.name}
                                        </span>
                                    </div>
                                )}
                                {selectedService && (
                                    <div className="public-summary-item">
                                        <span className="public-summary-label">Precio</span>
                                        <span className="public-summary-value public-summary-price">
                                            {formatPrice(selectedService.price, currency)}
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
                                        {service.name} — {formatPrice(service.price, currency)}
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
                                <option value="any">Cualquier profesional</option>
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
                                        <p className="public-slots-empty" role="alert">{slotsError}</p>
                                    )}
                                    {!slotsLoading && !slotsError && slots.length === 0 && (
                                        <p className="public-slots-empty">No hay horarios disponibles para esta fecha</p>
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
                            <p className="public-form-error" role="alert">{error}</p>
                        )}

                        <button type="submit" disabled={!startAt || submitting}>
                            {submitting ? "Confirmando..." : "Confirmar reserva"}
                        </button>

                        {success && (
                            <div
                                ref={successRef}
                                className="public-success"
                                role="status"
                                tabIndex={-1}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                <span>{success}</span>
                            </div>
                        )}
                    </form>
                </div>
            </section>
        </div>
    );
}

export default BookingWidget;
