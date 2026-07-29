import { getErrorMessage } from "../../shared/api/apiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email, password) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo iniciar sesión"));
    }

    const data = await response.json();
    const token = data.token;

    if (!token) {
        throw new Error("El backend respondió OK pero no devolvió token");
    }

    return token;
}


export async function register(name, email, password) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo completar el registro"));
    }
    const data = await response.json();
    return data;
}


export async function verifyCode(email, code) {
    const response = await fetch(`${API_URL}/api/auth/verifyCode`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, code })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo verificar el código"));
    }
}

export async function resendCode(email){
    const response = await fetch(`${API_URL}/api/auth/resendCode`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo reenviar el código"));
    }
    return response.json();
}

export async function forgotPassword(email) {
    const response = await fetch(`${API_URL}/api/auth/forgotPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo enviar el código de recuperación"));
    }
    return response.json();
}

export async function resetPassword(email, code, password) {
    const response = await fetch(`${API_URL}/api/auth/resetPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, code, password })
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo actualizar la contraseña"));
    }
    return response.json();
}


function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    };
}


export async function getMe() {
    const response = await fetch(`${API_URL}/api/me`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo obtener el usuario"));
    }
    return response.json();
}


export function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }
  

export function logout() {
    localStorage.removeItem("token");
}
