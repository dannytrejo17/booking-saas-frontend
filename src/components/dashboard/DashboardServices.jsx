import { useState, useEffect } from "react";
import {
    getServices,
    createService,
    editService,
    deleteService,
} from "../../services/authService";

function DashboardServices() {
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [serviceDuration, setServiceDuration] = useState("");
    const [editingServiceId, setEditingServiceId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchServices();
    }, []);

    const handleSubmitService = async (e) => {
        e.preventDefault();

        try {
            if (editingServiceId) {
                await editService(editingServiceId, {
                    name: serviceName,
                    price: Number(servicePrice),
                    duration: Number(serviceDuration),
                });
            } else {
                await createService({
                    name: serviceName,
                    price: Number(servicePrice),
                    duration: Number(serviceDuration),
                });
            }

            const data = await getServices();
            setServices(data);
            setServiceName("");
            setServicePrice("");
            setServiceDuration("");
            setEditingServiceId(null);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleStartEditService = (service) => {
        setEditingServiceId(service.id);
        setServiceName(service.name);
        setServicePrice(String(service.price));
        setServiceDuration(String(service.duration));
        setError("");
    };

    const handleDeleteService = async (id) => {
        try {
            await deleteService(id);
            const data = await getServices();
            setServices(data);
            setError("");
            if (editingServiceId === id) {
                setServiceName("");
                setServicePrice("");
                setServiceDuration("");
                setEditingServiceId(null);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="dash-section">
            <h2 className="dash-section-title">Servicios</h2>

            <form className="dash-form" onSubmit={handleSubmitService}>
                <input
                    type="text"
                    placeholder="Nombre del servicio"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio (S/)"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Duración (minutos)"
                    value={serviceDuration}
                    onChange={(e) => setServiceDuration(e.target.value)}
                />
                <button type="submit">
                    {editingServiceId ? "Guardar cambios" : "Añadir servicio"}
                </button>
            </form>

            {error && <p className="dash-error">{error}</p>}

            {services.length === 0 && (
                <p className="dash-empty">No hay servicios todavía</p>
            )}

            <div className="dash-service-grid">
                {services.map((service) => (
                    <div key={service.id} className="dash-service-card">
                        <h3>{service.name}</h3>
                        <p className="dash-service-price">S/ {service.price}</p>
                        <p className="dash-service-duration">{service.duration} min</p>
                        <button
                            type="button"
                            className="dash-btn-edit"
                            onClick={() => handleStartEditService(service)}
                        >
                            editar
                        </button>
                        <button
                            type="button"
                            className="dash-btn-delete"
                            onClick={() => handleDeleteService(service.id)}
                        >
                            eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashboardServices;
