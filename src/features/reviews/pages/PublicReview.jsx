import { useSearchParams } from "react-router-dom";
import { createReview } from "../api";
import { useState } from "react";
import "./PublicReview.css";

function PublicReview() {
    const[customerName, setCustomerName] = useState("");
    const[rating, setRating] = useState(0);
    const[comment, setComment] = useState("");
    const[searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const[success, setSuccess] = useState(null);
    const[error, setError] = useState(null);

    if (!token) {
        return (
            <div className="public-review-page">
                <div className="public-review-invalid">
                    <span className="public-review-invalid-icon">!</span>
                    <h1>Enlace no válido</h1>
                    <p>Este enlace de reseña no es correcto o está incompleto.</p>
                </div>
            </div>
        );
    }

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try{
            await createReview(token, customerName, rating, comment);
            setCustomerName("");
            setRating(0);
            setComment("");
            setSuccess("¡Reseña creada!");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="public-review-page">
            <header className="public-review-hero">
                <div className="public-review-hero-bg" aria-hidden="true" />
                <div className="public-review-hero-inner">
                    <span className="public-review-badge">Tu opinión importa</span>
                    <h1>Deja tu reseña</h1>
                    <p>Cuéntanos cómo fue tu experiencia. Solo te llevará un momento.</p>
                </div>
            </header>

            <main className="public-review-main">
                <div className="public-review-card">
                    <h2>Reseña</h2>
                    <form className="public-review-form" onSubmit={handleSubmitReview}>
                        <div className="public-review-field">
                            <label htmlFor="review-name">Nombre</label>
                            <input
                                id="review-name"
                                type="text"
                                placeholder="Tu nombre"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>

                        <div className="public-review-field">
                            <label htmlFor="review-rating">Calificación</label>
                            <input
                                id="review-rating"
                                type="number"
                                placeholder="1 - 5"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            />
                        </div>

                        <div className="public-review-field">
                            <label htmlFor="review-comment">Comentario</label>
                            <textarea
                                id="review-comment"
                                placeholder="¿Qué te ha parecido el servicio?"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                            />
                        </div>

                        <button type="submit">Enviar reseña</button>
                    </form>

                    {error && <p className="public-review-error">{error}</p>}
                    {success && <p className="public-review-success">{success}</p>}
                </div>
            </main>
        </div>
    )

}

export default PublicReview;
