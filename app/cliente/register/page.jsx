import { redirect } from "next/navigation";

export default async function CustomerRegisterPage({ searchParams }) {
    const params = await searchParams;
    const next = typeof params?.next === "string" ? params.next : "";
    const target = next
        ? `/register?next=${encodeURIComponent(next)}`
        : "/register";
    redirect(target);
}
