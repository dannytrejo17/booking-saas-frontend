import { getErrorMessage } from "../../shared/api/apiError";
import { getToken } from "../auth/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    };
}

export async function createSchedule(data) {
    const response = await fetch(`${API_URL}/api/schedule`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo crear el horario"));
    }
    return response.text();
}

export async function getSchedule() {
    const response = await fetch(`${API_URL}/api/schedule`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar los horarios"));
    }
    return response.json();
}

export async function deleteSchedule(dayOfWeek) {
    const params = new URLSearchParams({ dayOfWeek });
    const response = await fetch(`${API_URL}/api/schedule?${params}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo eliminar el horario"));
    }
    return response.text();
}
