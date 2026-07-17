import { useState } from "react";
import { createBusiness } from "../../services/authService";

function DashboardOnboarding({ onBusinessCreated }) {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleCreateBusiness = async (e) => {
        e.preventDefault();

        try {
            await createBusiness({
                name,
                slug,
                email,
                phone: "",
                address: "",
                logo: "",
            });
            onBusinessCreated();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
    <div className="onboarding-page">
        <div className="onboarding-card">
            <span className="onboarding-badge">Primer paso</span>
            <h1>Crea tu negocio</h1>
            <p className="onboarding-subtitle">
                Configura tu negocio para empezar a gestionar servicios y empleados.
            </p>

            <form className="onboarding-form" onSubmit={handleCreateBusiness}>
                <input
                    type="text"
                    placeholder="Nombre del negocio"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="mi-barberia"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email del negocio"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Crear mi negocio</button>
            </form>

            {error && <p className="onboarding-error">{error}</p>}
        </div>
    </div>
);
}



export default DashboardOnboarding;