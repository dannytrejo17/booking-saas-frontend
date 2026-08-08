import { useEffect } from "react";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { useBusinessForm } from "../hooks/useBusinessForm";
import { useBusinessImageUpload } from "../hooks/useBusinessImageUpload";
import PublicPageLink from "../components/summary/PublicPageLink";
import BusinessInfoCards from "../components/summary/BusinessInfoCards";
import SummaryStats from "../components/summary/SummaryStats";
import BusinessEditForm from "../components/summary/BusinessEditForm";

function Summary({ user, onUserUpdate }) {

    const {
        businessForm,
        setField,
        syncWithUser,
        handleSubmit,
        saving,
        success,
        error,
    } = useBusinessForm(onUserUpdate);


    useEffect(() => {
        syncWithUser(user);
    }, [user, syncWithUser]);


    const {
        services,
        employees,
        bookings,
        loading,
        error: summaryError,
    } = useDashboardSummary();

    
    const {
        galleryItems,
        canUploadGallery,
        uploadImage,
        updateGalleryImage,
        uploadError,
        uploadSuccess,
        maxGalleryImages,
    } = useBusinessImageUpload(user, onUserUpdate);


    const now = new Date();
    const todayLocal = (() => {
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    })();

    const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const todayBookingsCount = bookings.filter((booking) => {
        if (!booking.startAt) return false;
        return booking.startAt.slice(0, 10) === todayLocal;
    }).length;

    const monthBookingsCount = bookings.filter((booking) => {
        if (!booking.startAt) return false;
        return booking.startAt.slice(0, 7) === monthPrefix;
    }).length;

    return (
        <div className="dash-section">

            <BusinessInfoCards
                name={user.business.name}
                email={user.business.email}
            />

            <PublicPageLink slug={user.business.slug} />

            <SummaryStats 
                services={services}
                employees={employees}
                monthBookingsCount={monthBookingsCount}
                todayBookingsCount={todayBookingsCount}
            />

            <BusinessEditForm
                businessForm={businessForm}
                setField={setField}
                handleSubmit={handleSubmit}
                saving={saving}
                slug={user.business.slug}
            />
            {success && <p className="dash-success">{success}</p>}
            {error && <p className="dash-error">{error}</p>}

            <div className="dash-images">
                <h2 className="dash-section-title">Imágenes del negocio</h2>
                <p className="dash-images-hint">
                    JPG, PNG o WEBP. El logo se ve circular en tu página pública; la portada como fondo del hero.
                </p>

                <div className="dash-images-grid">
                    <div className="dash-image-card">
                        <span className="dash-image-card-label">Logo</span>
                        <div className="dash-image-preview dash-image-preview--logo">
                            {user.business.logo ? (
                                <img src={user.business.logo} alt="Logo del negocio" />
                            ) : (
                                <span className="dash-image-placeholder">Sin logo</span>
                            )}
                        </div>
                        <label className="dash-image-btn">
                            {user.business.logo ? "Cambiar logo" : "Subir logo"}
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => uploadImage(e.target.files[0], "logo")}
                            />
                        </label>
                    </div>

                    <div className="dash-image-card">
                        <span className="dash-image-card-label">Portada</span>
                        <div className="dash-image-preview dash-image-preview--cover">
                            {user.business.coverImage ? (
                                <img src={user.business.coverImage} alt="Portada del negocio" />
                            ) : (
                                <span className="dash-image-placeholder">Sin portada</span>
                            )}
                        </div>
                        <label className="dash-image-btn">
                            {user.business.coverImage ? "Cambiar portada" : "Subir portada"}
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => uploadImage(e.target.files[0], "cover")}
                            />
                        </label>
                    </div>
                </div>

                <div className="dash-gallery-section">
                    <div className="dash-gallery-header">
                        <div>
                            <span className="dash-image-card-label">Galería</span>
                            <p className="dash-gallery-hint">
                                Hasta {maxGalleryImages} imágenes extra para mostrar más contenido de tu negocio.
                            </p>
                        </div>
                        <label className={`dash-image-btn dash-gallery-upload-btn ${!canUploadGallery ? "dash-image-btn--disabled" : ""}`}>
                            {canUploadGallery ? "Subir imagen" : "Límite alcanzado"}
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                disabled={!canUploadGallery}
                                onChange={(e) => uploadImage(e.target.files[0], "gallery")}
                            />
                        </label>
                    </div>

                    <div className="dash-gallery-grid">
                        {galleryItems.length > 0 ? (
                            galleryItems.map((item, index) => {
                                const imageUrl = item?.imageUrl ?? "";
                                const imageId = item?.id ?? null;
                                return (
                                    <div key={`${imageId ?? imageUrl}-${index}`} className="dash-gallery-item">
                                        <img src={imageUrl} alt={`Galería ${index + 1}`} />
                                        <label
                                            className={`dash-gallery-update-btn${!imageId ? " is-disabled" : ""}`}
                                        >
                                            Actualizar
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                disabled={!imageId}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    e.target.value = "";
                                                    if (file && imageId) {
                                                        updateGalleryImage(imageId, file);
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="dash-gallery-empty">
                                <span className="dash-image-placeholder">Aún no has subido imágenes a la galería</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {uploadSuccess && <p className="dash-success">{uploadSuccess}</p>}
            {uploadError && <p className="dash-error">{uploadError}</p>}
        </div>
    );
}

export default Summary;
