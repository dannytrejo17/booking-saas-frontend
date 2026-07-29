import { getErrorMessage } from "../../shared/api/apiError";
import { getToken } from "../auth/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    };
}

export async function getBookings() {
    const response = await fetch(`${API_URL}/api/bookings`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar las reservas"));
    }
    return response.json();
}

export async function createBooking(data) {
    const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo crear la reserva"));
    }
    return response.text();
}

export async function editBooking(id, data) {
    const response = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo editar la reserva"));
    }
    return response.text();
}

export async function deleteBooking(id) {
    const response = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo eliminar la reserva"));
    }
    return response.text();
}
