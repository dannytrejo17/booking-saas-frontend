import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../api";
import "./Register.css";

function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || sessionStorage.getItem("resetEmail") || "";
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(location.state?.message || "");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres");
            return;
        }
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);
        try {
            await resetPassword(email, code.trim(), password);
            sessionStorage.removeItem("resetEmail");
            navigate("/login", {
                state: { message: "Contraseña actualizada. Ya puedes iniciar sesión." },
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email || resending) return;
        setError("");
        setSuccess("");
        setResending(true);
        try {
            const data = await forgotPassword(email);
            setSuccess(data?.message || "Si el email existe, te enviamos un codigo de recuperacion");
        } catch (err) {
            setError(err.message);
        } finally {
            setResending(false);
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
                    <h2>Crea tu nueva contraseña</h2>
                    <p>
                        Usa el código que te enviamos por email y elige una contraseña nueva.
                    </p>
                    <div className="register-brand-features">
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Mínimo 8 caracteres
                        </div>
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Código de un solo uso
                        </div>
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Acceso inmediato después
                        </div>
                    </div>
                </div>
            </aside>

            <main className="register-panel">
                <div className="register-card">
                    <h1>Nueva contraseña</h1>
                    {email ? (
                        <p className="register-subtitle">
                            Código enviado a <strong>{email}</strong>
                        </p>
                    ) : (
                        <p className="register-subtitle">
                            No encontramos tu email. Vuelve a solicitar el código.
                        </p>
                    )}

                    {email ? (
                        <form className="register-form" onSubmit={handleSubmit}>
                            <div className="register-field">
                                <label htmlFor="code">Código</label>
                                <input
                                    id="code"
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    placeholder="000000"
                                    maxLength={6}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="register-field">
                                <label htmlFor="password">Nueva contraseña</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Mínimo 8 caracteres"
                                    minLength={8}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="register-field">
                                <label htmlFor="confirm-password">Confirmar contraseña</label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Repite la contraseña"
                                    minLength={8}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="register-button" type="submit" disabled={loading}>
                                {loading ? "Guardando..." : "Actualizar contraseña"}
                                <span aria-hidden="true">→</span>
                            </button>
                        </form>
                    ) : (
                        <Link to="/forgot-password" className="register-button">
                            Pedir código
                        </Link>
                    )}

                    {email && (
                        <p className="register-footer">
                            ¿No te llegó el código?{" "}
                            <button
                                type="button"
                                className="register-link-btn"
                                onClick={handleResend}
                                disabled={resending}
                            >
                                {resending ? "Reenviando..." : "Reenviar código"}
                            </button>
                        </p>
                    )}

                    {success && <p className="register-success">{success}</p>}
                    {error && <p className="register-error">{error}</p>}
                    <p className="register-footer">
                        <Link to="/login">Volver a iniciar sesión</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default ResetPassword;
