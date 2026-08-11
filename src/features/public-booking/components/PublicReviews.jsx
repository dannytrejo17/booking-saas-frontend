import Link from "next/link";

function PublicReviews({
    reviews,
    reviewsLoading,
    reviewTotalPages,
    slug,
    getInitials,
}) {
    return (
        <section className="public-section public-reviews-section">
            <div className="public-section-header">
                <h2>Reseñas</h2>
                <p>Lo que dicen nuestros clientes</p>
            </div>

            {reviewsLoading && reviews.length === 0 && (
                <div className="public-reviews-status">
                    <div className="public-loading-spinner public-loading-spinner-sm" />
                    <p>Cargando reseñas...</p>
                </div>
            )}

            {!reviewsLoading && reviews.length === 0 && (
                <div className="public-reviews-status public-reviews-status--empty">
                    <p>Aún no hay reseñas</p>
                </div>
            )}

            {reviews.length > 0 && (
                <div className="public-reviews-list">
                    {reviews.map((review, index) => (
                        <article
                            key={`${review.customerName}-${review.createdAt}-${index}`}
                            className="public-review-item"
                        >
                            <div
                                className="public-review-avatar"
                                aria-hidden="true"
                            >
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
                                            {"★".repeat(
                                                Math.max(
                                                    0,
                                                    5 - (review.rating || 0)
                                                )
                                            )}
                                        </span>
                                    </span>
                                </div>

                                {review.comment && (
                                    <p className="public-review-comment">
                                        {review.comment}
                                    </p>
                                )}

                                {review.createdAt && (
                                    <time
                                        className="public-review-date"
                                        dateTime={review.createdAt}
                                    >
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString("es-ES", {
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

            {reviewTotalPages > 1 && (
                <Link
                    href={`/reservar/${slug}/reviews`}
                    className="public-reviews-more"
                >
                    Ver más reseñas
                </Link>
            )}
        </section>
    );
}

export default PublicReviews;