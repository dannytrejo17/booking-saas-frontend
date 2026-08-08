import { useEffect, useState, useCallback } from "react";
import { editBusiness } from "../../business/api";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  instagramUrl: "",
  tiktokUrl: "",
  currency: "EUR",
};

export function useBusinessForm(onUserUpdate) {
  const [businessForm, setBusinessForm] = useState(initialFormState);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const setField = useCallback((field, value) => {
    setBusinessForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const syncWithUser = useCallback((user) => {
    const business = user?.business;
    if (!business) {
      setBusinessForm(initialFormState);
      return;
    }

    setBusinessForm({
      name: business.name || "",
      email: business.email || "",
      phone: business.phone || "",
      address: business.address || "",
      instagramUrl: business.instagramUrl || "",
      tiktokUrl: business.tiktokUrl || "",
      currency: business.currency || "EUR",
    });
  }, []);

  const handleSubmit = useCallback(
    async (e, slug, logo = "", onSuccess) => {
      e.preventDefault();
      if (saving) return;

      setSaving(true);
      setError("");
      setSuccess("");

      try {
        await editBusiness({
          ...businessForm,
          slug,
          logo,
          instagramUrl: businessForm.instagramUrl.trim() || null,
          tiktokUrl: businessForm.tiktokUrl.trim() || null,
        });
        setSuccess("Datos del negocio actualizados");
        if (onUserUpdate) await onUserUpdate();
        if (onSuccess) onSuccess();
      } catch (err) {
        setError(err.message || "No se pudo actualizar el negocio");
      } finally {
        setSaving(false);
      }
    },
    [businessForm, onUserUpdate, saving]
  );

  return {
    businessForm,
    setField,
    syncWithUser,
    handleSubmit,
    saving,
    success,
    error,
  };
}