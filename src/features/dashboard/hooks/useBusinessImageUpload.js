import { useState, useCallback, useMemo } from "react";
import { uploadBusinessImage, updateBusinessGalleryImage } from "../../business/api";

export function useBusinessImageUpload(user, onUserUpdate) {
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const galleryItems = useMemo(() => {
    if (Array.isArray(user?.business?.galleryItems) && user.business.galleryItems.length > 0) {
      return user.business.galleryItems;
    }
    const urls = user?.business?.gallery ?? [];
    const ids = user?.business?.galleryImageIds ?? [];
    return urls.map((imageUrl, index) => ({
      id: ids[index] ?? null,
      imageUrl,
    }));
  }, [user]);

  const maxGalleryImages = 3;
  const canUploadGallery = galleryItems.length < maxGalleryImages;

  const uploadImage = useCallback(
    async (file, type) => {
      if (!file) return;

      try {
        setUploadError("");
        setUploadSuccess("");
        await uploadBusinessImage(file, type);
        if (onUserUpdate) await onUserUpdate();
        setUploadSuccess(
          type === "logo"
            ? "Logo actualizado"
            : type === "cover"
            ? "Portada actualizada"
            : "Imagen de galería subida"
        );
      } catch (err) {
        setUploadError(err.message || "No se pudo subir la imagen");
      }
    },
    [onUserUpdate]
  );

  const updateGalleryImage = useCallback(
    async (imageId, file) => {
      if (!file || !imageId) return;

      try {
        setUploadError("");
        setUploadSuccess("");
        await updateBusinessGalleryImage(imageId, file);
        if (onUserUpdate) await onUserUpdate();
        setUploadSuccess("Imagen de galería actualizada");
      } catch (err) {
        setUploadError(err.message || "No se pudo actualizar la imagen");
      }
    },
    [onUserUpdate]
  );

  return {
    galleryItems,
    canUploadGallery,
    uploadImage,
    updateGalleryImage,
    uploadError,
    uploadSuccess,
    maxGalleryImages,
  };
}
