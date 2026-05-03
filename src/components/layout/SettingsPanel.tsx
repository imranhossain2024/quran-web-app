"use client";

import React, { useState } from "react";
import { Settings as SettingsIcon, X, Type, Languages, Palette } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { cn } from "@/lib/utils";

const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useSettings();

  const fonts = [
    { name: "Amiri", value: "var(--font-amiri)" },
    { name: "Lateef", value: "var(--font-lateef)" },
  ];

  return (
    <>
      {/* Settings Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 md:bottom-8 right-8 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40 hover:scale-110 transition-all z-40 group"
      >
        <SettingsIcon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel */}
      <aside className={cn(
        "fixed right-0 top-0 h-screen w-80 bg-slate-950 border-l border-slate-800/50 z-[60] p-8 transition-transform duration-500 ease-out shadow-2xl",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-emerald-500" />
            Settings
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-10">
          {/* Arabic Font Selection */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Type className="w-4 h-4" />
              Arabic Font
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fonts.map((f) => (
                <button
                  key={f.name}
                  onClick={() => updateSettings({ arabicFont: f.value })}
                  className={cn(
                    "py-3 rounded-xl text-sm font-semibold transition-all border",
                    settings.arabicFont === f.value 
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-inner" 
                      : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600"
                  )}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Arabic Font Size */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Arabic Size
              </label>
              <span className="text-xs font-mono text-emerald-500">{settings.arabicFontSize}px</span>
            </div>
            <input 
              type="range"
              min="20"
              max="60"
              value={settings.arabicFontSize}
              onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Translation Font Size */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Languages className="w-4 h-4" />
                Translation Size
              </label>
              <span className="text-xs font-mono text-emerald-500">{settings.translationFontSize}px</span>
            </div>
            <input 
              type="range"
              min="14"
              max="24"
              value={settings.translationFontSize}
              onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>
        
        <div className="mt-20 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
           <p className="text-[10px] text-slate-500 leading-relaxed text-center italic">
             Settings are automatically saved to your local storage for future sessions.
           </p>
        </div>
      </aside>
    </>
  );
};

export default SettingsPanel;
