import { useState, useEffect } from "react";
import {
    getServices,
    getEmployees,
    getBookings,
    uploadBusinessImage,
} from "../../services/authService";

function DashboardSummary({ user, onUserUpdate }) {
    const [services, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const [servicesData, employeesData, bookingsData] = await Promise.all([
                    getServices(),
                    getEmployees(),
                    getBookings(),
                ]);
                setServices(servicesData);
                setEmployees(employeesData);
                setBookings(bookingsData);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchSummary();
    }, []);

    const handleUploadBusinessImage = async (e, type) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            await uploadBusinessImage(file, type);
            await onUserUpdate();
            setError("");
            e.target.value = "";
        } catch (err) {
            setError(err.message);
        }
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
        return booking.startAt.slice(0, 10) === todayLocal;
    }).length;

    return (
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

            <div className="dash-images">
                <h2 className="dash-section-title">Imágenes del negocio</h2>
                <p className="dash-images-hint">
                    JPG, PNG o WEBP. El logo se ve circular en tu página pública; la portada como fondo del hero.
                </p>

                <div className="dash-images-grid">
                    <div className="dash-image-card">
                        <span className="dash-image-card-label">Logo</span>
                        <div className="dash-image-preview dash-image-preview--logo">
                            {user.business.logo ? (
                                <img src={user.business.logo} alt="Logo del negocio" />
                            ) : (
                                <span className="dash-image-placeholder">Sin logo</span>
                            )}
                        </div>
                        <label className="dash-image-btn">
                            {user.business.logo ? "Cambiar logo" : "Subir logo"}
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => handleUploadBusinessImage(e, "logo")}
                            />
                        </label>
                    </div>

                    <div className="dash-image-card">
                        <span className="dash-image-card-label">Portada</span>
                        <div className="dash-image-preview dash-image-preview--cover">
                            {user.business.coverImage ? (
                                <img src={user.business.coverImage} alt="Portada del negocio" />
                            ) : (
                                <span className="dash-image-placeholder">Sin portada</span>
                            )}
                        </div>
                        <label className="dash-image-btn">
                            {user.business.coverImage ? "Cambiar portada" : "Subir portada"}
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => handleUploadBusinessImage(e, "cover")}
                            />
                        </label>
                    </div>
                </div>

                {error && <p className="dash-error">{error}</p>}
            </div>
        </div>
    );
}

export default DashboardSummary;
