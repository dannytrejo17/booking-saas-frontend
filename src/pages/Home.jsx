import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import "./Home.css";

const HERO_FEATURES = [
    { icon: "calendar", label: "Reservas online" },
    { icon: "users", label: "Equipo y horarios" },
    { icon: "chart", label: "Panel de control" },
    { icon: "link", label: "Página pública" },
];

const FEATURES = [
    {
        icon: "calendar",
        title: "Reservas online",
        description:
            "Tus clientes eligen servicio, profesional y horario desde tu enlace público, a cualquier hora.",
    },
    {
        icon: "users",
        title: "Gestión de empleados",
        description:
            "Añade tu equipo, define quién atiende cada cita y organiza la agenda del negocio.",
    },
    {
        icon: "clock",
        title: "Horarios a tu medida",
        description:
            "Configura la apertura del negocio y los turnos de cada empleado para evitar solapes.",
    },
    {
        icon: "link",
        title: "Página pública con tu marca",
        description:
            "Comparte un enlace con logo y portada. Tus clientes reservan sin llamar ni escribir.",
    },
    {
        icon: "chart",
        title: "Resumen en el panel",
        description:
            "Consulta servicios, empleados y reservas del día o del mes desde un solo lugar.",
    },
];

const SECTORS = [
    { id: "barberias", label: "Barberías", icon: "✂️" },
    { id: "estetica", label: "Estética", icon: "💄" },
    { id: "spa", label: "Spa", icon: "🧖" },
    { id: "peluquerias", label: "Peluquerías", icon: "💇" },
    { id: "mas", label: "Y más...", icon: "➕" },
];

const BUSINESS_IMAGES = [
    {
        label: "Barberías",
        src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=420&fit=crop&q=80",
    },
    {
        label: "Estética",
        src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=420&fit=crop&q=80",
    },
    {
        label: "Spa",
        src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=420&fit=crop&q=80",
    },
    {
        label: "Peluquerías",
        src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=420&fit=crop&q=80",
    },
];

const HIGHLIGHTS = [
    {
        icon: "link",
        value: "Enlace propio",
        label: "Página de reservas lista para compartir",
    },
    {
        icon: "clock",
        value: "En minutos",
        label: "Configura servicios, equipo y horarios",
    },
    {
        icon: "users",
        value: "Un solo panel",
        label: "Agenda y negocio en el mismo sitio",
    },
    {
        icon: "calendar",
        value: "Sin tarjeta",
        label: "Empieza gratis y prueba el flujo real",
    },
];

function FeatureIcon({ type }) {
    const icons = {
        calendar: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
        ),
        bell: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
        ),
        chart: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
        ),
        card: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
            </svg>
        ),
        users: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        clock: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
        link: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
        ),
    };

    return <span className="home-icon">{icons[type]}</span>;
}

