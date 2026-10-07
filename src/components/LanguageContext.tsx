"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "SV";

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  navHome: { EN: "Home", SV: "Hem" },
  navStory: { EN: "Our Story", SV: "Vår Historia" },
  navGallery: { EN: "Gallery", SV: "Galleri" },
  navLocation: { EN: "Location", SV: "Plats" },
  navCatering: { EN: "Catering", SV: "Catering" },
  heroSubtitle: {
    EN: "STREET FOOD REIMAGINED.",
    SV: "Pakistansk Streetfood när det är som bäst!",
  },
  heroCta: { EN: "Find Us Today", SV: "Hitta Oss Idag" },
  galleryTitle: {
    EN: "Instagram Menu Gallery",
    SV: "Instagram Meny Galleri",
  },
  gallerySubtitle: {
    EN: "Our latest creations directly from the feed.",
    SV: "Våra senaste skapelser direkt från flödet.",
  },
  locationTitle: {
    EN: "Where to Find Us",
    SV: "Här Hittar Du Oss",
  },
  locationSubtitle: {
    EN: "Weekly Schedule",
    SV: "Veckoschema",
  },
  footerText: {
    EN: "Taji Foodtruck. All rights reserved.",
    SV: "Taji Foodtruck. Alla rättigheter förbehållna.",
  },
  storyTitle: { EN: "The Story of Taji", SV: "Historien bakom Taji" },
  storyP1: {
    EN: "Taji began as a side project for me and my wife Katrin. We both share a deep love for food—Katrin has over 10 years of experience in the restaurant industry, and I have spent many years working in kitchens. We started small, serving food from a table at local events.",
    SV: "Taji började egentligen som ett sidoprojekt för mig och min fru Katrin. Vi har båda en stor kärlek till mat. Katrin har mer än 10 års erfarenhet från restaurangbranschen och jag har många års erfarenhet av arbete i kök. Till en början började vi med mindre event och serverade maten från ett bord.",
  },
  storyP2: {
    EN: "After a while, we bought our first food truck, initially planning to balance it with our full-time jobs. A core part of Taji has always been our love for Paratha. It's been a staple in our family for years, and our children grew up with it as a natural part of our home-cooked meals.",
    SV: "Efter ett tag köpte vi vår första foodtruck. Tanken var från början att den skulle vara ett sidoprojekt som vi kunde kombinera med våra heltidsjobb. En viktig del av Taji har alltid varit vår kärlek till Paratha. I vår familj har vi ätit Paratha under många år och våra barn har vuxit upp med det som en naturlig del av maten hemma.",
  },
  storyP3: {
    EN: "That's why it felt natural to build our concept around Paratha Rolls, a popular street food in Pakistan. We took inspiration from the traditional dish but modernized it for the Swedish market, without losing the authentic feel and flavors of Pakistan.",
    SV: "Därför föll det sig naturligt att bygga vårt koncept kring Paratha Rolls, en populär streetfood-rätt i Pakistan. Vi har tagit inspiration från den traditionella rätten men moderniserat den för att passa den svenska marknaden, utan att tappa känslan och smakerna från Pakistan.",
  },
  storyP4: {
    EN: "We quickly realized we wanted to go all in. We took a leap of faith, left our jobs, and committed fully to Taji. Today, we work full-time with Taji and have been running our white food truck for two years.",
    SV: "Ganska kort efter att vi startade foodtrucken insåg vi att vi ville satsa fullt ut på konceptet. Vi tog ledigt från våra arbeten och andra åtaganden och valde att satsa på Taji på riktigt. Idag arbetar vi heltid med Taji och har drivit verksamheten i två år med vår vita foodtruck.",
  },
  storyP5: {
    EN: "The name Taji is very personal to us—it's created from our two children, Taria and Jibril (Ta + Ji = Taji). I have my roots in Pakistan, and my wife has hers in Bulgaria. Together, we've built Taji as a meeting point between our cultures, our family, and our love for food. // Bilal, Co-founder",
    SV: "Namnet Taji har dessutom en väldigt personlig betydelse för oss. Det är skapat utifrån våra två barn, Taria och Jibril – Ta + Ji = Taji. Jag har mina rötter i Pakistan och min fru har sina rötter i Bulgarien. Tillsammans har vi skapat Taji som en mötesplats mellan våra kulturer, vår familj och vår kärlek till mat. // Bilal, medgrundare",
  },
  storyAmbition: {
    EN: "Our ambition is simple: To take our guests on a taste journey through Pakistan – served our way.",
    SV: "Vår ambition är enkel: Att ta våra gäster på en smakresa genom Pakistan – serverad på vårt sätt.",
  },
  cateringTitle: { EN: "Catering & Booking", SV: "Catering & Bokning" },
  cateringDesc: { 
    EN: "Want Taji at your next event? We offer catering for corporate events, weddings, and private parties. Book our food truck to give your guests an unforgettable Pakistani street food experience.",
    SV: "Vill du ha Taji på ditt nästa event? Vi erbjuder catering för företagsevent, bröllop och privata fester. Boka vår foodtruck för att ge dina gäster en oförglömlig upplevelse av pakistansk streetfood."
  },
  cateringCta: { EN: "Contact Us for Booking", SV: "Kontakta Oss för Bokning" },
  bookingFormTitle: { EN: "Book Our Truck", SV: "Boka Vår Truck" },
  bookingSuccess: { EN: "Booking Confirmed! We'll be in touch soon.", SV: "Bokning bekräftad! Vi hör av oss snart." },
  formSelectDate: { EN: "Select Date", SV: "Välj Datum" },
  formSelectTime: { EN: "Select Time", SV: "Välj Tid" },
  formName: { EN: "Name", SV: "Namn" },
  formNamePlaceholder: { EN: "Your name", SV: "Ditt namn" },
  formEmail: { EN: "Email", SV: "E-post" },
  formEmailPlaceholder: { EN: "your@email.com", SV: "din@epost.se" },
  formPhone: { EN: "Phone Number", SV: "Telefonnummer" },
  formPhonePlaceholder: { EN: "Your phone number", SV: "Ditt telefonnummer" },
  formGuests: { EN: "Number of Guests", SV: "Antal Gäster" },
  formSubmit: { EN: "Confirm Booking", SV: "Bekräfta Bokning" },
  formProcessing: { EN: "Processing...", SV: "Bearbetar..." },
  tabCatering: { EN: "Catering Event", SV: "Catering Event" },
  tabPreorder: { EN: "Pre-order Pickup", SV: "Förbeställning (Pickup)" },
  formDetails: { EN: "Additional Details", SV: "Övriga detaljer" },
  formDetailsCateringPlaceholder: { EN: "Event type, address, dietary requirements...", SV: "Eventtyp, adress, specialkost..." },
  formDetailsPreorderPlaceholder: { EN: "What would you like to order?", SV: "Vad vill du beställa?" },
  liveLocationBanner: { EN: "📍 Today's Location: Kista Science Tower (11:00 - 14:00)", SV: "📍 Dagens Plats: Kista Science Tower (11:00 - 14:00)" },
  menuTitle: { EN: "Our Menu", SV: "Vår Meny" },
  menuSubtitle: { EN: "Authentic Pakistani Street Food", SV: "Autentisk Pakistansk Streetfood" },
  menuItem1Title: { EN: "Classic Paratha Roll", SV: "Klassisk Paratha Rulle" },
  menuItem1Desc: { EN: "Crispy, flaky paratha bread filled with spiced chicken tikka, fresh coriander, and mint yogurt.", SV: "Frasigt parathabröd fyllt med kryddig kyckling tikka, färsk koriander och myntayoghurt." },
  menuItem2Title: { EN: "Paneer Paratha Roll", SV: "Paneer Paratha Rulle" },
  menuItem2Desc: { EN: "Vegetarian delight with grilled paneer cheese, pickled onions, and tamarind chutney.", SV: "Vegetarisk dröm med grillad paneer, picklad lök och tamarindchutney." },
  menuItem3Title: { EN: "Beef Seekh Kebab Roll", SV: "Nötkött Seekh Kebab Rulle" },
  menuItem3Desc: { EN: "Juicy minced beef kebabs cooked over open flame, wrapped in paratha with spicy green chutney.", SV: "Saftiga nötfärs-spett grillade över öppen eld, serveras i paratha med stark grön chutney." },
  noSchedule: { EN: "No schedule available yet. Check back soon!", SV: "Inget schema tillgängligt ännu. Kom tillbaka snart!" }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("SV"); // Set default to SV
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = (key: keyof typeof translations): string => {
    return translations[key]?.[lang] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
