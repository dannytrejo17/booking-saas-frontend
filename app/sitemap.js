const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://turnexa.vercel.app";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function sitemap() {
    const staticRoutes = [
        {
            url: `${BASE_URL}/`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
    ];

    try {
        const response = await fetch(`${API_URL}/api/public`);
        const businesses = await response.json();

        const businessRoutes = businesses.flatMap((business) => [
            {
                url: `${BASE_URL}/reservar/${business.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.9,
            },
            {
                url: `${BASE_URL}/reservar/${business.slug}/reviews`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.7,
            },
        ]);

        return [...staticRoutes, ...businessRoutes];
    } catch {
        return staticRoutes;
    }
}
