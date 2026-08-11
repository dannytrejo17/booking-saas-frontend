"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { usePublicBooking } from "../hooks/usePublicBooking";
import { usePublicBusiness } from "../hooks/usePublicBusiness";
import { useAvailability } from "../hooks/useAvailability";
import { usePublicReviews } from "../hooks/usePublicReviews";
import PublicHero from "../components/PublicHero";
import PublicGallery from "../components/PublicGallery";
import PublicServices from "../components/PublicServices";
import PublicEmployees from "../components/PublicEmployees";
import PublicReviews from "../components/PublicReviews";
import PublicBookingSection from "../components/PublicBookingSection";
import "./PublicBooking.css";

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function PublicBooking() {
    const { slug } = useParams();
    const [serviceId, setServiceId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [date, setDate] = useState("");
    const [startAt, setStartAt] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    const now = new Date();
    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
    ].join("-");

    const {
        business,
        services,
        employees,
        loading,
        error,
    } = usePublicBusiness(slug);

    const {
        slots,
        slotsLoading,
        slotsError,
    } = useAvailability(slug, serviceId, employeeId, date);

    const {
        reviews,
        reviewTotalPages,
        reviewsLoading,
    } = usePublicReviews(slug);

    const {
        submitting,
        bookingError,
        success,
        handleSubmit,
    } = usePublicBooking(slug);

    if (loading) {
        return (
            <div className="public-loading">
                <div className="public-loading-spinner" />
                <p>Cargando información del negocio...</p>
            </div>
        );
    }

    if (error && !business) {
        return (
            <div className="public-error-page">
                <div className="public-error-card">
                    <span className="public-error-icon">!</span>
                    <h1>No se pudo cargar la página</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!business) {
        return (
            <div className="public-error-page">
                <div className="public-error-card">
                    <span className="public-error-icon">?</span>
                    <h1>Negocio no encontrado</h1>
                    <p>Comprueba que el enlace sea correcto.</p>
                </div>
            </div>
        );
    }

    const galleryImages = business.gallery ?? [];
    const selectedService = services.find((s) => String(s.id) === serviceId);
    const selectedEmployee = employees.find((e) => String(e.id) === employeeId);
    const anyProfessional = employeeId === "any";

    const scrollToBooking = () => {
        document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="public-page">

            <PublicHero
    business={business}
    scrollToBooking={scrollToBooking}
/>
            {business.logo && (
                <div className="public-logo-row">
                    <div className="public-logo-wrap">
                        <img
                            src={business.logo}
                            alt={business.name}
                            className="public-logo"
                        />
                    </div>
                </div>
            )}

            <main className={`public-main${business.logo ? " public-main--with-logo" : ""}`}>

            <PublicGallery galleryImages={galleryImages} />

            <PublicServices
                services={services}
                serviceId={serviceId}
                setServiceId={setServiceId}
                currency={business.currency}
            />

            <PublicEmployees
                    employees={employees}
                    employeeId={employeeId}
                    setEmployeeId={setEmployeeId}
                    getInitials={getInitials}
            />

            <PublicBookingSection
                services={services}
                employees={employees}
                serviceId={serviceId}
                setServiceId={setServiceId}
                employeeId={employeeId}
                setEmployeeId={setEmployeeId}
                date={date}
                setDate={setDate}
                startAt={startAt}
                setStartAt={setStartAt}
                customerName={customerName}
                setCustomerName={setCustomerName}
                customerPhone={customerPhone}
                setCustomerPhone={setCustomerPhone}
                today={today}
                slots={slots}
                slotsLoading={slotsLoading}
                slotsError={slotsError}
                selectedService={selectedService}
                selectedEmployee={selectedEmployee}
                anyProfessional={anyProfessional}
                bookingError={bookingError}
                submitting={submitting}
                success={success}
                handleSubmit={handleSubmit}
                currency={business.currency}
            />

            <PublicReviews
                reviews={reviews}
                reviewsLoading={reviewsLoading}
                reviewTotalPages={reviewTotalPages}
                slug={slug}
                getInitials={getInitials}
            />
            </main>

            <footer className="public-footer">
                <p>
                    © {new Date().getFullYear()} {business.name}
                </p>
            </footer>
        </div>
    );
}

export default PublicBooking;
