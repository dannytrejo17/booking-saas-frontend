import { useEffect, useState } from "react";
import { getPublicReviews } from "../../reviews/api";

export function usePublicReviews(slug) {
    const [reviews, setReviews] = useState([]);
    const [reviewTotalPages, setReviewTotalPages] = useState(0);
    const [reviewsLoading, setReviewsLoading] = useState(false);

    
    useEffect(() =>{
        if(!slug) return;

        const fetchReviews = async () => {
            setReviewsLoading(true);
            try {
                const data = await getPublicReviews(slug, 0, 10);

                setReviews(data.content || []);
                setReviewTotalPages(data.totalPages || 0);

            } catch (err) {
                console.error(err);
            } finally {
                setReviewsLoading(false);
            }
            }; 

            fetchReviews();
    }, [slug]);

    return {
        reviews,
        reviewTotalPages,
        reviewsLoading,
    };
}