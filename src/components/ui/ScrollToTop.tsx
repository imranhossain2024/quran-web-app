"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-40 md:bottom-28 right-8 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={cn(
          "p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl shadow-emerald-600/40 hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 stroke-[3]" />
      </button>
    </div>
  );
}
