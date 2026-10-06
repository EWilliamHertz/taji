import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Gallery } from "@/components/Gallery";
import { LocationSchedule } from "@/components/LocationSchedule";
import { CateringBooking } from "@/components/CateringBooking";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-400 selection:text-black">
        <Navigation />
        <Hero />
        <Story />
        <CateringBooking />
        <Gallery />
        <LocationSchedule />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
