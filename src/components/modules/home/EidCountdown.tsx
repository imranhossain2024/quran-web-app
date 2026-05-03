"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

export default function EidCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target Date: June 16, 2026 (Approximate Eid-ul-Adha 2026)
    const targetDate = new Date("June 16, 2026 00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="bg-[#111111]/60 border border-white/5 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Calendar className="w-12 h-12 text-emerald-500" />
      </div>

      <h3 className="text-center text-xl font-bold uppercase tracking-[0.3em] mb-12 flex items-center justify-center gap-3">
        <span>🕋</span> EID-UL-ADHA COUNTDOWN
      </h3>

      <div className="grid grid-cols-4 gap-4 lg:gap-8">
        {units.map((unit, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="text-4xl lg:text-7xl font-black text-white mb-4 bg-slate-900/50 w-full py-6 lg:py-10 rounded-3xl border border-white/5 shadow-inner flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/20">
              {unit.value < 10 ? `0${unit.value}` : unit.value}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
