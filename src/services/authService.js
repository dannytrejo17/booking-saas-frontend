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
        if (response.status === 401) {
            throw new Error("Credenciales incorrectas");
        }
        const message = await response.text();
        throw new Error(message || "No se pudo iniciar sesión");
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


export async function getServices() {
    const response = await fetch(`${API_URL}/api/services`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error("No se pudieron cargar los servicios");
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


export async function createService(data) {
    const response = await fetch(`${API_URL}/api/services`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response.text();
}

export async function getEmployees() {
    const response = await fetch(`${API_URL}/api/employees`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error("No se pudieron cargar los empleados");
    }
    return response.json();
}

export async function createEmployee(name) {
    const response = await fetch(`${API_URL}/api/employees`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ name, active: true })
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response.text();
}

export async function getBookings() {
    const response = await fetch(`${API_URL}/api/bookings`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error("No se pudieron cargar las reservas");
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
        throw new Error(await response.text());
    }
    return response.text();
}


export function getToken(){
    return localStorage.getItem("token");
}



export function logout() {
    localStorage.removeItem("token");
}