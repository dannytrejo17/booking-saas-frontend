"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { customerLogin, setCustomerToken, getSafeCustomerNextPath } from "../api";
import "../../auth/pages/Login.css";

function CustomerLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next") || "";
    const safeNext = getSafeCustomerNextPath(next);

    useEffect(() => {
        const message = sessionStorage.getItem("customerLoginMessage");
        if (message) {
            setSuccess(message);
            sessionStorage.removeItem("customerLoginMessage");
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const token = await customerLogin(email, password);
            setCustomerToken(token);
            const [path] = safeNext.split("#");
            router.push(path || "/cliente");
        } catch (err) {
            setError(err.message);
        }
    };

    const registerHref =
        safeNext !== "/cliente"
            ? `/register?next=${encodeURIComponent(safeNext)}`
            : "/register";

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
                    <h2>Tu cuenta de cliente</h2>
                    <p>
                        Inicia sesión para dejar reseñas y seguir a tus negocios favoritos.
                    </p>
                    <div className="login-brand-features">
                        <div className="login-brand-feature">
                            <span>✓</span>
                            Deja reseñas en los negocios
                        </div>
                        <div className="login-brand-feature">
                            <span>✓</span>
                            Explora y reserva online
                        </div>
                        <div className="login-brand-feature">
                            <span>✓</span>
                            Misma cuenta que tu negocio
                        </div>
                    </div>
                </div>
            </aside>

            <main className="login-panel">
                <div className="login-card">
                    <h1>Iniciar sesión</h1>
                    <p className="login-subtitle">
                        Usa el mismo email y contraseña si ya tienes cuenta.
                    </p>
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="login-field">
                            <label htmlFor="customer-email">Email</label>
                            <input
                                id="customer-email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-field">
                            <label htmlFor="customer-password">Contraseña</label>
                            <input
                                id="customer-password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="login-button" type="submit">
                            Entrar
                            <span aria-hidden="true">→</span>
                        </button>
                    </form>
                    {success && <p className="login-success">{success}</p>}
                    {error && <p className="login-error">{error}</p>}
                    <p className="login-footer">
                        ¿No tienes cuenta? <Link href={registerHref}>Regístrate</Link>
                    </p>
                    <p className="login-footer">
                        ¿Eres dueño de un negocio? <Link href="/login">Entrar al panel</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default CustomerLogin;
