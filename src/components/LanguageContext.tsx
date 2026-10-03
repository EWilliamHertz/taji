"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "SV" | "DE";

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  navHome: { EN: "Home", SV: "Hem", DE: "Start" },
  navGallery: { EN: "Gallery", SV: "Galleri", DE: "Galerie" },
  navLocation: { EN: "Location", SV: "Plats", DE: "Standort" },
  heroSubtitle: {
    EN: "STREET FOOD REIMAGINED.",
    SV: "GATUMAT OMDEFINIERAD.",
    DE: "STREETFOOD NEU ERFUNDEN.",
  },
  heroCta: { EN: "Find Us Today", SV: "Hitta Oss Idag", DE: "Finde Uns Heute" },
  galleryTitle: {
    EN: "Instagram Menu Gallery",
    SV: "Instagram Meny Galleri",
    DE: "Instagram Menü Galerie",
  },
  gallerySubtitle: {
    EN: "Our latest creations directly from the feed.",
    SV: "Våra senaste skapelser direkt från flödet.",
    DE: "Unsere neuesten Kreationen direkt aus dem Feed.",
  },
  locationTitle: {
    EN: "Where to Find Us",
    SV: "Här Hittar Du Oss",
    DE: "Wo Du Uns Findest",
  },
  locationSubtitle: {
    EN: "Weekly Schedule",
    SV: "Veckoschema",
    DE: "Wochenplan",
  },
  footerText: {
    EN: "Taji Foodtruck. All rights reserved.",
    SV: "Taji Foodtruck. Alla rättigheter förbehållna.",
    DE: "Taji Foodtruck. Alle Rechte vorbehalten.",
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("EN");
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
