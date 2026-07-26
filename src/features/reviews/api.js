import { getErrorMessage } from "../../shared/api/apiError";
import { getToken } from "../auth/api";

const API_URL = import.meta.env.VITE_API_URL;

function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    };
}


export async function reviewInvitation(phone) {
    const response = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ phone })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo enviar la invitación de reseña"));
    }
    return response.json();
}


export async function createReview(token, customerName, rating, comment) {

    const response = await fetch(`${API_URL}/api/public/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, customerName, rating, comment })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo crear la reseña"));
    }
    return response.json();
}