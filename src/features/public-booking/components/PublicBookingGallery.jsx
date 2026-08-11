function PublicGallery({ galleryImages }) {
    if (galleryImages.length === 0) {
        return null;
    }

    return (
        <section className="public-section public-gallery-section">
            <div className="public-section-header">
                <h2>Galería</h2>
                <p>Imágenes del lugar para que tus clientes vean mejor el ambiente.</p>
            </div>

            <div className="public-gallery-grid">
                {galleryImages.map((imageUrl, index) => (
                    <div
                        key={`${imageUrl}-${index}`}
                        className="public-gallery-card"
                    >
                        <img
                            src={imageUrl}
                            alt={`Galería ${index + 1}`}
                            className="public-gallery-img"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PublicGallery;