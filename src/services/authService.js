import { getErrorMessage } from "./apiError";

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


export async function getServices() {
    const response = await fetch(`${API_URL}/api/services`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar los servicios"));
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
        throw new Error(await getErrorMessage(response, "No se pudo crear el negocio"));
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


export async function getEmployees() {
    const response = await fetch(`${API_URL}/api/employees`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar los empleados"));
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
        throw new Error(await getErrorMessage(response, "No se pudo crear el empleado"));
    }
    return response.text();
}

export async function editEmployee(id, data) {
    const response = await fetch(`${API_URL}/api/employees/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo editar el empleado"));
    }
    return response.text();
}

export async function deleteEmployee(id) {
    const response = await fetch(`${API_URL}/api/employees/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo eliminar el empleado"));
    }
    return response.text();
}

export async function getEmployeeSchedule(employeeId) {
    const response = await fetch(`${API_URL}/api/employees/${employeeId}/schedule`, {
        headers: authHeaders()
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar los horarios del empleado"));
    }
    return response.json();
}

export async function createEmployeeSchedule(employeeId, data) {
    const response = await fetch(`${API_URL}/api/employees/${employeeId}/schedule`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo crear el horario del empleado"));
    }
    return response.text();
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


export function getToken() {
    return localStorage.getItem("token");
}


export function logout() {
    localStorage.removeItem("token");
}
