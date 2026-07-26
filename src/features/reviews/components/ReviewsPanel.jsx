import { useState } from "react"
import { reviewInvitation } from "../api";

function ReviewsPanel() {
    const[phone, setPhone] = useState("");
    const[error, setError] = useState("");
    const[invitationUrl, setInvitationUrl] = useState(null);


    const handleSubmitInvitation = async (e) => {
        e.preventDefault();
    
        if (!phone) {
            setError("Completa el teléfono");
            return;
        }
        try {
            const inviteUrl =await reviewInvitation(phone);
            setInvitationUrl(inviteUrl);
            if (inviteUrl.whatsappUrl?.startsWith("https://wa.me/")) {
                window.open(inviteUrl.whatsappUrl, "_blank", "noopener,noreferrer");
            }
            setPhone("");
            
        } catch (err) {
            setError(err.message);
        }
    }


    return (
        <div className="dash-section">
            <h2 className="dash-section-title">Reseñas</h2>
            <p className="dash-section-hint">
                Envía una invitación por WhatsApp para que tu cliente deje una reseña.
            </p>

            <form className="dash-form dash-form-inline" onSubmit={handleSubmitInvitation}>
                <input
                    type="text"
                    placeholder="Teléfono (ej. +34600000000)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit">Enviar invitación</button>
            </form>

            {error && <p className="dash-error">{error}</p>}

            {invitationUrl && (
                <div className="dash-review-invite">
                    <div className="dash-review-invite-header">
                        <span className="dash-review-invite-badge">Listo</span>
                        <h3>Invitación creada</h3>
                        <p>WhatsApp se abre automáticamente. Si no, usa el botón de abajo.</p>
                    </div>
                    <a
                        className="dash-review-invite-btn"
                        href={invitationUrl.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Abrir WhatsApp
                    </a>
                </div>
            )}
        </div>
    );
}

export default ReviewsPanel;
