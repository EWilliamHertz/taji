"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import Image from "next/image";

export function MenuSection({ menuItems }: { menuItems: any[] }) {
  const { t, lang } = useLanguage();

  return (
    <section id="menu" className="py-24 bg-[#09090b] relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4"
          >
            {t("menuTitle")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-yellow-400 text-lg font-bold uppercase tracking-widest"
          >
            {t("menuSubtitle")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, i) => {
            const title = lang === "SV" ? item.title_sv : item.title_en;
            const desc = lang === "SV" ? item.desc_sv : item.desc_en;
            const tags = item.tags ? item.tags.split(',') : [];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-[#111] border border-white/5 rounded-2xl overflow-hidden transition-colors group relative ${item.is_sold_out ? 'opacity-70 grayscale' : 'hover:border-yellow-400/50'}`}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={item.image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.is_sold_out && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-red-600 text-white font-black px-4 py-2 rounded uppercase tracking-widest rotate-[-10deg] text-xl border-2 border-red-500">Sold Out</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                      {title}
                    </h3>
                    <span className="text-yellow-400 font-black">{item.price}</span>
                  </div>
                  <p className="text-white/60 mb-6 text-sm leading-relaxed">
                    {desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: string) => (
                      <span key={tag} className="bg-white/10 text-white/80 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
