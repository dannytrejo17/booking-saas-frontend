function SummaryStats({ services, employees, monthBookingsCount, todayBookingsCount }) {

return (
<div className="dash-stats">
<div className="dash-stat-card dash-stat-card--purple">
    <span className="dash-stat-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M8 13h8M8 17h5" />
        </svg>
    </span>
    <div className="dash-stat-body">
        <span className="dash-stat-value">{services.length}</span>
        <span className="dash-stat-label">Servicios</span>
        <span className="dash-stat-sub">Activos</span>
    </div>
</div>

<div className="dash-stat-card dash-stat-card--green">
    <span className="dash-stat-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    </span>
    <div className="dash-stat-body">
        <span className="dash-stat-value">{employees.length}</span>
        <span className="dash-stat-label">Empleados</span>
        <span className="dash-stat-sub">En tu equipo</span>
    </div>
</div>

<div className="dash-stat-card dash-stat-card--blue">
    <span className="dash-stat-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
    </span>
    <div className="dash-stat-body">
        <span className="dash-stat-value">{monthBookingsCount}</span>
        <span className="dash-stat-label">Reservas</span>
        <span className="dash-stat-sub">Este mes</span>
    </div>
</div>

<div className="dash-stat-card dash-stat-card--orange">
    <span className="dash-stat-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </svg>
    </span>
    <div className="dash-stat-body">
        <span className="dash-stat-value">{todayBookingsCount}</span>
        <span className="dash-stat-label">Reservas</span>
        <span className="dash-stat-sub">Hoy</span>
        </div>
    </div>
</div>
);
}

export default SummaryStats;