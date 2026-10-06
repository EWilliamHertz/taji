"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export function Story() {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="absolute top-[-10%] right-[-5%] w-1/2 h-full text-[#115740] fill-current">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-white/80 text-lg leading-relaxed"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
              {t("storyTitle")}
              <span className="block h-2 w-24 bg-[#115740] mt-4"></span>
            </h2>
            
            <p>{t("storyP1")}</p>
            <p>{t("storyP2")}</p>
            <p>{t("storyP3")}</p>
            <p>{t("storyP4")}</p>
            <p>{t("storyP5")}</p>
            
            <div className="mt-8 p-6 bg-[#115740]/10 border-l-4 border-[#115740] rounded-r-lg">
              <p className="text-xl font-medium text-white italic">
                "{t("storyAmbition")}"
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[700px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="/images/1C0283B2-0087-4BE7-85C5-7D36736639D1.png" 
              alt="Taji Food"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Optional decorative overlay text */}
            <div className="absolute bottom-8 left-8 right-8">
               <p className="text-yellow-400 font-black tracking-widest uppercase text-sm mb-2">
                 Modern Street Food
               </p>
               <p className="text-white text-2xl font-bold">
                 Roots in Pakistan. Served our way.
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
