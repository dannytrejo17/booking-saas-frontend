const API_URL = import.meta.env.VITE_API_URL;

export async function login(email, password) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error(`Login falló (${response.status}): ${await response.text()}`);
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
        throw new Error(`Registro falló (${response.status}): ${await response.text()}`);
    }
    const data = await response.json();
    return data;
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
        throw new Error("No se pudo obtener el usuario");
    }
    return response.json();
}


export async function createBusiness(data) {

    const response = await fetch(`${API_URL}/api/business/create`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response.json();
}


export function getToken(){
    return localStorage.getItem("token");
}



export function logout() {
    localStorage.removeItem("token");
}