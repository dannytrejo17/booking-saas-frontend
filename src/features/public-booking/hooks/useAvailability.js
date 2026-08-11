import { useEffect, useState } from "react";
import { getAvailability } from "../api";

export function useAvailability(
    slug,
    serviceId,
    employeeId,
    date
) {
    const [slots, setSlots] = useState([]);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [slotsError, setSlotsError] = useState(null);

    useEffect(() => {
        if (!serviceId || !employeeId || !date) {
            setSlots([]);
            setSlotsError(null);
            return;
        }

        const fetchSlots = async () => {
            setSlotsLoading(true);
            setSlotsError(null);

            try {
                const data = await getAvailability(
                    slug,
                    serviceId,
                    employeeId,
                    date
                );

                setSlots(data);
            } catch (err) {
                setSlots([]);
                setSlotsError(
                    err.message ||
                    "No se pudieron cargar los horarios"
                );
            } finally {
                setSlotsLoading(false);
            }
        };

        fetchSlots();
    }, [slug, serviceId, employeeId, date]);

    return {
        slots,
        slotsLoading,
        slotsError,
    };
}