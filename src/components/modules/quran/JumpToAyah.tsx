"use client";

import React, { useState } from "react";
import { ArrowRight, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface JumpToAyahProps {
  totalAyahs: number;
}

export default function JumpToAyah({ totalAyahs }: JumpToAyahProps) {
  const [ayahNumber, setAyahNumber] = useState("");

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(ayahNumber);
    
    if (isNaN(num) || num < 1 || num > totalAyahs) {
      alert(`Please enter a valid Ayah number between 1 and ${totalAyahs}`);
      return;
    }

    const element = document.getElementById(`ayah-${num}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Temporary highlight effect
      element.classList.add("ring-2", "ring-emerald-500", "ring-offset-4", "ring-offset-slate-950");
      setTimeout(() => {
        element.classList.remove("ring-2", "ring-emerald-500", "ring-offset-4", "ring-offset-slate-950");
      }, 2000);
    }
  };

  return (
    <form 
      onSubmit={handleJump}
      className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 p-1.5 rounded-2xl shadow-xl backdrop-blur-md"
    >
      <div className="flex items-center gap-2 px-3 text-slate-500">
        <Hash className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Jump to Ayah</span>
      </div>
      <input
        type="number"
        min="1"
        max={totalAyahs}
        placeholder={`1-${totalAyahs}`}
        value={ayahNumber}
        onChange={(e) => setAyahNumber(e.target.value)}
        className="w-20 bg-slate-800 border-none rounded-xl py-2 px-3 text-sm text-white focus:ring-1 focus:ring-emerald-500/50 outline-none placeholder:text-slate-600 transition-all"
      />
      <button 
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-90"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
