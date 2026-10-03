"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { MapPin, Clock } from "lucide-react";

const scheduleData = [
  { day: "Monday", location: "Downtown Square", time: "11:00 - 15:00" },
  { day: "Tuesday", location: "Tech Park", time: "11:30 - 14:30" },
  { day: "Wednesday", location: "University Campus", time: "12:00 - 16:00" },
  { day: "Thursday", location: "Central Station", time: "11:00 - 19:00" },
  { day: "Friday", location: "Festival Grounds", time: "12:00 - 22:00" },
  { day: "Saturday", location: "Weekend Market", time: "10:00 - 18:00" },
];

export function LocationSchedule() {
  const { t } = useLanguage();

  return (
    <section id="location" className="py-24 bg-yellow-400 relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4"
          >
            {t("locationTitle")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-black/70 text-lg font-bold uppercase tracking-widest"
          >
            {t("locationSubtitle")}
          </motion.p>
        </div>

        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-black/20 before:to-transparent">
          {scheduleData.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-yellow-400 bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                <MapPin size={16} className="text-yellow-400" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-black rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="font-black text-white text-xl uppercase tracking-wide">
                    {item.day}
                  </h3>
                  <div className="flex items-center text-yellow-400 text-sm font-bold mt-2 md:mt-0">
                    <Clock size={14} className="mr-1" />
                    {item.time}
                  </div>
                </div>
                <p className="text-zinc-400 font-medium">
                  {item.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
