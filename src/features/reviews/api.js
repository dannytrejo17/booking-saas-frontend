import { getErrorMessage } from "../../shared/api/apiError";
import { getToken } from "../auth/api";
import { getCustomerToken, handleCustomerAuthFailure } from "../customer-auth/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    };
}

function customerAuthHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCustomerToken()}`
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

export async function createCustomerReview(businessSlug, rating, comment) {
    const response = await fetch(`${API_URL}/api/customer/reviews`, {
        method: "POST",
        headers: customerAuthHeaders(),
        body: JSON.stringify({ businessSlug, rating, comment })
    });
    if (!response.ok) {
        if (handleCustomerAuthFailure(response)) {
            throw new Error("Sesión expirada, vuelve a entrar.");
        }
        throw new Error(await getErrorMessage(response, "No se pudo crear la reseña"));
    }
    return response.json();
}


export async function getPublicReviews(slug, page = 0, size = 10) {
    const params = new URLSearchParams({
        page: String(page),
        size: String(size)
    });

    const response = await fetch(
        `${API_URL}/api/public/reviews/${slug}?${params}`
    );

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar las reseñas"));
    }

    return response.json();
}
