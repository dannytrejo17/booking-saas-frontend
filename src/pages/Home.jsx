import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import "./Home.css";

const HERO_FEATURES = [
    { icon: "calendar", label: "Reservas 24/7" },
    { icon: "bell", label: "Recordatorios automáticos" },
    { icon: "chart", label: "Reportes y estadísticas" },
    { icon: "card", label: "Pagos en línea" },
];

const TRUST_LOGOS = [
    "Barbería Classic",
    "Lux Beauty",
    "Spa Natural",
    "Urban Cuts",
    "Bella & Co.",
];

const FEATURES = [
    {
        icon: "calendar",
        title: "Reservas online 24/7",
        description: "Tus clientes reservan a cualquier hora desde tu web o enlace personalizado.",
    },
    {
        icon: "users",
        title: "Gestión de empleados",
        description: "Asigna citas, define horarios y controla la agenda de todo tu equipo.",
    },
    {
        icon: "bell",
        title: "Recordatorios automáticos",
        description: "Reduce ausencias con avisos automáticos por email o SMS antes de cada cita.",
    },
    {
        icon: "chart",
        title: "Reportes y estadísticas",
        description: "Visualiza reservas, ingresos y servicios más demandados en tiempo real.",
    },
    {
        icon: "card",
        title: "Pagos en línea",
        description: "Cobra anticipos o pagos completos al reservar. Integración con Stripe.",
    },
];

const SECTORS = [
    { id: "barberias", label: "Barberías", icon: "✂️" },
    { id: "estetica", label: "Estética", icon: "💄" },
    { id: "spa", label: "Spa", icon: "🧖" },
    { id: "clinicas", label: "Clínicas", icon: "🏥" },
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
        label: "Clínicas",
        src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=420&fit=crop&q=80",
    },
];

const STATS = [
    { icon: "smile", value: "+5,000", label: "Negocios confían en ReservaApp" },
    { icon: "calendar", value: "+1,2M", label: "Reservas realizadas" },
    { icon: "star", value: "4.9/5", label: "Valoración de nuestros clientes" },
    { icon: "trend", value: "+35%", label: "Más reservas para nuestros clientes" },
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
        smile: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
        star: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        trend: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        ),
    };

    return <span className="home-icon">{icons[type]}</span>;
}

function Home() {
    const [activeSector, setActiveSector] = useState("barberias");

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
                            Gestiona tus citas, clientes y empleados en un solo lugar.
                            Más reservas, menos esfuerzo.
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
                            <a href="#features" className="home-btn-demo">
                                <span className="home-play-icon" aria-hidden="true">▶</span>
                                Ver demo
                            </a>
                        </div>

                        <p className="home-hero-trust">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            No necesitas tarjeta de crédito
                        </p>
                    </div>

                    <div className="home-hero-visual" aria-hidden="true">
                        <div className="home-mockup-tablet">
                            <div className="home-mockup-tablet-bar">
                                <span /><span /><span />
                            </div>
                            <div className="home-mockup-dashboard">
                                <div className="home-mockup-sidebar">
                                    <div className="home-mockup-logo">R</div>
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
                                            <span>Ingresos hoy</span>
                                            <strong>€480</strong>
                                        </div>
                                        <div className="home-mockup-stat">
                                            <span>Nuevos clientes</span>
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
                                    <span>Corte de cabello</span>
                                    <strong>€15</strong>
                                </div>
                                <div className="home-mockup-service">
                                    <span>Barba</span>
                                    <strong>€10</strong>
                                </div>
                                <div className="home-mockup-service">
                                    <span>Coloración</span>
                                    <strong>€35</strong>
                                </div>
                                <div className="home-mockup-phone-btn">Reservar</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-trust">
                <div className="home-container">
                    <p className="home-trust-title">Confían en nosotros negocios como el tuyo</p>
                    <div className="home-trust-logos">
                        {TRUST_LOGOS.map((name) => (
                            <span key={name} className="home-trust-logo">{name}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="home-features-section" id="features">
                <div className="home-container">
                    <div className="home-section-header">
                        <h2>
                            Todo lo que necesitas{" "}
                            <span>para gestionar tu negocio</span>
                        </h2>
                        <p>
                            Una plataforma completa para automatizar reservas, reducir ausencias
                            y hacer crecer tu negocio sin complicaciones.
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
                            Diseñado para{" "}
                            <span>negocios como el tuyo</span>
                        </h2>
                        <p>
                            ReservaApp se adapta a barberías, centros de estética, spas y clínicas.
                            Configura servicios, empleados y horarios en minutos.
                        </p>

                        <div className="home-sectors">
                            {SECTORS.map((sector) => (
                                <button
                                    key={sector.id}
                                    type="button"
                                    className={`home-sector${activeSector === sector.id ? " active" : ""}`}
                                    onClick={() => setActiveSector(sector.id)}
                                >
                                    <span className="home-sector-icon">{sector.icon}</span>
                                    <span>{sector.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="home-businesses-actions">
                            <Link to="/register" className="home-btn-primary">
                                Comenzar gratis
                                <span aria-hidden="true">→</span>
                            </Link>
                            <a href="#pricing" className="home-link-secondary">Ver precios</a>
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

            <section className="home-stats">
                <div className="home-container">
                    <div className="home-stats-grid">
                        {STATS.map((stat) => (
                            <div key={stat.label} className="home-stat">
                                <FeatureIcon type={stat.icon} />
                                <div>
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div id="pricing" className="home-anchor" aria-hidden="true" />
            <div id="resources" className="home-anchor" aria-hidden="true" />
            <div id="contact" className="home-anchor" aria-hidden="true" />
        </div>
    );
}

export default Home;
