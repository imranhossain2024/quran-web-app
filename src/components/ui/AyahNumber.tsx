"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AyahNumberProps {
  number: number;
  className?: string;
}

export default function AyahNumber({ number, className }: AyahNumberProps) {
  return (
    <div className={cn("relative flex items-center justify-center w-12 h-12 select-none", className)}>
      {/* Islamic Ornament SVG */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full text-slate-800 group-hover:text-emerald-500/20 transition-colors duration-500"
        fill="currentColor"
      >
        <path d="M50 0 L62.5 37.5 L100 50 L62.5 62.5 L50 100 L37.5 62.5 L0 50 L37.5 37.5 Z" />
      </svg>
      
      {/* Decorative Border */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full text-slate-700 group-hover:text-emerald-500/40 transition-colors duration-500 scale-90"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />
      </svg>

      {/* The Number */}
      <span className="relative z-10 text-xs font-bold text-slate-400 group-hover:text-emerald-500 transition-colors duration-300">
        {number}
      </span>
    </div>
  );
}
