"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPassword } from "../api";
import "./Register.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await forgotPassword(email.trim());
            sessionStorage.setItem("resetEmail", email.trim());
            sessionStorage.setItem(
                "resetMessage",
                data?.message || "Si el email existe, te enviamos un codigo de recuperacion"
              );
              router.push("/reset-password");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
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
                    <h2>Recupera el acceso a tu cuenta</h2>
                    <p>
                        Te enviaremos un código a tu email para que puedas crear una nueva contraseña.
                    </p>
                    <div className="register-brand-features">
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Código válido 15 minutos
                        </div>
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Proceso seguro
                        </div>
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Listo en un momento
                        </div>
                    </div>
                </div>
            </aside>

            <main className="register-panel">
                <div className="register-card">
                    <h1>¿Olvidaste tu contraseña?</h1>
                    <p className="register-subtitle">
                        Introduce tu email y te enviaremos un código de recuperación.
                    </p>

                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="register-field">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button className="register-button" type="submit" disabled={loading}>
                            {loading ? "Enviando..." : "Enviar código"}
                            <span aria-hidden="true">→</span>
                        </button>
                    </form>

                    {error && <p className="register-error">{error}</p>}
                    <p className="register-footer">
                        <Link href="/login">Volver a iniciar sesión</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default ForgotPassword;
