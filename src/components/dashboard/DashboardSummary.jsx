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

    const now = new Date();
    const todayLocal = (() => {
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    })();

    const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const todayBookingsCount = bookings.filter((booking) => {
        if (!booking.startAt) return false;
        return booking.startAt.slice(0, 10) === todayLocal;
    }).length;

    const monthBookingsCount = bookings.filter((booking) => {
        if (!booking.startAt) return false;
        return booking.startAt.slice(0, 7) === monthPrefix;
    }).length;

    return (
        <div className="dash-section">
            <div className="dash-cards dash-cards--info">
                <div className="dash-card dash-card--info">
                    <span className="dash-card-icon dash-card-icon--store" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l1-5h16l1 5" />
                            <path d="M3 9v11h18V9" />
                            <path d="M9 20v-6h6v6" />
                        </svg>
                    </span>
                    <div className="dash-card-text">
                        <span className="dash-card-label">Negocio</span>
                        <span className="dash-card-value">{user.business.name}</span>
                    </div>
                </div>

                <div className="dash-card dash-card--info">
                    <span className="dash-card-icon dash-card-icon--mail" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="M3 7l9 6 9-6" />
                        </svg>
                    </span>
                    <div className="dash-card-text">
                        <span className="dash-card-label">Email</span>
                        <span className="dash-card-value">{user.business.email}</span>
                    </div>
                </div>
            </div>

            <div className="dash-summary-actions">
                <div className="dash-public-card">
                    <span className="dash-public-icon" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                    </span>
                    <div className="dash-public-content">
                        <h3 className="dash-public-title">Tu página de reservas</h3>
                        <p className="dash-public-desc">
                            Comparte este enlace para que tus clientes reserven contigo
                        </p>
                        <a
                            href={`/reservar/${user.business.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dash-public-link"
                        >
                            {window.location.origin}/reservar/{user.business.slug}
                        </a>
                    </div>
                    <a
                        href={`/reservar/${user.business.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dash-public-btn"
                    >
                        Abrir mi página de reservas
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <path d="M15 3h6v6" />
                            <path d="M10 14L21 3" />
                        </svg>
                    </a>
                </div>
            </div>

            <div className="dash-stats">
                <div className="dash-stat-card dash-stat-card--purple">
                    <span className="dash-stat-icon" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                            <path d="M8 13h8M8 17h5" />
                        </svg>
                    </span>
                    <div className="dash-stat-body">
                        <span className="dash-stat-value">{services.length}</span>
                        <span className="dash-stat-label">Servicios</span>
                        <span className="dash-stat-sub">Activos</span>
                    </div>
                </div>

                <div className="dash-stat-card dash-stat-card--green">
                    <span className="dash-stat-icon" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </span>
                    <div className="dash-stat-body">
                        <span className="dash-stat-value">{employees.length}</span>
                        <span className="dash-stat-label">Empleados</span>
                        <span className="dash-stat-sub">En tu equipo</span>
                    </div>
                </div>

                <div className="dash-stat-card dash-stat-card--blue">
                    <span className="dash-stat-icon" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                    </span>
                    <div className="dash-stat-body">
                        <span className="dash-stat-value">{monthBookingsCount}</span>
                        <span className="dash-stat-label">Reservas</span>
                        <span className="dash-stat-sub">Este mes</span>
                    </div>
                </div>

                <div className="dash-stat-card dash-stat-card--orange">
                    <span className="dash-stat-icon" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                    </span>
                    <div className="dash-stat-body">
                        <span className="dash-stat-value">{todayBookingsCount}</span>
                        <span className="dash-stat-label">Reservas</span>
                        <span className="dash-stat-sub">Hoy</span>
                    </div>
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
