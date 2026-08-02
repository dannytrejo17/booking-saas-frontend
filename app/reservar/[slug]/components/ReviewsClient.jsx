"use client";

import Link from "next/link";
import { useState } from "react";
import { getPublicReviews } from "../../../../src/features/reviews/api";
import CustomerReviewForm from "../../../../src/features/reviews/components/CustomerReviewForm";
import "../../../../src/features/public-booking/pages/PublicBooking.css";
import "../../../../src/features/reviews/pages/PublicBusinessReviews.css";

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function ReviewsClient({ slug, businessName, initialReviews, totalPages: initialTotalPages }) {
    const [page, setPage] = useState(0);
    const [reviews, setReviews] = useState(initialReviews);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refreshFirstPage = async () => {
        const data = await getPublicReviews(slug, 0, 10);
        setReviews(data.content || []);
        setTotalPages(data.totalPages || 0);
        setPage(0);
    };

    const goToPage = async (newPage) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPublicReviews(slug, newPage, 10);
            setReviews(data.content || []);
            setTotalPages(data.totalPages || 0);
            setPage(newPage);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="public-page public-business-reviews-page">
            <main className="public-main">
                <section className="public-section public-reviews-section">
                    <div className="public-section-header">
                        <Link href={`/reservar/${slug}`} className="public-reviews-back">
                            ← Volver a reservar
                        </Link>
                        <h2>Reseñas de {businessName}</h2>
                        <p>Opiniones de clientes</p>
                    </div>

                    <CustomerReviewForm
                        slug={slug}
                        returnPath={`/reservar/${slug}`}
                        onCreated={refreshFirstPage}
                    />

                    {loading && (
                        <div className="public-reviews-status">
                            <div className="public-loading-spinner public-loading-spinner-sm" />
                            <p>Cargando reseñas...</p>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="public-reviews-status">
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && reviews.length === 0 && (
                        <div className="public-reviews-status public-reviews-status--empty">
                            <p>Aún no hay reseñas</p>
                        </div>
                    )}

                    {!loading && reviews.length > 0 && (
                        <div className="public-reviews-list">
                            {reviews.map((review, index) => (
                                <article
                                    key={`${review.customerName}-${review.createdAt}-${index}`}
                                    className="public-review-item"
                                >
                                    <div className="public-review-avatar" aria-hidden="true">
                                        {getInitials(review.customerName || "?")}
                                    </div>
                                    <div className="public-review-body">
                                        <div className="public-review-item-top">
                                            <strong>{review.customerName}</strong>
                                            <span
                                                className="public-review-rating"
                                                aria-label={`${review.rating || 0} de 5`}
                                            >
                                                {"★".repeat(review.rating || 0)}
                                                <span className="public-review-rating-empty">
                                                    {"★".repeat(Math.max(0, 5 - (review.rating || 0)))}
                                                </span>
                                            </span>
                                        </div>
                                        {review.comment && (
                                            <p className="public-review-comment">{review.comment}</p>
                                        )}
                                        {review.createdAt && (
                                            <time className="public-review-date" dateTime={review.createdAt}>
                                                {new Date(review.createdAt).toLocaleDateString("es-ES", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </time>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="public-reviews-pagination">
                            <button
                                type="button"
                                className="public-reviews-more"
                                onClick={() => goToPage(Math.max(0, page - 1))}
                                disabled={loading || page === 0}
                            >
                                Anterior
                            </button>
                            <span className="public-reviews-page-label">
                                Página {page + 1} de {totalPages}
                            </span>
                            <button
                                type="button"
                                className="public-reviews-more"
                                onClick={() => goToPage(Math.min(totalPages - 1, page + 1))}
                                disabled={loading || page + 1 >= totalPages}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default ReviewsClient;
