const API_URL = import.meta.env.VITE_API_URL;


export async function getPublicBusiness(slug) {
    const response = await fetch(`${API_URL}/api/public/${slug}`);

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}


export async function getPublicServices(slug) {

    const response = await fetch(`${API_URL}/api/public/${slug}/services`);

    if(!response.ok){
        throw new Error(await response.text());
    }

    return response.json();
}

export async function getPublicEmployees(slug) {
    const response = await fetch(`${API_URL}/api/public/${slug}/employees`);

    if(!response.ok){
        throw new Error(await response.text());
    }

    return response.json();
}


export async function getAvailability(slug, serviceId, employeeId, date) {
    const params = new URLSearchParams({
        serviceId: String(serviceId),
        employeeId: String(employeeId),
        date,
    });

    const response = await fetch(
        `${API_URL}/api/public/${slug}/bookings/availability?${params}`
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}


export async function createPublicBooking(slug, data) {
    const response = await fetch(`${API_URL}/api/public/${slug}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.text();
}
