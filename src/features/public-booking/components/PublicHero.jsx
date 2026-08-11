"use client";

function PublicHero({ business, scrollToBooking }) {
    return (
        <header className="public-hero">
            <div
                className="public-hero-bg"
                style={
                    business.coverImage
                        ? { backgroundImage: `url(${business.coverImage})` }
                        : undefined
                }
                aria-hidden="true"
            />

            <div className="public-hero-inner">
                <span className="public-badge">Reservas online</span>

                <h1>{business.name}</h1>

                <p className="public-hero-subtitle">
                    Reserva tu cita en pocos pasos. Elige servicio, profesional y horario.
                </p>

                {(business.email || business.phone || business.address) && (
                    <div className="public-contact">
                        {business.email && (
                            <a
                                href={`mailto:${business.email}`}
                                className="public-contact-chip"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M4 4h16v16H4z" opacity="0" />
                                    <path d="M4 6l8 6 8-6" />
                                    <rect x="4" y="6" width="16" height="12" rx="2" />
                                </svg>

                                {business.email}
                            </a>
                        )}

                        {business.phone && (
                            <a
                                href={`tel:${business.phone}`}
                                className="public-contact-chip"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.18a1 1 0 011 1 11.4 11.4 0 00.57 3.56 11.4 11.4 0 00.57 3.56 1 1 0 01-.24 1z" />
                                </svg>

                                {business.phone}
                            </a>
                        )}

                        {business.address && (
                            <span className="public-contact-chip">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
                                    <circle cx="12" cy="10" r="2.5" />
                                </svg>

                                {business.address}
                            </span>
                        )}
                    </div>
                )}

                <button
                    type="button"
                    className="public-hero-cta"
                    onClick={scrollToBooking}
                >
                    Reservar ahora
                </button>
            </div>
        </header>
    );
}

export default PublicHero;
