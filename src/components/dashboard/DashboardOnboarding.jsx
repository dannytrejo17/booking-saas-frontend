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

    const handleSlugChange = (e) => {
        const value = e.target.value
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
        setSlug(value);
    };

    const slugPreview = slug || "mi-barberia";

    return (
        <div className="onboarding-page">
            <div className="onboarding-card">
                <span className="onboarding-badge">Primer paso</span>
                <h1>Crea tu negocio</h1>
                <p className="onboarding-subtitle">
                    Configura tu negocio para empezar a gestionar servicios y empleados.
                </p>

                <form className="onboarding-form" onSubmit={handleCreateBusiness}>
                    <div className="onboarding-field">
                        <label htmlFor="business-name">Nombre del negocio</label>
                        <p className="onboarding-hint">
                            Cómo se verá en tu página. Ejemplo: Barbería Norte
                        </p>
                        <input
                            id="business-name"
                            type="text"
                            placeholder="Barbería Norte"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="onboarding-field">
                        <label htmlFor="business-slug">Enlace público (URL)</label>
                        <p className="onboarding-hint">
                            Solo minúsculas, números y guiones. Es lo que irá en la dirección web para que tus clientes reserven.
                        </p>
                        <input
                            id="business-slug"
                            type="text"
                            placeholder="mi-barberia"
                            value={slug}
                            onChange={handleSlugChange}
                            required
                        />
                        <p className="onboarding-url-preview">
                            Tu página será:{" "}
                            <strong>
                                {typeof window !== "undefined"
                                    ? window.location.origin
                                    : ""}
                                /reservar/{slugPreview}
                            </strong>
                        </p>
                    </div>

                    <div className="onboarding-field">
                        <label htmlFor="business-email">Email del negocio</label>
                        <p className="onboarding-hint">
                            Contacto de tu negocio (puede ser distinto al de tu cuenta).
                        </p>
                        <input
                            id="business-email"
                            type="email"
                            placeholder="hola@barberianorte.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Crear mi negocio</button>
                </form>

                {error && <p className="onboarding-error">{error}</p>}
            </div>
        </div>
    );
}

export default DashboardOnboarding;
