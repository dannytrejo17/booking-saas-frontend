"use client";

import Summary from "../../src/features/dashboard/pages/Summary";
import { useDashboard } from "../../src/features/dashboard/DashboardContext";

export default function DashboardPage() {
  const { user, refreshUser } = useDashboard();
  return <Summary user={user} onUserUpdate={refreshUser} />;
}
