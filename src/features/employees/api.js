import { getErrorMessage } from "../../shared/api/apiError";
import { getToken } from "../auth/api";

const API_URL = import.meta.env.VITE_API_URL;

function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    };
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

export async function deleteEmployeeSchedule(employeeId, dayOfWeek) {
    const params = new URLSearchParams({ dayOfWeek });
    const response = await fetch(
        `${API_URL}/api/employees/${employeeId}/schedule?${params}`,
        {
            method: "DELETE",
            headers: authHeaders(),
        }
    );
    if (!response.ok) {
        throw new Error(
            await getErrorMessage(response, "No se pudo eliminar el horario del empleado")
        );
    }
    return response.text();
}
