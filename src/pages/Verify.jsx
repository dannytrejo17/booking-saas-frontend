import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { verifyCode, resendCode } from "../services/authService";
import "./Register.css";

function Verify() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [resending, setResending] = useState(false);
    const location = useLocation();
    const email = location.state?.email || sessionStorage.getItem("verifyEmail") || "";
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await verifyCode(email, code);
            sessionStorage.removeItem("verifyEmail");
            navigate("/login");
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    const handleResendCode = async () => {

        if(!email || resending) return;

        setError("");
        setSuccess("");
        setResending(true);

        try{
            await resendCode(email);
            setSuccess("Te enviamos un nuevo código. Revisa tu email.");
        }catch(err){
            setError(err.message);
        }finally{
            setResending(false);
        }
    }

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
                    <h2>Un paso más para activar tu cuenta</h2>
                    <p>
                        Introduce el código de verificación para confirmar tu email
                        y empezar a gestionar tu negocio.
                    </p>
                    <div className="register-brand-features">
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Cuenta segura
                        </div>
                        <div className="register-brand-feature">
                            <span>✓</span>
                            Código válido 15 minutos
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
                    <h1>Verifica tu cuenta</h1>
                    {email ? (
                        <p className="register-subtitle">
                            Introduce el código enviado a <strong>{email}</strong>
                        </p>
                    ) : (
                        <p className="register-subtitle">
                            No encontramos tu email. Vuelve a registrarte.
                        </p>
                    )}

                    {email ? (
                        <form className="register-form" onSubmit={handleVerify}>
                            <div className="register-field">
                                <label htmlFor="code">Código de verificación</label>
                                <input
                                    id="code"
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    placeholder="000000"
                                    maxLength={6}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                            <button className="register-button" type="submit">
                                Verificar
                                <span aria-hidden="true">→</span>
                            </button>
                        </form>
                    ) : (
                        <Link to="/register" className="register-button">
                            Ir a registro
                        </Link>
                    )}

                    {email && (
                        <p className="register-footer">
                            ¿No te llegó el código?{" "}
                            <button
                                type="button"
                                className="register-link-btn"
                                onClick={handleResendCode}
                                disabled={resending}
                            >
                                {resending ? "Reenviando..." : "Reenviar código"}
                            </button>
                        </p>
                    )}

                    {success && <p className="register-success">{success}</p>}
                    {error && <p className="register-error">{error}</p>}
                    <p className="register-footer">
                        ¿Ya verificaste? <Link to="/login">Inicia sesión</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Verify;
