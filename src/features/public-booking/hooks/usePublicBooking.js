import { useState } from "react";
import { createPublicBooking } from "../api";

function formatBookingWhen(startAt) {
    const when = new Date(startAt);
    const dateLabel = when.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
    const timeLabel = when.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${dateLabel} a las ${timeLabel}`;
}

export function usePublicBooking(slug) {
    const [submitting, setSubmitting] = useState(false);
    const [bookingError, setBookingError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async ({
        serviceId,
        employeeId,
        startAt,
        customerName,
        customerPhone,
    }) => {
        setBookingError("");
        setSubmitting(true);

        try {
            const bookingData = {
                serviceId: Number(serviceId),
                startAt,
                customerName,
                customerPhone,
            };

            if (employeeId !== "any") {
                bookingData.employeeId = Number(employeeId);
            }

            await createPublicBooking(slug, bookingData);

            setSuccess(
                `¡Reserva confirmada! Te esperamos el ${formatBookingWhen(startAt)}.`
            );

            return true;
        } catch (err) {
            setBookingError(err.message);
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    return {
        submitting,
        bookingError,
        success,
        handleSubmit,
    };
}
