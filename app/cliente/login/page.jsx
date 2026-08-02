import { Suspense } from "react";
import CustomerLogin from "../../../src/features/customer-auth/pages/CustomerLogin";

export default function CustomerLoginPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <CustomerLogin />
        </Suspense>
    );
}
