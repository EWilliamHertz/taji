"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { mockGalleryData } from "@/data/mockGallery";
import { Camera } from "lucide-react";

export function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-xl"
          >
            <Camera size={32} className="text-white" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4"
          >
            {t("galleryTitle")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-2xl"
          >
            {t("gallerySubtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {mockGalleryData.map((item, index) => (
            <motion.div
              key={item.Filename}
              initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: index * 0.1 
              }}
              className="bg-white p-4 pb-16 md:pb-20 rounded-lg shadow-2xl relative group transform-gpu cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded shadow-inner">
                <img 
                  src={item.ImageURL} 
                  alt={item.AI_Label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* AI Label Overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/70 p-6 flex items-center justify-center text-center backdrop-blur-sm"
                >
                  <p className="text-white font-medium text-sm md:text-base leading-relaxed font-mono">
                    "{item.AI_Label}"
                  </p>
                </motion.div>
              </div>
              
              <div className="absolute bottom-4 left-0 w-full px-4 text-center">
                <span className="font-handwriting text-zinc-800 text-xl md:text-2xl opacity-80">
                  @tajifoodtruck
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-full h-full overflow-hidden pointer-events-none -z-0">
        <motion.div 
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-[20rem] font-black text-white/5 whitespace-nowrap uppercase tracking-tighter"
        >
          TAJI TAJI TAJI
        </motion.div>
      </div>
    </section>
  );
}
