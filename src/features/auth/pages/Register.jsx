"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { register } from "../api";
import { getSafeCustomerNextPath } from "../../customer-auth/api";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const next = getSafeCustomerNextPath(searchParams.get("next") || "", "");
        if (next) {
            sessionStorage.setItem("customerAuthNext", next);
        }
    }, [searchParams]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register(name, email, password);
            sessionStorage.setItem("verifyEmail", email);
            router.push("/verify");
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
                    <h2>Crea tu cuenta en Turnexa</h2>
                    <p>
                        Una sola cuenta para gestionar tu negocio o iniciar sesión como cliente.
                    </p>
                    <div className="register-brand-features">
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Una sola cuenta
                        </div>
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Panel de negocio o modo cliente
                        </div>
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Listo en minutos
                        </div>
                    </div>
                </div>
            </aside>

            <main className="register-panel">
                <div className="register-card">
                    <h1>Crear cuenta</h1>
                    <p className="register-subtitle">
                        Crea tu cuenta. Luego podrás gestionar un negocio o iniciar sesión como cliente.
                    </p>
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
                        ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Register;
