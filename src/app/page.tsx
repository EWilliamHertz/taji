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
  
  let locationText = "";
  let fullSchedule: any[] = [];
  let menuItems: any[] = [];
  let reviews: any[] = [];

  try {
    const scheduleRes = await query("SELECT * FROM weekly_schedule ORDER BY id ASC");
    fullSchedule = scheduleRes.rows;

    const todayRow = fullSchedule.find(r => r.day_of_week === today);
    if (todayRow && todayRow.is_active && todayRow.location_name) {
      locationText = `${todayRow.location_name} (${todayRow.time_range})`;
    }

    const menuRes = await query("SELECT * FROM menu_items ORDER BY id ASC");
    menuItems = menuRes.rows;

    const reviewsRes = await query("SELECT * FROM reviews ORDER BY id DESC");
    reviews = reviewsRes.rows;
  } catch (e) {
    console.error("Error fetching data:", e);
  }

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-400 selection:text-black">
        <Navigation locationText={locationText} />
        <Hero />
        <Story />
        <MenuSection menuItems={menuItems} />
        <ReviewsCarousel reviews={reviews} />
        <CateringBooking />
        <Gallery />
        <LocationSchedule scheduleData={fullSchedule} />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
