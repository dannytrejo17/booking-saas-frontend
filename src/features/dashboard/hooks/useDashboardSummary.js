import { useEffect, useState, useCallback } from "react";
import { getServices } from "../../services/api";
import { getEmployees } from "../../employees/api";
import { getBookings } from "../../bookings/api";

export function useDashboardSummary() {
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [servicesData, employeesData, bookingsData] = await Promise.all([
        getServices(),
        getEmployees(),
        getBookings(),
      ]);
      setServices(servicesData);
      setEmployees(employeesData);
      setBookings(bookingsData);
    } catch (err) {
      setError(err.message || "Error cargando datos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    services,
    employees,
    bookings,
    loading,
    error,
    fetchSummary,
  };
}