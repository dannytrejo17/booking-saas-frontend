const CURRENCY_SYMBOLS = {
    EUR: "€",
    PEN: "S/",
    USD: "US$",
};

export function getCurrencySymbol(currency) {
    if (!currency) return CURRENCY_SYMBOLS.EUR;
    return CURRENCY_SYMBOLS[String(currency).toUpperCase()] || CURRENCY_SYMBOLS.EUR;
}

export function formatPrice(amount, currency) {
    const symbol = getCurrencySymbol(currency);
    const value = Number(amount);
    const formatted = Number.isFinite(value) ? value.toFixed(2) : String(amount ?? "");
    return `${symbol} ${formatted}`;
}
