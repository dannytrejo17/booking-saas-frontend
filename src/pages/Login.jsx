import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if(!response.ok){
                throw new Error(`Login falló (${response.status}): ${await response.text()}`);
            }

            const data = await response.json();
            const token = data.token;

            if (!token) {
                throw new Error("El backend respondió OK pero no devolvió token");
            }

            localStorage.setItem("token", token);
            navigate("/");
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
                        <div className="login-logo-icon">R</div>
                        <span className="login-logo-text">ReservaApp</span>
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
                    <p className="login-subtitle">Accede a tu cuenta para gestionar tu negocio</p>
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
                        </div>
                        <button className="login-button" type="submit">
                            Entrar
                            <span aria-hidden="true">→</span>
                        </button>
                    </form>
                    {error && <p className="login-error">{error}</p>}
                    <p className="login-footer">
                        ¿No tienes cuenta? <Link to="/register">Regístrate gratis</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Login;
