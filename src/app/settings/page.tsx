"use client";

import React from "react";
import { useSettings } from "@/context/SettingsContext";
import { Type, Languages, Palette, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SettingsPage = () => {
  const { settings, updateSettings } = useSettings();

  const fonts = [
    { name: "Amiri (Quranic)", value: "var(--font-amiri)", description: "Classic Indo-Pak style" },
    { name: "Lateef (Elegant)", value: "var(--font-lateef)", description: "Beautiful and slim style" },
  ];

  const resetSettings = () => {
    updateSettings({
      arabicFont: "var(--font-amiri)",
      arabicFontSize: 40,
      translationFontSize: 18,
    });
  };

  return (
    <div className="p-6 lg:p-12 max-w-4xl mx-auto mb-20">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">Display Settings</h1>
        <p className="text-slate-500">Customize your reading experience with fonts and sizes.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls Section */}
        <div className="space-y-10">
          {/* Arabic Font Selection */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Type className="w-4 h-4 text-emerald-500" />
              Arabic Font Style
            </label>
            <div className="space-y-2">
              {fonts.map((f) => (
                <button
                  key={f.name}
                  onClick={() => updateSettings({ arabicFont: f.value })}
                  className={cn(
                    "w-full p-4 rounded-2xl border text-left transition-all group relative overflow-hidden",
                    settings.arabicFont === f.value 
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                      : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700"
                  )}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <p className="font-bold">{f.name}</p>
                      <p className="text-[10px] opacity-60 uppercase tracking-wider">{f.description}</p>
                    </div>
                    {settings.arabicFont === f.value && <Check className="w-5 h-5" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Arabic Font Size */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Palette className="w-4 h-4 text-emerald-500" />
                Arabic Font Size
              </label>
              <span className="text-sm font-mono text-emerald-500 font-bold">{settings.arabicFontSize}px</span>
            </div>
            <input 
              type="range"
              min="24"
              max="64"
              step="2"
              value={settings.arabicFontSize}
              onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-bold">
              <span>24PX</span>
              <span>44PX</span>
              <span>64PX</span>
            </div>
          </div>

          {/* Translation Font Size */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Languages className="w-4 h-4 text-emerald-500" />
                Translation Size
              </label>
              <span className="text-sm font-mono text-emerald-500 font-bold">{settings.translationFontSize}px</span>
            </div>
            <input 
              type="range"
              min="14"
              max="28"
              step="1"
              value={settings.translationFontSize}
              onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-bold">
              <span>14PX</span>
              <span>21PX</span>
              <span>28PX</span>
            </div>
          </div>

          <button 
            onClick={resetSettings}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors pt-4"
          >
            <RotateCcw className="w-4 h-4" />
            RESET TO DEFAULT
          </button>
        </div>

        {/* Live Preview Section */}
        <div className="space-y-4">
           <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
              Live Preview
           </label>
           <div className="p-8 rounded-[2rem] bg-slate-900/80 border border-slate-800 border-dashed flex flex-col gap-8 min-h-[300px] justify-center shadow-2xl">
              <p className="font-arabic text-right leading-[2.2] text-slate-100 transition-all duration-300">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <div className="w-12 h-0.5 bg-emerald-500/20 mx-auto" />
              <p className="font-translation text-slate-400 text-center leading-relaxed transition-all duration-300">
                In the name of Allah, the Entirely Merciful, the Especially Merciful.
              </p>
           </div>
           <p className="text-[10px] text-slate-600 text-center italic">
              "Changes are applied instantly across the entire application."
           </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
