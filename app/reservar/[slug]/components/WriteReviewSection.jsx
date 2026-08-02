"use client";

import { useRouter } from "next/navigation";
import CustomerReviewForm from "../../../../src/features/reviews/components/CustomerReviewForm";

function WriteReviewSection({ slug }) {
    const router = useRouter();

    return (
        <CustomerReviewForm
            slug={slug}
            returnPath={`/reservar/${slug}`}
            onCreated={() => router.refresh()}
        />
    );
}

export default WriteReviewSection;
