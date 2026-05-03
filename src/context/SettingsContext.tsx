"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Settings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
  theme: "light" | "dark";
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  arabicFont: "'Amiri', serif",
  arabicFontSize: 40,
  translationFontSize: 18,
  theme: "dark",
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("quran-settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("quran-settings", JSON.stringify(updated));
      return updated;
    });
  };

  if (!isLoaded) return null; // Avoid hydration mismatch

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <div 
        style={{ 
          "--arabic-font": settings.arabicFont,
          "--arabic-font-size": `${settings.arabicFontSize}px`,
          "--translation-font-size": `${settings.translationFontSize}px`
        } as React.CSSProperties}
      >
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within SettingsProvider");
  return context;
};
