"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllPublicBusinesses } from "../../public-booking/api";
import { getCustomerToken, customerLogout } from "../api";
import "./CustomerHome.css";

function getInitials(name = "") {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "?";
}

function CustomerHome() {
    const router = useRouter();
    const [ready, setReady] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!getCustomerToken()) {
            router.replace("/cliente/login");
            return;
        }
        setReady(true);

        const load = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getAllPublicBusinesses();
                setBusinesses(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [router]);

    const handleLogout = () => {
        customerLogout();
        router.push("/cliente/login");
    };

    if (!ready) {
        return (
            <div className="customer-home-page">
                <div className="customer-home-status">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="customer-home-page">
            <header className="customer-home-header">
                <div className="customer-home-header-inner">
                    <Link href="/" className="customer-home-logo">
                        <img
                            src="/brand/turnexa-logo.png"
                            alt=""
                            width={36}
                            height={36}
                        />
                        <span>
                            Turn<span>exa</span>
                        </span>
                    </Link>
                    <button type="button" className="customer-home-logout" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <main className="customer-home-main">
                <div className="customer-home-intro">
                    <h1>Negocios</h1>
                    <p>Elige un negocio para reservar o dejar tu reseña.</p>
                </div>

                {loading && <div className="customer-home-status">Cargando negocios...</div>}
                {error && !loading && <div className="customer-home-status customer-home-status--error">{error}</div>}

                {!loading && !error && businesses.length === 0 && (
                    <div className="customer-home-status">Aún no hay negocios disponibles.</div>
                )}

                {!loading && businesses.length > 0 && (
                    <ul className="customer-home-list">
                        {businesses.map((business) => {
                            const reviewCount = Number(business.reviewCount) || 0;
                            const average = Number(business.averageRating);
                            const showRating = reviewCount > 0 && Number.isFinite(average) && average > 0;
                            const initials = getInitials(business.name);

                            return (
                                <li key={business.slug || business.businessId}>
                                    <Link
                                        href={`/reservar/${business.slug}`}
                                        className="customer-home-card"
                                    >
                                        <div className="customer-home-card-media">
                                            {business.coverImage || business.logo ? (
                                                <img
                                                    className="customer-home-card-cover"
                                                    src={business.coverImage || business.logo}
                                                    alt=""
                                                />
                                            ) : (
                                                <span
                                                    className="customer-home-card-cover-fallback"
                                                    aria-hidden="true"
                                                >
                                                    {initials}
                                                </span>
                                            )}
                                            <span className="customer-home-card-badge" aria-hidden="true">
                                                {business.logo ? (
                                                    <img src={business.logo} alt="" />
                                                ) : (
                                                    <span>{initials}</span>
                                                )}
                                            </span>
                                        </div>
                                        <div className="customer-home-card-body">
                                            <h2>{business.name}</h2>
                                            {business.address && (
                                                <p className="customer-home-card-address">
                                                    <svg
                                                        className="customer-home-card-pin"
                                                        viewBox="0 0 24 24"
                                                        width="14"
                                                        height="14"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fill="currentColor"
                                                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
                                                        />
                                                    </svg>
                                                    <span>{business.address}</span>
                                                </p>
                                            )}
                                            {showRating ? (
                                                <p className="customer-home-rating">
                                                    <span className="customer-home-rating-star" aria-hidden="true">
                                                        ★
                                                    </span>
                                                    <strong>{average.toFixed(1)}</strong>
                                                    <span className="customer-home-rating-count">
                                                        {reviewCount}{" "}
                                                        {reviewCount === 1 ? "reseña" : "reseñas"}
                                                    </span>
                                                </p>
                                            ) : (
                                                <p className="customer-home-rating customer-home-rating--empty">
                                                    Sin reseñas aún
                                                </p>
                                            )}
                                            <span className="customer-home-card-cta">Ver negocio →</span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </main>
        </div>
    );
}

export default CustomerHome;
