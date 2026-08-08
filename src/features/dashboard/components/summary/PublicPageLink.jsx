function PublicPageLink({ slug }) {
    return (
        <div className="dash-summary-actions">
            <div className="dash-public-card">
                <span className="dash-public-icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                </span>
                <div className="dash-public-content">
                    <h3 className="dash-public-title">Tu página de reservas</h3>
                    <p className="dash-public-desc">
                        Comparte este enlace para que tus clientes reserven contigo
                    </p>
                    <a
                        href={`/reservar/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dash-public-link"
                    >
                        {window.location.origin}/reservar/{slug}
                    </a>
                </div>
                <a
                    href={`/reservar/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dash-public-btn"
                >
                    Abrir mi página de reservas
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <path d="M15 3h6v6" />
                        <path d="M10 14L21 3" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default PublicPageLink;