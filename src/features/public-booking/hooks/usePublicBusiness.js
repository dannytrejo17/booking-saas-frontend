import { useEffect, useState } from "react";
import {
    getPublicBusiness,
    getPublicServices,
    getPublicEmployees,
} from "../api";

export function usePublicBusiness(slug) {
    const [business, setBusiness] = useState(null);
    const [services, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [
                    businessData,
                    servicesData,
                    employeesData,
                ] = await Promise.all([
                    getPublicBusiness(slug),
                    getPublicServices(slug),
                    getPublicEmployees(slug),
                ]);

                setBusiness(businessData);
                setServices(servicesData);
                setEmployees(employeesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    return {
        business,
        services,
        employees,
        loading,
        error,
    };
}