"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Camera, Globe, MessageCircle, Mail, Loader2, CheckCircle } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions";

export function Footer() {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const socialLinks = [
    { icon: Camera, href: "#" },
    { icon: Globe, href: "#" },
    { icon: MessageCircle, href: "#" },
    { icon: Mail, href: "#" },
  ];

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    const formData = new FormData(e.currentTarget);
    const res = await subscribeNewsletter(formData);
    if (res.success) {
      setStatus("success");
      setMsg(lang === "SV" ? "Tack för att du prenumererar!" : "Thanks for subscribing!");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setMsg(res.error || "Error");
    }
    setLoading(false);
  };

  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 items-center">
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
          className="flex flex-col items-center justify-center space-y-4"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-right"
        >
          <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-4">
            {lang === "SV" ? "Var är vi härnäst?" : "Where are we next?"}
          </h4>
          <form onSubmit={handleSubscribe} className="flex max-w-sm mx-auto md:ml-auto md:mr-0">
            <input 
              type="email" 
              name="email" 
              required 
              placeholder={lang === "SV" ? "Din e-postadress" : "Your email address"}
              className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-l-lg outline-none focus:border-yellow-400 w-full"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-yellow-400 text-black px-4 py-2 rounded-r-lg font-bold uppercase disabled:opacity-50 flex items-center justify-center min-w-[100px]"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : (lang === "SV" ? "Prenumerera" : "Subscribe")}
            </button>
          </form>
          {status === "success" && <div className="text-green-400 text-sm mt-2 font-bold flex items-center justify-center md:justify-end gap-1"><CheckCircle size={14}/> {msg}</div>}
          {status === "error" && <div className="text-red-400 text-sm mt-2">{msg}</div>}
        </motion.div>
      </div>
    </footer>
  );
}
