"use client";

function ScrollToBookingButton() {
    const handleClick = () => {
        document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <button type="button" className="public-hero-cta" onClick={handleClick}>
            Reservar ahora
        </button>
    );
}

export default ScrollToBookingButton;
