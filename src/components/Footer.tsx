"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Camera, Globe, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Camera, href: "#" },
    { icon: Globe, href: "#" },
    { icon: MessageCircle, href: "#" },
    { icon: Mail, href: "#" },
  ];

  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-0"
        >
          <span className="text-3xl font-black text-white tracking-tighter uppercase">
            Taji<span className="text-yellow-400">.</span>
          </span>
        </motion.div>

        <div className="flex space-x-6 mb-8 md:mb-0">
          {socialLinks.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={i}
                href={social.href}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, color: "#facc15" }}
                className="text-white/60 transition-colors"
              >
                <Icon size={24} />
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/40 text-sm font-medium"
        >
          © {new Date().getFullYear()} {t("footerText")}
        </motion.div>
      </div>
    </footer>
  );
}
