"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function MenuSection({ menuItems }: { menuItems: any[] }) {
  const { t, lang } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getImages = (item: any) => {
    if (!item) return [];
    const imgs = [];
    if (item.image) imgs.push(item.image);
    if (item.additional_images) {
      imgs.push(...item.additional_images.split(',').map((u: string) => u.trim()).filter((u: string) => u));
    }
    return imgs;
  };

  const handleNextImage = (e: React.MouseEvent, imgs: string[]) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imgs.length);
  };

  const handlePrevImage = (e: React.MouseEvent, imgs: string[]) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    // document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedItem(null);
    // document.body.style.overflow = "auto";
  };

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

            const formatPrice = (price: string) => {
              if (!price) return "";
              if (price.toLowerCase().includes("kr") || price.toLowerCase().includes("sek")) return price;
              return `${price} kr`;
            };

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => openModal(item)}
                className={`bg-[#111] border border-white/5 rounded-2xl overflow-hidden transition-colors group relative cursor-pointer ${item.is_sold_out ? 'opacity-70 grayscale' : 'hover:border-yellow-400/50'}`}
              >
                {item.image && (
                  <div className="relative h-64 w-full overflow-hidden bg-black">
                    <Image 
                      src={item.image}
                      alt={title || "Menu item"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.is_sold_out && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-red-600 text-white font-black px-4 py-2 rounded uppercase tracking-widest rotate-[-10deg] text-xl border-2 border-red-500">Sold Out</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                      {title}
                    </h3>
                    <span className="text-yellow-400 font-black">{formatPrice(item.price)}</span>
                  </div>
                  <p className="text-white/60 mb-6 text-sm leading-relaxed line-clamp-3">
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

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
          >
            {(() => {
              const item = selectedItem;
              const title = lang === "SV" ? item.title_sv : item.title_en;
              const desc = lang === "SV" ? item.desc_sv : item.desc_en;
              const imgs = getImages(item);
              const tags = item.tags ? item.tags.split(',') : [];

              const formatPrice = (price: string) => {
                if (!price) return "";
                if (price.toLowerCase().includes("kr") || price.toLowerCase().includes("sek")) return price;
                return `${price} kr`;
              };

              return (
                <motion.div
                  initial={{ y: 50, scale: 0.95 }}
                  animate={{ y: 0, scale: 1 }}
                  exit={{ y: 20, scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#111] border border-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[90vh]"
                >
                  <button 
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>

                  {/* Image Gallery Side */}
                  {imgs.length > 0 && (
                    <div className="w-full md:w-1/2 relative bg-black aspect-square md:aspect-auto">
                      {imgs.map((src, idx) => (
                        <div 
                          key={idx}
                          className={`absolute inset-0 transition-opacity duration-500 ${idx === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
                        >
                          <Image src={src} alt={title || "Menu item"} fill className="object-cover" />
                        </div>
                      ))}
                      
                      {imgs.length > 1 && (
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-10">
                          <button 
                            onClick={(e) => handlePrevImage(e, imgs)}
                            className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button 
                            onClick={(e) => handleNextImage(e, imgs)}
                            className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                          >
                            <ChevronRight size={24} />
                          </button>
                        </div>
                      )}

                      {/* Dots */}
                      {imgs.length > 1 && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                          {imgs.map((_, idx) => (
                            <div 
                              key={idx} 
                              className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-yellow-400' : 'bg-white/50'}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content Side */}
                  <div className={`w-full ${imgs.length > 0 ? 'md:w-1/2' : ''} p-8 md:p-12 overflow-y-auto`}>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-3xl font-black text-white uppercase tracking-wide pr-8">
                        {title}
                      </h3>
                      <span className="text-yellow-400 font-black text-xl whitespace-nowrap">{formatPrice(item.price)}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {tags.map((tag: string) => (
                        <span key={tag} className="bg-white/10 text-white/80 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>

                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      {desc}
                    </p>

                    <button 
                      onClick={closeModal}
                      className="w-full py-4 bg-yellow-400 text-black font-black uppercase tracking-widest rounded-lg hover:scale-[1.02] transition-transform"
                    >
                      {lang === "SV" ? "Stäng" : "Close"}
                    </button>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
