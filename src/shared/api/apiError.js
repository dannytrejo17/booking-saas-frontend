export async function getErrorMessage(response, fallback = "Ha ocurrido un error") {
    const text = (await response.text()).trim();
    if (!text) {
        return fallback;
    }

    try {
        const data = JSON.parse(text);
        if (typeof data?.message === "string" && data.message.trim()) {
            return data.message.trim();
        }
        if (typeof data?.error === "string" && data.error.trim()) {
            return data.error.trim();
        }
    } catch {
    
    }


    if (text.startsWith("{") || text.startsWith("[")) {
        return fallback;
    }

    return text;
}
