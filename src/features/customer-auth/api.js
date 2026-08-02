import { getErrorMessage } from "../../shared/api/apiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CUSTOMER_TOKEN_KEY = "customerToken";

export async function customerLogin(email, password) {
    const response = await fetch(`${API_URL}/api/customer/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo iniciar sesión"));
    }

    const data = await response.json();
    if (!data.token) {
        throw new Error("El backend respondió OK pero no devolvió token");
    }
    return data.token;
}

export function getCustomerToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(CUSTOMER_TOKEN_KEY);
}

export function setCustomerToken(token) {
    localStorage.setItem(CUSTOMER_TOKEN_KEY, token);
}

export function customerLogout() {
    localStorage.removeItem(CUSTOMER_TOKEN_KEY);
}

/** Solo rutas internas relativas. Bloquea //evil.com y URLs absolutas. */
export function getSafeCustomerNextPath(next, fallback = "/cliente") {
    if (!next || typeof next !== "string") return fallback;

    const value = next.trim();
    if (!value.startsWith("/")) return fallback;
    if (value.startsWith("//") || value.startsWith("/\\")) return fallback;
    if (value.includes("://")) return fallback;

    return value;
}

export function redirectToCustomerLogin(
    message = "Sesión expirada, vuelve a entrar."
) {
    if (typeof window === "undefined") return;

    customerLogout();
    sessionStorage.setItem("customerLoginMessage", message);

    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const next = getSafeCustomerNextPath(current, "/cliente");
    const loginUrl =
        next && next !== "/cliente"
            ? `/cliente/login?next=${encodeURIComponent(next)}`
            : "/cliente/login";

    window.location.assign(loginUrl);
}

/** Spring suele devolver 403 si el JWT no autentica. */
export function handleCustomerAuthFailure(response) {
    if (response.status === 401 || response.status === 403) {
        redirectToCustomerLogin();
        return true;
    }
    return false;
}
