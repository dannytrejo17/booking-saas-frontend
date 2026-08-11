import { formatPrice } from "../../../shared/currency";

function PublicBookingSection({
    services,
    employees,
    serviceId,
    setServiceId,
    employeeId,
    setEmployeeId,
    date,
    setDate,
    startAt,
    setStartAt,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    today,
    slots,
    slotsLoading,
    slotsError,
    selectedService,
    selectedEmployee,
    anyProfessional,
    bookingError,
    submitting,
    success,
    handleSubmit,
    currency,
}) {
    return (
        <section
            className="public-section public-booking-section"
            id="reservar"
        >
            <div className="public-booking-layout">
                <div className="public-booking-intro">
                    <h2>Completa tu reserva</h2>
                    <p>Indica fecha, hora y tus datos de contacto</p>

                    {(selectedService ||
                        selectedEmployee ||
                        anyProfessional) && (
                        <div className="public-booking-summary">
                            {selectedService && (
                                <div className="public-summary-item">
                                    <span className="public-summary-label">
                                        Servicio
                                    </span>
                                    <span className="public-summary-value">
                                        {selectedService.name}
                                    </span>
                                </div>
                            )}

                            {(selectedEmployee || anyProfessional) && (
                                <div className="public-summary-item">
                                    <span className="public-summary-label">
                                        Profesional
                                    </span>
                                    <span className="public-summary-value">
                                        {anyProfessional
                                            ? "Cualquier profesional"
                                            : selectedEmployee.name}
                                    </span>
                                </div>
                            )}

                            {selectedService && (
                                <div className="public-summary-item">
                                    <span className="public-summary-label">
                                        Precio
                                    </span>
                                    <span className="public-summary-value public-summary-price">
                                        {formatPrice(
                                            selectedService.price,
                                            currency
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <form
                    className="public-form"
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const ok = await handleSubmit({
                            serviceId,
                            employeeId,
                            startAt,
                            customerName,
                            customerPhone,
                        });

                        if (ok) {
                            setServiceId("");
                            setEmployeeId("");
                            setDate("");
                            setStartAt("");
                            setCustomerName("");
                            setCustomerPhone("");
                        }
                    }}
                >
                    <div className="public-form-group">
                        <label htmlFor="service-select">
                            Servicio
                        </label>

                        <select
                            id="service-select"
                            value={serviceId}
                            onChange={(e) =>
                                setServiceId(e.target.value)
                            }
                        >
                            <option value="">
                                Selecciona servicio
                            </option>

                            {services.map((service) => (
                                <option
                                    key={service.id}
                                    value={service.id}
                                >
                                    {service.name} —{" "}
                                    {formatPrice(
                                        service.price,
                                        currency
                                    )}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="public-form-group">
                        <label htmlFor="employee-select">
                            Profesional
                        </label>

                        <select
                            id="employee-select"
                            value={employeeId}
                            onChange={(e) =>
                                setEmployeeId(e.target.value)
                            }
                        >
                            <option value="">
                                Selecciona profesional
                            </option>

                            <option value="any">
                                Cualquier profesional
                            </option>

                            {employees.map((employee) => (
                                <option
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="public-form-group">
                        <label htmlFor="booking-date">
                            Fecha
                        </label>

                        <input
                            id="booking-date"
                            type="date"
                            value={date}
                            min={today}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                        />
                    </div>

                    {serviceId && employeeId && date && (
                        <div className="public-form-group">
                            <label>Horario disponible</label>

                            <div className="public-slots">
                                {slotsLoading && (
                                    <div className="public-slots-loading">
                                        <div className="public-loading-spinner public-loading-spinner-sm" />
                                        <span>
                                            Buscando horarios...
                                        </span>
                                    </div>
                                )}

                                {!slotsLoading && slotsError && (
                                    <p
                                        className="public-slots-empty"
                                        role="alert"
                                    >
                                        {slotsError}
                                    </p>
                                )}

                                {!slotsLoading &&
                                    !slotsError &&
                                    slots.length === 0 && (
                                        <p className="public-slots-empty">
                                            No hay horarios disponibles
                                            para esta fecha
                                        </p>
                                    )}

                                {!slotsLoading &&
                                    !slotsError &&
                                    slots.length > 0 && (
                                        <div className="public-slots-grid">
                                            {slots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    className={`public-slot-btn ${
                                                        startAt === slot
                                                            ? "selected"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setStartAt(slot)
                                                    }
                                                >
                                                    {new Date(
                                                        slot
                                                    ).toLocaleTimeString(
                                                        "es-ES",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}

                    <div className="public-form-divider" />

                    <div className="public-form-group">
                        <label htmlFor="customer-name">
                            Tu nombre
                        </label>

                        <input
                            id="customer-name"
                            type="text"
                            placeholder="Nombre completo"
                            value={customerName}
                            onChange={(e) =>
                                setCustomerName(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="public-form-group">
                        <label htmlFor="customer-phone">
                            Teléfono
                        </label>

                        <input
                            id="customer-phone"
                            type="tel"
                            placeholder="600 000 000"
                            value={customerPhone}
                            onChange={(e) =>
                                setCustomerPhone(e.target.value)
                            }
                            required
                        />
                    </div>

                    {bookingError && (
                        <p
                            className="public-form-error"
                            role="alert"
                        >
                            {bookingError}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={!startAt || submitting}
                    >
                        {submitting
                            ? "Confirmando..."
                            : "Confirmar reserva"}
                    </button>
                </form>
            </div>

            {success && (
                <div className="public-success" role="status">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path d="M20 6L9 17l-5-5" />
                    </svg>

                    <span>{success}</span>
                </div>
            )}
        </section>
    );
}

export default PublicBookingSection;