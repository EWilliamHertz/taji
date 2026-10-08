"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Star } from "lucide-react";
import Link from "next/link";

export function ReviewCard({ review, index, lang, isGrid = false }: { review: any; index: number; lang: string; isGrid?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const content = lang === "SV" ? review.content_sv : review.content_en;
  
  // Truncate logic
  const isLong = content.length > 150;
  const displayContent = expanded ? content : (isLong ? content.substring(0, 150) + "..." : content);

  const widthClass = isGrid ? "w-full" : "w-[300px] md:w-[380px]";

  return (
    <motion.div
      key={review.id}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`${widthClass} snap-center bg-black border border-white/10 p-6 rounded-2xl flex-shrink-0 flex flex-col`}
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, j) => (
          <Star key={j} className="text-yellow-400 fill-yellow-400" size={16} />
        ))}
      </div>
      <p className="text-white/80 italic mb-4 text-base whitespace-pre-wrap flex-grow">
        "{displayContent}"
      </p>
      {isLong && (
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-yellow-400 text-sm font-bold uppercase tracking-wider text-left mb-6 hover:text-yellow-300 transition-colors"
        >
          {expanded 
            ? (lang === "SV" ? "Visa mindre" : "Show less") 
            : (lang === "SV" ? "... vill du läsa mer?" : "Read it all")}
        </button>
      )}
      <div className="font-bold text-yellow-400 uppercase tracking-wider text-sm mt-auto">
        — {review.author}
      </div>
    </motion.div>
  );
}

export function ReviewsCarousel({ reviews }: { reviews: any[] }) {
  const { lang } = useLanguage();

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-24 bg-[#111] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4"
          >
            {lang === "SV" ? "Vad Våra Gäster Säger" : "What Our Guests Say"}
          </motion.h2>
          <div className="flex justify-center gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />)}
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} lang={lang} />
          ))}
        </div>
        
        <div className="text-center mt-2 mb-8 text-white/50 text-sm animate-pulse flex items-center justify-center gap-2">
          <span>←</span>
          {lang === "SV" ? "Skrolla för att läsa mer" : "Scroll to discover more"}
          <span>→</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="mb-12">
            <Link 
              href="/reviews"
              className="inline-block bg-zinc-800 text-white px-8 py-3 rounded-full font-black uppercase tracking-wider hover:bg-zinc-700 transition-colors"
            >
              {lang === "SV" ? "Läs alla recensioner" : "Read all reviews"}
            </Link>
          </div>

          <p className="text-white/60 mb-6 font-bold uppercase tracking-widest text-sm">
            {lang === "SV" ? "Läs fler recensioner & Beställ via" : "Read more reviews & Order on"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://www.ubereats.com/se-en/store/tajis-foodtruck/Wikbd-sLX_2p-Q5ERuiPcg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C167] text-white px-8 py-3 rounded-full font-black uppercase tracking-wider hover:scale-105 transition-transform"
            >
              UberEats
            </a>
            <a 
              href="https://wolt.com/sv/swe/stockholm/restaurant/tajis-foodtruck-2"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#009de0] text-white px-8 py-3 rounded-full font-black uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Wolt
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
