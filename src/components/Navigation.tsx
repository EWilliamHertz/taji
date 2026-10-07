"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Navigation({ locationData }: { locationData?: { type: string, text: string } | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("navHome"), href: "#home" },
    { name: t("navStory"), href: "#story" },
    { name: t("menuTitle"), href: "#menu" },
    { name: t("navCatering"), href: "#catering" },
    { name: t("navGallery"), href: "#gallery" },
    { name: t("navLocation"), href: "#location" },
  ];

  const langs: ("EN" | "SV")[] = ["EN", "SV"];
  
  const getPrefix = () => {
    if (!locationData) return "";
    if (locationData.type === "today") {
      return lang === "SV" ? "📍 Dagens Plats:" : "📍 Today's Location:";
    } else if (locationData.type === "tomorrow") {
      return lang === "SV" ? "📍 Imorgon:" : "📍 Tomorrow:";
    } else {
      return lang === "SV" ? "📍 Nästa Plats:" : "📍 Next Location:";
    }
  };

  const prefix = getPrefix();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      {locationData && (
        <div className="bg-yellow-400 text-black py-2 px-4 text-center text-sm sm:text-base font-bold tracking-wide">
          <a href="#location" className="hover:underline flex items-center justify-center gap-2">
            {prefix} {locationData.text}
          </a>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="text-white hover:text-yellow-400 transition-colors w-24"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Logo className="w-full h-auto drop-shadow-md" />
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.li key={link.name} whileHover={{ y: -2 }}>
                <a
                  href={link.href}
                  className="text-white/80 hover:text-white font-medium transition-colors"
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
          
          <div className="flex items-center space-x-2 bg-white/10 rounded-full p-1">
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold transition-colors",
                  lang === l ? "bg-yellow-400 text-black" : "text-white hover:bg-white/20"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center h-[80vh] space-y-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-black text-white uppercase tracking-wider hover:text-yellow-400 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex space-x-4 mt-8"
              >
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "px-6 py-2 rounded-full text-lg font-bold transition-all",
                      lang === l ? "bg-yellow-400 text-black" : "bg-white/10 text-white"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
