"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Camera, Mail } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Camera, href: "https://www.instagram.com/tajifoodtruck/" },
    { icon: Mail, href: "mailto:hello@tajifoodtruck.se" },
  ];

  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <span className="text-4xl font-black text-white tracking-tighter uppercase mb-4 block">
            Taji<span className="text-yellow-400">.</span>
          </span>
          <div className="text-white/40 text-sm font-medium">
            © {new Date().getFullYear()} {t("footerText")}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-end justify-center space-y-4"
        >
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Follow Us</h4>
          <div className="flex space-x-6">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -5, color: "#facc15" }}
                  className="text-white/60 transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
