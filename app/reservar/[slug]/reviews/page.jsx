import { notFound } from "next/navigation";
import { getPublicBusiness } from "../../../../src/features/public-booking/api";
import { getPublicReviews } from "../../../../src/features/reviews/api";
import ReviewsClient from "../components/ReviewsClient";

export async function generateMetadata({ params }) {
    try {
        const { slug } = await params;
        const business = await getPublicBusiness(slug);
        return {
            title: `Reseñas de ${business.name}`,
            description: `Lee las reseñas de clientes de ${business.name} y reserva tu cita online.`,
            openGraph: {
                title: `Reseñas de ${business.name}`,
                description: `Lee las reseñas de clientes de ${business.name} y reserva tu cita online.`,
                type: "website",
                ...(business.logo && { images: [{ url: business.logo }] }),
            },
        };
    } catch {
        return { title: "Reseñas" };
    }
}

export default async function ReviewsPage({ params }) {
    const { slug } = await params;

    let business;
    try {
        business = await getPublicBusiness(slug);
    } catch {
        notFound();
    }

    const reviewsData = await getPublicReviews(slug, 0, 10).catch(() => ({ content: [], totalPages: 0 }));
    const initialReviews = reviewsData.content || [];
    const totalPages = reviewsData.totalPages || 0;

    return (
        <ReviewsClient
            slug={slug}
            businessName={business.name}
            initialReviews={initialReviews}
            totalPages={totalPages}
        />
    );
}