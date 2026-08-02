"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "../api";
import "./Login.css";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    useEffect(() => {
        const message = sessionStorage.getItem("loginMessage");
        if (message) {
            setSuccess(message);
            sessionStorage.removeItem("loginMessage");
        }
    }, []);

    const handlelogin = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const session = await login(email, password);
            localStorage.setItem("token", session.token);
            if (session.hasBusiness) {
                router.push("/dashboard");
            } else {
                router.push("/crear-negocio");
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    return (
        <div className="login-page">
            <aside className="login-brand">
                <div className="login-brand-content">
                    <div className="login-logo">
                        <img
                            src="/brand/turnexa-logo.png"
                            alt=""
                            className="login-logo-icon"
                            width={44}
                            height={44}
                        />
                        <span className="login-logo-text" aria-label="Turnexa">
                            Turn<span>exa</span>
                        </span>
                    </div>
                    <h2>Gestiona tu negocio sin complicaciones</h2>
                    <p>
                        Reservas, clientes y horarios en un solo lugar.
                        Pensado para barberías, estética, spas y centros de bienestar.
                    </p>
                    <div className="login-brand-features">
                        <div className="login-brand-feature">
                            <span>✓</span>
                            Reservas online 24/7
                        </div>
                        <div className="login-brand-feature">
                            <span>✓</span>
                            Recordatorios automáticos
                        </div>
                        <div className="login-brand-feature">
                            <span>✓</span>
                            Panel de control intuitivo
                        </div>
                    </div>
                </div>
            </aside>

            <main className="login-panel">
                <div className="login-card">
                    <h1>Iniciar sesión</h1>
                    <p className="login-subtitle">
                        Accede al panel de tu negocio. Si aún no lo creaste, te llevamos a hacerlo.
                    </p>
                    <form className="login-form" onSubmit={handlelogin}>
                        <div className="login-field">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login-field">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="login-forgot">
                                <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
                            </p>
                        </div>
                        <button className="login-button" type="submit">
                            Entrar
                            <span aria-hidden="true">→</span>
                        </button>
                    </form>
                    {success && <p className="login-success">{success}</p>}
                    {error && <p className="login-error">{error}</p>}
                    <p className="login-footer">
                        ¿No tienes cuenta? <Link href="/register">Regístrate gratis</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Login;
