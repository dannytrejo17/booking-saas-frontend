"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createCustomerReview } from "../api";
import { getCustomerToken } from "../../customer-auth/api";
import "../pages/PublicBusinessReviews.css";

function CustomerReviewForm({ slug, returnPath, onCreated }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const [formSuccess, setFormSuccess] = useState(null);

    const nextPath = returnPath || `/reservar/${slug}`;
    const loginHref = `/cliente/login?next=${encodeURIComponent(`${nextPath}#escribir-resena`)}`;
    const registerHref = `/register?next=${encodeURIComponent(`${nextPath}#escribir-resena`)}`;

    useEffect(() => {
        setIsLoggedIn(Boolean(getCustomerToken()));
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.location.hash === "#escribir-resena") {
            document.getElementById("escribir-resena")?.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setFormError(null);
        setFormSuccess(null);

        if (!rating) {
            setFormError("Elige una calificación de 1 a 5");
            return;
        }

        setSubmitting(true);
        try {
            await createCustomerReview(slug, rating, comment.trim() || null);
            setRating(0);
            setComment("");
            setFormSuccess("¡Reseña enviada!");
        } catch (err) {
            const message = err.message || "No se pudo crear la reseña";
            const lower = message.toLowerCase();
            if (
                lower.includes("sesión expirada") ||
                lower.includes("no autenticado") ||
                lower.includes("forbidden") ||
                lower.includes("unauthorized") ||
                lower.includes("token")
            ) {
                customerLogout();
                setIsLoggedIn(false);
            }
            setFormError(message);
            setSubmitting(false);
            return;
        }

        try {
            if (onCreated) {
                await onCreated();
            }
        } catch {
            
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div id="escribir-resena" className="customer-review-box">
            {isLoggedIn ? (
                <>
                    <h3>Escribe tu reseña</h3>
                    <form className="customer-review-form" onSubmit={handleSubmitReview}>
                        <div className="customer-review-field">
                            <span className="customer-review-label">Calificación</span>
                            <div
                                className="customer-review-stars"
                                role="group"
                                aria-label="Calificación de 1 a 5"
                            >
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        className={`customer-review-star${
                                            rating >= value ? " is-active" : ""
                                        }`}
                                        onClick={() => setRating(value)}
                                        aria-label={`${value} estrellas`}
                                        aria-pressed={rating === value}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="customer-review-field">
                            <label htmlFor={`customer-review-comment-${slug}`}>
                                Comentario (opcional)
                            </label>
                            <textarea
                                id={`customer-review-comment-${slug}`}
                                placeholder="¿Qué te ha parecido el servicio?"
                                value={comment}
                                maxLength={100}
                                rows={3}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <span className="customer-review-hint">{comment.length}/100</span>
                        </div>
                        <button
                            type="submit"
                            className="customer-review-submit"
                            disabled={submitting}
                        >
                            {submitting ? "Enviando..." : "Enviar reseña"}
                        </button>
                    </form>
                    {formError && (
                        <p className="customer-review-message customer-review-message--error">
                            {formError}
                        </p>
                    )}
                    {formSuccess && (
                        <p className="customer-review-message customer-review-message--success">
                            {formSuccess}
                        </p>
                    )}
                </>
            ) : (
                <div className="customer-review-gate">
                    <h3>¿Quieres dejar una reseña?</h3>
                    <p>Para dejar tu reseña, inicia sesión o regístrate como cliente.</p>
                    <div className="customer-review-gate-actions">
                        <Link href={loginHref} className="customer-review-submit">
                            Iniciar sesión
                        </Link>
                        <Link href={registerHref} className="customer-review-secondary">
                            Crear cuenta
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerReviewForm;
