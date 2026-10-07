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

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-400 selection:text-black">
        <Navigation locationData={locationData} />
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
