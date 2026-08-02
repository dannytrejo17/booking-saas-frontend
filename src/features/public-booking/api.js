import { getErrorMessage } from "../../shared/api/apiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function getPublicBusiness(slug) {
    const response = await fetch(`${API_URL}/api/public/${slug}`);

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo cargar el negocio"));
    }

    return response.json();
}

export async function getAllPublicBusinesses() {
    const response = await fetch(`${API_URL}/api/public`);

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar los negocios"));
    }

    return response.json();
}


export async function getPublicServices(slug) {
    const response = await fetch(`${API_URL}/api/public/${slug}/services`);

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar los servicios"));
    }

    return response.json();
}

export async function getPublicEmployees(slug) {
    const response = await fetch(`${API_URL}/api/public/${slug}/employees`);

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar los empleados"));
    }

    return response.json();
}


export async function getAvailability(slug, serviceId, employeeId, date) {
    const params = new URLSearchParams({
        serviceId: String(serviceId),
        date,
    });

    if (employeeId != null && employeeId !== "" && employeeId !== "any") {
        params.set("employeeId", String(employeeId));
    }

    const response = await fetch(
        `${API_URL}/api/public/${slug}/bookings/availability?${params}`
    );

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo cargar la disponibilidad"));
    }

    return response.json();
}


export async function createPublicBooking(slug, data) {
    const response = await fetch(`${API_URL}/api/public/${slug}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo crear la reserva"));
    }

    return response.text();
}
