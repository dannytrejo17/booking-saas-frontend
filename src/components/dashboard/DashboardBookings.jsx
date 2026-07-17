import { useState, useEffect } from "react";
import {
    getBookings,
    getServices,
    getEmployees,
    createBooking,
    editBooking,
    deleteBooking,
} from "../../services/authService";

function DashboardBookings() {
    const [bookings, setBookings] = useState([]);
    const [services, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [bookingServiceId, setBookingServiceId] = useState("");
    const [bookingEmployeeId, setBookingEmployeeId] = useState("");
    const [bookingStartAt, setBookingStartAt] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [editingBookingId, setEditingBookingId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookingsData, servicesData, employeesData] = await Promise.all([
                    getBookings(),
                    getServices(),
                    getEmployees(),
                ]);
                setBookings(bookingsData);
                setServices(servicesData);
                setEmployees(employeesData);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

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

    const sortedBookings = [...bookings].sort((a, b) =>
        (a.startAt || "").localeCompare(b.startAt || "")
    );

    return (
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
                        <button
                            type="button"
                            className="dash-btn-secondary"
                            onClick={handleCancelEdit}
                        >
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
    );
}

export default DashboardBookings;
