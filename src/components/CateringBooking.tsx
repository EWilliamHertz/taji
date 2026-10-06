"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export function CateringBooking() {
  const { t } = useLanguage();

  return (
    <section id="catering" className="py-24 bg-[#09090b] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#115740]/10 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            {t("cateringTitle")}
          </h2>
          
          <div className="w-24 h-2 bg-yellow-400 mx-auto mb-8 rounded-full" />
          
          <p className="text-lg md:text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
            {t("cateringDesc")}
          </p>
          
          <a
            href="mailto:hello@taji.se"
            className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-black font-bold uppercase tracking-wider rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(250,204,21,0.3)]"
          >
            {t("cateringCta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
