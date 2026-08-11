import { formatPrice } from "../../../shared/currency";

function PublicServices({
    services,
    serviceId,
    setServiceId,
    currency,
}) {
    if (!services?.length) {
        return null;
    }

    return (
        <section className="public-section">
            <div className="public-section-header">
                <h2>Servicios</h2>
                <p>Selecciona el servicio que deseas reservar</p>
            </div>

            <div className="public-grid">
                {services.map((service) => (
                    <button
                        key={service.id}
                        type="button"
                        className={`public-service-card ${
                            String(service.id) === serviceId ? "selected" : ""
                        }`}
                        onClick={() => setServiceId(String(service.id))}
                    >
                        <div className="public-service-top">
                            <h3>{service.name}</h3>

                            {service.duration && (
                                <span className="public-service-duration">
                                    {service.duration} min
                                </span>
                            )}
                        </div>

                        <p className="public-service-price">
                            {formatPrice(service.price, currency)}
                        </p>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default PublicServices;