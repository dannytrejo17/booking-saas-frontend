import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublicReviews } from "../api";
import "../../public-booking/pages/PublicBooking.css";
import "./PublicBusinessReviews.css";

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function PublicBusinessReviews() {
    const { slug } = useParams();
    const [page, setPage] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchReviews = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getPublicReviews(slug, page, 10);
                setReviews(data.content || []);
                setTotalPages(data.totalPages || 0);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [slug, page]);

    return (
        <div className="public-page public-business-reviews-page">
            <main className="public-main">
                <section className="public-section public-reviews-section">
                    <div className="public-section-header">
                        <Link to={`/reservar/${slug}`} className="public-reviews-back">
                            ← Volver a reservar
                        </Link>
                        <h2>Reseñas</h2>
                        <p>Opiniones de clientes</p>
                    </div>

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

                    {!loading && !error && reviews.length === 0 && (
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
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
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
                                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
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

export default PublicBusinessReviews;
