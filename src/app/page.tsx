import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { MenuSection } from "@/components/MenuSection";
import { Gallery } from "@/components/Gallery";
import { LocationSchedule } from "@/components/LocationSchedule";
import { CateringBooking } from "@/components/CateringBooking";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { LanguageProvider } from "@/components/LanguageContext";
import { query } from "@/lib/db";

export default async function Home() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  
  let locationData = null;
  let fullSchedule: any[] = [];
  let menuItems: any[] = [];
  let reviews: any[] = [];
  let instagramPosts: any[] = [];

  try {
    const scheduleRes = await query("SELECT * FROM weekly_schedule ORDER BY id ASC");
    fullSchedule = scheduleRes.rows;

    const stockholmDate = new Date().toLocaleString("en-US", { timeZone: "Europe/Stockholm" });
    const now = new Date(stockholmDate);
    const currentDayStr = now.toLocaleDateString("en-US", { weekday: 'long' });
    const currentTime = now.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }); // "HH:MM"

    let todayIndex = days.indexOf(currentDayStr);

    for (let i = 0; i < 7; i++) {
      const checkIndex = (todayIndex + i) % 7;
      const checkDayStr = days[checkIndex];
      const row = fullSchedule.find(r => r.day_of_week === checkDayStr);
      
      if (row && row.is_active && row.location_name) {
        if (i === 0) {
          // Today. Check if time has passed
          const timeRange = row.time_range || "";
          const parts = timeRange.split("-");
          const endTime = parts.length > 1 ? parts[1].trim() : "23:59";
          
          if (currentTime <= endTime) {
            locationData = { type: "today", text: `${row.location_name} (${row.time_range})` };
            break;
          }
          // If passed, loop continues to tomorrow
        } else if (i === 1) {
          locationData = { type: "tomorrow", text: `${row.location_name} (${row.time_range})` };
          break;
        } else {
          locationData = { type: "future", text: `${row.location_name} (${row.time_range})` };
          break;
        }
      }
    }

    const menuRes = await query("SELECT * FROM menu_items ORDER BY id ASC");
    menuItems = menuRes.rows;

    const reviewsRes = await query("SELECT * FROM reviews ORDER BY id DESC");
    reviews = reviewsRes.rows;
  } catch (e) {
    console.error("Error fetching data:", e);
  }

  // Fetch Google Reviews
  try {
    const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
    
    if (googleApiKey && placeId) {
      const googleRes = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=reviews&key=${googleApiKey}`, { next: { revalidate: 3600 } });
      if (googleRes.ok) {
        const googleData = await googleRes.json();
        if (googleData.reviews) {
          const googleReviews = googleData.reviews.map((r: any, idx: number) => ({
            id: `google-${idx}`,
            author: r.authorAttribution?.displayName || "Anonymous",
            rating: r.rating,
            // We use the same text for both languages since Google returns the review as-is
            content_en: r.text?.text || "",
            content_sv: r.text?.text || "", 
          }));
          const googleAuthors = new Set(googleReviews.map((r: any) => r.author));
          const filteredDbReviews = reviews.filter(r => !googleAuthors.has(r.author));
          reviews = [...googleReviews, ...filteredDbReviews];
        }
      }
    }
  } catch(e) {
    console.error("Error fetching Google Reviews:", e);
  }

  // Shuffle and pick up to 16 reviews for the front page
  const shuffledReviews = [...reviews].sort(() => 0.5 - Math.random()).slice(0, 16);

  // Fetch Instagram Posts
  try {
    const igToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (igToken) {
      const igRes = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${igToken}`, { next: { revalidate: 3600 } });
      if (igRes.ok) {
        const igData = await igRes.json();
        instagramPosts = igData.data || [];
      }
    }
  } catch(e) {
    console.error("Error fetching Instagram posts:", e);
  }

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-400 selection:text-black">
        <Navigation locationData={locationData} />
        <Hero />
        <Story />
        <MenuSection menuItems={menuItems} />
        <ReviewsCarousel reviews={shuffledReviews} />
        <CateringBooking />
        <Gallery posts={instagramPosts} />
        <LocationSchedule scheduleData={fullSchedule} />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
