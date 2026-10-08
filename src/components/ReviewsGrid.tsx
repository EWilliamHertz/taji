"use client";

import { useLanguage } from "../components/LanguageContext";
import { ReviewCard } from "../components/ReviewsCarousel";

export function ReviewsGrid({ reviews }: { reviews: any[] }) {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 py-12">
      {reviews.map((review, i) => (
        <ReviewCard key={review.id} review={review} index={i} lang={lang} isGrid={true} />
      ))}
    </div>
  );
}
