function BusinessInfoCards({ name, email }) {
    return (
        <div className="dash-cards dash-cards--info">
            <div className="dash-card dash-card--info">
                <span className="dash-card-icon dash-card-icon--store" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l1-5h16l1 5" />
                        <path d="M3 9v11h18V9" />
                        <path d="M9 20v-6h6v6" />
                    </svg>
                </span>
                <div className="dash-card-text">
                    <span className="dash-card-label">Negocio</span>
                    <span className="dash-card-value">{name}</span>
                </div>
            </div>

            <div className="dash-card dash-card--info">
                <span className="dash-card-icon dash-card-icon--mail" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6 9-6" />
                    </svg>
                </span>
                <div className="dash-card-text">
                    <span className="dash-card-label">Email</span>
                    <span className="dash-card-value">{email}</span>
                </div>
            </div>
        </div>
    );
}

export default BusinessInfoCards;