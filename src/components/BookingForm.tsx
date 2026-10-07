"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { sv, enUS } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { createBooking, getBookings } from "@/app/actions";
import { useLanguage } from "./LanguageContext";

const availableTimes = ["12:00", "13:00", "14:00", "15:00", "18:00", "19:00", "20:00"];

export function BookingForm() {
  const { lang, t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [existingBookings, setExistingBookings] = useState<{date: string, time: string}[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getBookings().then(data => setExistingBookings(data));
  }, []);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.set("date", format(selectedDate, "yyyy-MM-dd"));
    formData.set("time", selectedTime);

    try {
      await createBooking(formData);
      setSuccessMessage(t("bookingSuccess"));
      setExistingBookings([...existingBookings, {
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime
      }]);
      setSelectedDate(undefined);
      setSelectedTime("");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      alert("Error creating booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTimeBooked = (time: string) => {
    if (!selectedDate) return false;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    return existingBookings.some(b => b.date === dateStr && b.time === time);
  };

  return (
    <div className="bg-[#111] p-8 rounded-2xl shadow-2xl border border-white/5 w-full max-w-4xl mx-auto mt-12 text-left">
      <h3 className="text-3xl font-black uppercase text-white mb-6">
        {t("bookingFormTitle")}
      </h3>
      {successMessage && (
        <div className="bg-[#115740] text-white p-4 rounded-lg mb-6 font-bold">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleBooking} className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">{t("formSelectDate")}</label>
            <div className="bg-white text-black p-4 rounded-xl inline-block">
              <DayPicker 
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={[{ before: new Date() }]}
                locale={lang === "SV" ? sv : enUS}
              />
            </div>
          </div>
          
          {selectedDate && (
            <div className="mb-6">
              <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">{t("formSelectTime")}</label>
              <div className="flex flex-wrap gap-2">
                {availableTimes.map(time => {
                  const booked = isTimeBooked(time);
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={booked}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                        booked ? "bg-red-950 text-red-500/50 cursor-not-allowed line-through" : 
                        selectedTime === time ? "bg-yellow-400 text-black" : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">{t("formName")}</label>
            <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors" placeholder={t("formNamePlaceholder")} />
          </div>
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">{t("formEmail")}</label>
            <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors" placeholder={t("formEmailPlaceholder")} />
          </div>
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">{t("formGuests")}</label>
            <input required name="guests" type="number" min="1" max="100" defaultValue="1" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors" />
          </div>
          <button 
            type="submit" 
            disabled={!selectedDate || !selectedTime || isSubmitting}
            className="w-full bg-yellow-400 text-black font-black uppercase tracking-widest py-4 rounded-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? t("formProcessing") : t("formSubmit")}
          </button>
        </div>
      </form>
    </div>
  );
}
