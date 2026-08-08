function BusinessEditForm({ businessForm, setField, handleSubmit, saving, slug }) {

return (
<div className="dash-business-edit">
<h2 className="dash-section-title">Datos del negocio</h2>
<p className="dash-business-edit-hint">
    Actualiza la información que ven tus clientes en la página pública.
</p>

<form className="dash-business-form" onSubmit={(e) => handleSubmit(e, slug)}>
    <div className="dash-business-field">
        <label htmlFor="edit-business-name">Nombre</label>
        <input
            id="edit-business-name"
            type="text"
            value={businessForm.name}
            onChange={(e) => setField("name", e.target.value)}
            required
            minLength={2}
            maxLength={50}
        />
    </div>

    <div className="dash-business-field">
        <label htmlFor="edit-business-email">Email</label>
        <input
            id="edit-business-email"
            type="email"
            value={businessForm.email}
            onChange={(e) => setField("email", e.target.value)}
        />
    </div>

    <div className="dash-business-field">
        <label htmlFor="edit-business-phone">Teléfono</label>
        <input
            id="edit-business-phone"
            type="tel"
            value={businessForm.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="Opcional"
        />
    </div>

    <div className="dash-business-field dash-business-field--full">
        <label htmlFor="edit-business-address">Dirección</label>
        <input
            id="edit-business-address"
            type="text"
            value={businessForm.address}
            onChange={(e) => setField("address", e.target.value)}
            placeholder="Opcional"
        />
    </div>

    <div className="dash-business-field">
        <label htmlFor="edit-business-instagram">Instagram</label>
        <input
            id="edit-business-instagram"
            type="url"
            value={businessForm.instagramUrl}
            onChange={(e) => setField("instagramUrl", e.target.value)}
            placeholder="https://instagram.com/tu-negocio"
        />
    </div>

    <div className="dash-business-field">
        <label htmlFor="edit-business-tiktok">TikTok</label>
        <input
            id="edit-business-tiktok"
            type="url"
            value={businessForm.tiktokUrl}
            onChange={(e) => setField("tiktokUrl", e.target.value)}
            placeholder="https://tiktok.com/@tu-negocio"
        />
    </div>

    <div className="dash-business-field">
        <label htmlFor="edit-business-currency">Moneda</label>
        <select
            id="edit-business-currency"
            value={businessForm.currency}
            onChange={(e) => setField("currency", e.target.value)}
            required
        >
            <option value="EUR">Euro (€)</option>
            <option value="PEN">Sol peruano (S/)</option>
            <option value="USD">Dólar (US$)</option>
        </select>
    </div>

    <div className="dash-business-actions">
        <button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
        </button>
    </div>
</form>
</div>
);
}

export default BusinessEditForm;