import { Suspense } from "react";
import Register from "../../src/features/auth/pages/Register";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Register />
    </Suspense>
  );
}
