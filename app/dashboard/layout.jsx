"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../../src/features/auth/api";
import DashboardLayout from "../../src/layouts/DashboardLayout";

export default function DashboardRootLayout({ children }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    setOk(true);
  }, [router]);

  if (!ok) {
    return <div>Cargando...</div>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
