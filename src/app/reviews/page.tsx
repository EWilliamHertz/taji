import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import { ReviewsGrid } from "@/components/ReviewsGrid";
import { query } from "@/lib/db";

export default async function ReviewsPage() {
  let reviews: any[] = [];

  try {
    const reviewsRes = await query("SELECT * FROM reviews ORDER BY id DESC");
    reviews = reviewsRes.rows;
  } catch (e) {
    console.error("Error fetching data:", e);
  }

  let googleStats = { rating: 5, userRatingCount: 0 };

  // Fetch Google Reviews
  try {
    const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
    
    if (googleApiKey && placeId) {
      const googleRes = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&key=${googleApiKey}`, { next: { revalidate: 3600 } });
      if (googleRes.ok) {
        const googleData = await googleRes.json();
        if (googleData.rating) {
          googleStats = { rating: googleData.rating, userRatingCount: googleData.userRatingCount };
        }
        if (googleData.reviews) {
          const googleReviews = googleData.reviews.map((r: any, idx: number) => ({
            id: `google-${idx}`,
            author: r.authorAttribution?.displayName || "Anonymous",
            rating: r.rating,
            content_en: r.text?.text || "",
            content_sv: r.text?.text || "", 
          }));
          // Filter out DB reviews that share an author name with the live Google reviews to avoid duplicates
          const googleAuthors = new Set(googleReviews.map((r: any) => r.author));
          const filteredDbReviews = reviews.filter(r => !googleAuthors.has(r.author));
          reviews = [...googleReviews, ...filteredDbReviews];
        }
      }
    }
  } catch(e) {
    console.error("Error fetching Google Reviews:", e);
  }

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-400 selection:text-black pt-24">
        <Navigation locationData={null} />
        
        <div className="text-center mt-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Alla recensioner
          </h1>
          <p className="text-white/60 mb-4 font-bold uppercase tracking-widest text-sm">
            What Our Guests Say
          </p>
          
          {googleStats.userRatingCount > 0 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">Google</span>
                <span className="text-yellow-400 font-bold text-xl">{googleStats.rating}/5</span>
                <span className="text-white/60 text-sm">{googleStats.userRatingCount} reviews</span>
              </div>
            </div>
          )}
        </div>

        <ReviewsGrid reviews={reviews} />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-12">
          <a 
            href="https://share.google/wBdVn4UuI02Vd6dco"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-2"
          >
            Google
          </a>
        </div>

        <Footer />
      </main>
    </LanguageProvider>
  );
}
