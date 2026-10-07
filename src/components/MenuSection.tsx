"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import Image from "next/image";

export function MenuSection() {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 1,
      titleKey: "menuItem1Title" as const,
      descKey: "menuItem1Desc" as const,
      price: "120 SEK",
      image: "/images/4A38A39A-706D-49AE-ABF7-D70049EE1267.png",
      tags: ["Halal"]
    },
    {
      id: 2,
      titleKey: "menuItem2Title" as const,
      descKey: "menuItem2Desc" as const,
      price: "110 SEK",
      image: "/images/1C0283B2-0087-4BE7-85C5-7D36736639D1.png",
      tags: ["Vegetarian", "Halal"]
    },
    {
      id: 3,
      titleKey: "menuItem3Title" as const,
      descKey: "menuItem3Desc" as const,
      price: "130 SEK",
      image: "/images/1358419A-7A06-49C1-A4B6-4C73E776ED16.png",
      tags: ["Spicy", "Halal"]
    }
  ];

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
          {menuItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-colors group"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={item.image}
                  alt={t(item.titleKey)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                    {t(item.titleKey)}
                  </h3>
                  <span className="text-yellow-400 font-black">{item.price}</span>
                </div>
                <p className="text-white/60 mb-6 text-sm leading-relaxed">
                  {t(item.descKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="bg-white/10 text-white/80 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
