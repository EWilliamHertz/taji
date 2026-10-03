"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      id="home" 
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-zinc-950 pt-20"
    >
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-zinc-950 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=2000&auto=format&fit=crop" 
          alt="Taji Foodtruck" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.1
          }}
          className="flex flex-col items-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-yellow-400 font-bold tracking-[0.2em] text-sm md:text-lg mb-4 uppercase"
          >
            {t("heroSubtitle")}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-none tracking-tighter mb-8 drop-shadow-2xl uppercase"
          >
            TAJI <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              TRUCK
            </span>
          </motion.h1>

          <motion.a
            href="#location"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-black font-black text-lg md:text-xl uppercase tracking-wider rounded-full overflow-hidden shadow-[0_0_40px_rgba(250,204,21,0.4)]"
          >
            <motion.span 
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 0.2 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              {t("heroCta")}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 right-10 w-24 h-24 bg-orange-500 rounded-full blur-[60px] opacity-50 pointer-events-none"
      />
    </section>
  );
}
