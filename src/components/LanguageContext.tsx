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
    SV: "GATUMAT OMDEFINIERAD.",
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
    EN: "The name Taji is very personal to us—it's created from our two children, Taria and Jibril (Ta + Ji = Taji). I have my roots in Pakistan, and my wife has hers in Bulgaria. Together, we've built Taji as a meeting point between our cultures, our family, and our love for food.",
    SV: "Namnet Taji har dessutom en väldigt personlig betydelse för oss. Det är skapat utifrån våra två barn, Taria och Jibril – Ta + Ji = Taji. Jag har mina rötter i Pakistan och min fru har sina rötter i Bulgarien. Tillsammans har vi skapat Taji som en mötesplats mellan våra kulturer, vår familj och vår kärlek till mat.",
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
  cateringCta: { EN: "Contact Us for Booking", SV: "Kontakta Oss för Bokning" }
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
