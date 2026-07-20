import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register(name, email, password);
            sessionStorage.setItem("verifyEmail", email);
            navigate("/verify", { state: { email } });
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    return (
        <div className="register-page">
            <aside className="register-brand">
                <div className="register-brand-content">
                    <div className="register-logo">
                        <img
                            src="/brand/turnexa-logo.png"
                            alt=""
                            className="register-logo-icon"
                            width={44}
                            height={44}
                        />
                        <span className="register-logo-text" aria-label="Turnexa">
                            Turn<span>exa</span>
                        </span>
                    </div>
                    <h2>Empieza a gestionar tu negocio hoy</h2>
                    <p>
                        Crea tu cuenta gratis y centraliza reservas, clientes y horarios.
                        Pensado para barberías, estética, spas y centros de bienestar.
                    </p>
                    <div className="register-brand-features">
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Sin tarjeta de crédito
                        </div>
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Listo en minutos
                        </div>
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Cancela cuando quieras
                        </div>
                    </div>
                </div>
            </aside>

            <main className="register-panel">
                <div className="register-card">
                    <h1>Crear cuenta</h1>
                    <p className="register-subtitle">Regístrate para empezar a gestionar tu negocio</p>
                    <form className="register-form" onSubmit={handleRegister}>
                        <div className="register-field">
                            <label htmlFor="name">Nombre</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="register-field">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="register-field">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="register-button" type="submit">
                            Crear cuenta
                            <span aria-hidden="true">→</span>
                        </button>
                    </form>
                    {error && <p className="register-error">{error}</p>}
                    <p className="register-footer">
                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Register;