function Home() {
    return (
        <div className="home-page">
            <Header variant="landing" />

            <section className="home-hero">
                <div className="home-hero-glow" aria-hidden="true" />
                <div className="home-container home-hero-inner">
                    <div className="home-hero-content">
                        <h1>
                            El software de reservas{" "}
                            <span>para hacer crecer tu negocio</span>
                        </h1>
                        <p className="home-hero-subtitle">
                            Gestiona citas, servicios y empleados en un solo panel.
                            Tus clientes reservan online desde tu propio enlace.
                        </p>

                        <div className="home-hero-features">
                            {HERO_FEATURES.map((item) => (
                                <div key={item.label} className="home-hero-feature">
                                    <FeatureIcon type={item.icon} />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="home-hero-actions">
                            <Link to="/register" className="home-btn-primary">
                                Comenzar gratis
                                <span aria-hidden="true">→</span>
                            </Link>
                        </div>

                        <p className="home-hero-trust">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Sin tarjeta. Crea tu cuenta y configura tu negocio hoy.
                        </p>
                    </div>

                    <div className="home-hero-visual" aria-hidden="true">
                        <div className="home-mockup-tablet">
                            <div className="home-mockup-tablet-bar">
                                <span /><span /><span />
                            </div>
                            <div className="home-mockup-dashboard">
                                <div className="home-mockup-sidebar">
                                    <img
                                        src="/brand/turnexa-logo.png"
                                        alt=""
                                        className="home-mockup-logo"
                                        width={28}
                                        height={28}
                                    />
                                    <div className="home-mockup-nav-item active" />
                                    <div className="home-mockup-nav-item" />
                                    <div className="home-mockup-nav-item" />
                                    <div className="home-mockup-nav-item" />
                                </div>
                                <div className="home-mockup-main">
                                    <div className="home-mockup-stats">
                                        <div className="home-mockup-stat">
                                            <span>Reservas hoy</span>
                                            <strong>12</strong>
                                        </div>
                                        <div className="home-mockup-stat">
                                            <span>Servicios</span>
                                            <strong>8</strong>
                                        </div>
                                        <div className="home-mockup-stat">
                                            <span>Equipo</span>
                                            <strong>3</strong>
                                        </div>
                                    </div>
                                    <div className="home-mockup-calendar">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className={`home-mockup-block${i % 3 === 0 ? " purple" : i % 3 === 1 ? " blue" : ""}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="home-mockup-phone">
                            <div className="home-mockup-phone-notch" />
                            <div className="home-mockup-phone-content">
                                <p className="home-mockup-phone-title">Reservar cita</p>
                                <div className="home-mockup-service">
                                    <span>Corte</span>
                                    <strong>S/ 15</strong>
                                </div>
                                <div className="home-mockup-service">
                                    <span>Manicura</span>
                                    <strong>S/ 20</strong>
                                </div>
                                <div className="home-mockup-service">
                                    <span>Masaje</span>
                                    <strong>S/ 35</strong>
                                </div>
                                <div className="home-mockup-phone-btn">Reservar</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-trust">
                <div className="home-container">
                    <p className="home-trust-title">
                        Ideal para negocios locales que viven de las citas
                    </p>
                    <div className="home-trust-logos">
                        <span className="home-trust-logo">Barberías</span>
                        <span className="home-trust-logo">Estética</span>
                        <span className="home-trust-logo">Spas</span>
                        <span className="home-trust-logo">Peluquerías</span>
                        <span className="home-trust-logo">Masajes</span>
                    </div>
                </div>
            </section>

            <section className="home-features-section" id="features">
                <div className="home-container">
                    <div className="home-section-header">
                        <h2>
                            Todo lo esencial{" "}
                            <span>para gestionar tus reservas</span>
                        </h2>
                        <p>
                            Turnexa te ayuda a publicar tu página de citas y a organizar
                            el día a día del negocio sin herramientas separadas.
                        </p>
                    </div>

                    <div className="home-features-grid">
                        {FEATURES.map((feature) => (
                            <article key={feature.title} className="home-feature-card">
                                <FeatureIcon type={feature.icon} />
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="home-businesses" id="sectors">
                <div className="home-container home-businesses-inner">
                    <div className="home-businesses-content">
                        <h2>
                            Pensado para{" "}
                            <span>negocios como el tuyo</span>
                        </h2>
                        <p>
                            Si atiendes con cita previa —barbería, estética, spa o peluquería—
                            puedes configurar servicios, empleados y horarios y empezar a
                            recibir reservas online.
                        </p>

                        <div className="home-sectors">
                            {SECTORS.map((sector) => (
                                <span key={sector.id} className="home-sector">
                                    <span className="home-sector-icon">{sector.icon}</span>
                                    <span>{sector.label}</span>
                                </span>
                            ))}
                        </div>

                        <div className="home-businesses-actions">
                            <Link to="/register" className="home-btn-primary">
                                Crear mi cuenta
                                <span aria-hidden="true">→</span>
                            </Link>
                            <a href="#features" className="home-link-secondary">
                                Ver funciones
                            </a>
                        </div>
                    </div>

                    <div className="home-businesses-grid">
                        {BUSINESS_IMAGES.map((item) => (
                            <figure key={item.label} className="home-business-card">
                                <img src={item.src} alt={item.label} loading="lazy" />
                                <figcaption>{item.label}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            <section className="home-stats" id="start">
                <div className="home-container">
                    <div className="home-stats-grid">
                        {HIGHLIGHTS.map((item) => (
                            <div key={item.label} className="home-stat">
                                <FeatureIcon type={item.icon} />
                                <div>
                                    <strong>{item.value}</strong>
                                    <span>{item.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="home-stats-cta">
                        <p>Estamos en fase de lanzamiento. Empieza gratis y configura tu negocio real.</p>
                        <Link to="/register" className="home-btn-primary">
                            Comenzar ahora
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
