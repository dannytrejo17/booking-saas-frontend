import { getErrorMessage } from "../../shared/api/apiError";
import { getToken } from "../auth/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    };
}

export async function createBusiness(data) {
    const response = await fetch(`${API_URL}/api/business/create`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo crear el negocio"));
    }
    return response.json();
}

export async function editBusiness(data) {
    const response = await fetch(`${API_URL}/api/business`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo actualizar el negocio"));
    }
    return response.json();
}

export async function uploadBusinessImage(file, type) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    const response = await fetch(`${API_URL}/api/business/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: formData
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo subir la imagen"));
    }
    return response.json();
}
