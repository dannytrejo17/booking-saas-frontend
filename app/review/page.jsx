import { Suspense } from "react";
import PublicReview from "../../src/features/reviews/pages/PublicReview";

export default function ReviewPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PublicReview />
    </Suspense>
  );
}
