"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/dashboard", label: "Resumen", icon: "▦", end: true },
    { href: "/dashboard/servicios", label: "Servicios", icon: "📋" },
    { href: "/dashboard/empleados", label: "Empleados", icon: "👤" },
    { href: "/dashboard/reservas", label: "Reservas", icon: "📅" },
    { href: "/dashboard/horarios", label: "Horarios", icon: "🕐" },
    { href: "/dashboard/reseñas", label: "Reseñas", icon: "💬" },
    { href: "/dashboard/guia", label: "Cómo usar", icon: "?" },
];

function Sidebar({ user, onLogout, open, onClose }) {
    const pathname = usePathname();

    const handleNav = () => {
        onClose?.();
    };

    const isActive = (href, end) => {
        if (end) return pathname === href;
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <>
            {open && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    aria-label="Cerrar menú"
                    onClick={onClose}
                />
            )}

            <aside className={`sidebar${open ? " sidebar--open" : ""}`}>
                <div className="sidebar-brand">
                    <img
                        src="/brand/turnexa-logo.png"
                        alt="Turnexa"
                        className="sidebar-logo"
                        width={42}
                        height={42}
                    />
                    <div>
                        <p className="sidebar-brand-name">{user.business.name}</p>
                        <p className="sidebar-brand-sub">Panel de control</p>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`sidebar-btn${isActive(link.href, link.end) ? " active" : ""}`}
                            onClick={handleNav}
                        >
                            <span className="sidebar-btn-icon">{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-avatar">{user.name.charAt(0).toUpperCase()}</div>
                        <div>
                            <p className="sidebar-user-name">{user.name}</p>
                            <p className="sidebar-user-email">{user.email}</p>
                        </div>
                    </div>
                    <button className="sidebar-logout" onClick={onLogout}>
                        Cerrar sesión
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
