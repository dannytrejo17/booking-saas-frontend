"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe, getToken, logout } from "../features/auth/api";
import Sidebar from "../features/dashboard/components/Sidebar";
import { DashboardProvider } from "../features/dashboard/DashboardContext";
import "../features/dashboard/Dashboard.css";

function DashboardLayout({ children }) {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const refreshUser = async () => {
        try {
            const data = await getMe();
            if (!data.business) {
                router.replace("/crear-negocio");
                return;
            }
            setUser(data);
        } catch {
            if (getToken()) {
                router.replace("/crear-negocio");
                return;
            }
            logout();
            router.replace("/login");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe();
                if (!data.business) {
                    router.replace("/crear-negocio");
                    return;
                }
                setUser(data);
            } catch {
                if (getToken()) {
                    router.replace("/crear-negocio");
                    return;
                }
                logout();
                router.replace("/login");
            }
        };

        fetchUser();
    }, [router]);

    if (!user) {
        return <div className="dash-loading">Cargando...</div>;
    }

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    return (
        <div className="dashboard">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />

            <main className="dashboard-main">
                <header className="dashboard-topbar">
                    <button
                        type="button"
                        className="dashboard-menu-btn"
                        aria-label="Abrir menú"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(true)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <div>
                        <h1>Hola, {user.name}</h1>
                        <p>Gestiona tu negocio de forma fácil y eficiente</p>
                    </div>
                </header>

                <section className="dashboard-content">
                    <DashboardProvider value={{ user, refreshUser }}>
                        {children}
                    </DashboardProvider>
                </section>
            </main>
        </div>
    );
}

export default DashboardLayout;
