"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Ayah } from "@/types/quran";

interface FavoriteAyah extends Ayah {
  surahName: string;
  surahNumber: number;
}

interface FavoritesContextType {
  favorites: FavoriteAyah[];
  toggleFavorite: (ayah: Ayah, surahName: string, surahNumber: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteAyah[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quran_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("quran_favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (ayah: Ayah, surahName: string, surahNumber: number) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === ayah.id);
      if (exists) {
        return prev.filter(f => f.id !== ayah.id);
      } else {
        return [...prev, { ...ayah, surahName, surahNumber }];
      }
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some(f => f.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
