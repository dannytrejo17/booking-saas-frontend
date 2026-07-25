import { getErrorMessage } from "../../shared/api/apiError";
import { getToken } from "../auth/api";

const API_URL = import.meta.env.VITE_API_URL;

function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    };
}

export async function getServices() {
    const response = await fetch(`${API_URL}/api/services`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar los servicios"));
    }
    return response.json();
}

export async function createService(data) {
    const response = await fetch(`${API_URL}/api/services`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo crear el servicio"));
    }
    return response.text();
}

export async function editService(id, data) {
    const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo editar el servicio"));
    }
    return response.text();
}

export async function deleteService(id) {
    const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo eliminar el servicio"));
    }
    return response.text();
}
