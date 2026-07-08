import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import "./Home.css";

function Home() {
    return (
        <div className="home-page">
            <Header />

            <section className="home-hero">
                <span className="home-badge">Hecho para barberías, estética y spas</span>
                <h1>
                    Más reservas. Menos preocupaciones.{" "}
                    <span>Todo en un solo lugar.</span>
                </h1>
                <p>
                    ReservaApp es la plataforma SaaS que ayuda a barberías, centros de estética
                    y spas a gestionar reservas, clientes y horarios desde un solo panel.
                </p>
                <div className="home-actions">
                    <Link to="/register" className="home-btn-primary">
                        Comenzar prueba gratis
                        <span aria-hidden="true">→</span>
                    </Link>
                    <a href="#features" className="home-btn-secondary">
                        Ver cómo funciona
                    </a>
                </div>
            </section>

            <section className="home-features" id="features">
                <div className="home-feature">
                    <div className="home-feature-icon">📅</div>
                    <h3>Reservas 24/7</h3>
                    <p>Tus clientes reservan online a cualquier hora, sin llamadas ni mensajes.</p>
                </div>
                <div className="home-feature">
                    <div className="home-feature-icon">🔔</div>
                    <h3>Recordatorios automáticos</h3>
                    <p>Reduce ausencias con avisos automáticos por email o SMS.</p>
                </div>
                <div className="home-feature">
                    <div className="home-feature-icon">📊</div>
                    <h3>Reportes y estadísticas</h3>
                    <p>Visualiza reservas, ingresos y servicios más demandados.</p>
                </div>
                <div className="home-feature">
                    <div className="home-feature-icon">💳</div>
                    <h3>Pagos online</h3>
                    <p>Cobra anticipos o pagos completos al reservar.</p>
                </div>
            </section>
        </div>
    );
}

export default Home;
