import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicBusiness, getPublicServices, getPublicEmployees } from "../../../src/features/public-booking/api";
import { getPublicReviews } from "../../../src/features/reviews/api";
import BookingWidget from "./components/BookingWidget";
import ScrollToBookingButton from "./components/ScrollToBookingButton";
import "../../../src/features/public-booking/pages/PublicBooking.css";

export async function generateMetadata({ params }) {
    try {
        const { slug } = await params;
        const business = await getPublicBusiness(slug);
        const image = business.coverImage || business.logo || null;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://turnexa.vercel.app";
        return {
            title: `Reservar en ${business.name}`,
            description: `Reserva tu cita en ${business.name}. Elige servicio, profesional y horario online.`,
            alternates: {
                canonical: `${baseUrl}/reservar/${slug}`,
            },
            openGraph: {
                title: `Reservar en ${business.name}`,
                description: `Reserva tu cita en ${business.name}. Elige servicio, profesional y horario online.`,
                type: "website",
                ...(image && { images: [{ url: image }] }),
            },
        };
    } catch {
        return { title: "Reservar cita" };
    }
}

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default async function ReservarPage({ params }) {
    const { slug } = await params;

    let business;
    try {
        business = await getPublicBusiness(slug);
    } catch {
        notFound();
    }

    const [services, employees, reviewsData] = await Promise.all([
        getPublicServices(slug),
        getPublicEmployees(slug),
        getPublicReviews(slug, 0, 10),
    ]);

    const reviews = reviewsData.content || [];
    const reviewTotalPages = reviewsData.totalPages || 0;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: business.name,
        ...(business.address && { address: business.address }),
        ...(business.phone && { telephone: business.phone }),
        ...(business.email && { email: business.email }),
        ...(business.logo && { image: business.logo }),
        url: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/reservar/${slug}`,
    };

    return (
        <div className="public-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <header className="public-hero">
                <div
                    className="public-hero-bg"
                    style={business.coverImage ? { backgroundImage: `url(${business.coverImage})` } : undefined}
                    aria-hidden="true"
                />
                <div className="public-hero-inner">
                    <span className="public-badge">Reservas online</span>
                    <h1>{business.name}</h1>
                    <p className="public-hero-subtitle">
                        Reserva tu cita en pocos pasos. Elige servicio, profesional y horario.
                    </p>

                    {(business.email || business.phone || business.address || business.instagramUrl || business.tiktokUrl) && (
                        <div className="public-contact">
                            {business.email && (
                                <a href={`mailto:${business.email}`} className="public-contact-chip">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16v16H4z" opacity="0" />
                                        <path d="M4 6l8 6 8-6" />
                                        <rect x="4" y="6" width="16" height="12" rx="2" />
                                    </svg>
                                    {business.email}
                                </a>
                            )}
                            {business.phone && (
                                <a href={`tel:${business.phone}`} className="public-contact-chip">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.18a1 1 0 011 1 11.4 11.4 0 00.57 3.56 1 1 0 01-.24 1z" />
                                    </svg>
                                    {business.phone}
                                </a>
                            )}
                            {business.address && (
                                <span className="public-contact-chip">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>
                                    {business.address}
                                </span>
                            )}
                            {business.instagramUrl && (
                                <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="public-contact-chip">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                        <rect x="3" y="3" width="18" height="18" rx="5" />
                                        <circle cx="12" cy="12" r="4" />
                                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                                    </svg>
                                    Instagram
                                </a>
                            )}
                            {business.tiktokUrl && (
                                <a href={business.tiktokUrl} target="_blank" rel="noopener noreferrer" className="public-contact-chip">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                        <path d="M14 4v10.5a4.5 4.5 0 1 1-3.5-4.39" />
                                        <path d="M14 4c.5 2.25 1.85 3.65 4 4" />
                                    </svg>
                                    TikTok
                                </a>
                            )}
                        </div>
                    )}

                    <ScrollToBookingButton />
                </div>
            </header>

            {business.logo && (
                <div className="public-logo-row">
                    <div className="public-logo-wrap">
                        <img src={business.logo} alt={business.name} className="public-logo" />
                    </div>
                </div>
            )}

            <main className={`public-main${business.logo ? " public-main--with-logo" : ""}`}>
                <BookingWidget
                    slug={slug}
                    services={services}
                    employees={employees}
                    currency={business.currency}
                />

                <section className="public-section public-reviews-section">
                    <div className="public-section-header">
                        <h2>Reseñas</h2>
                        <p>Lo que dicen nuestros clientes</p>
                    </div>

                    {reviews.length === 0 && (
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
                                    <div className="public-review-avatar" aria-hidden="true">
                                        {getInitials(review.customerName || "?")}
                                    </div>
                                    <div className="public-review-body">
                                        <div className="public-review-item-top">
                                            <strong>{review.customerName}</strong>
                                            <span className="public-review-rating" aria-label={`${review.rating || 0} de 5`}>
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

                    {reviewTotalPages > 1 && (
                        <Link href={`/reservar/${slug}/reviews`} className="public-reviews-more">
                            Ver más reseñas
                        </Link>
                    )}
                </section>
            </main>

            <footer className="public-footer">
                <p>© {new Date().getFullYear()} {business.name}</p>
            </footer>
        </div>
    );
}
