"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { Ayah } from "@/types/quran";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  ayah: Ayah;
  surahName: string;
  surahNumber: number;
}

export default function FavoriteButton({ ayah, surahName, surahNumber }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(ayah.id);

  return (
    <button
      onClick={() => toggleFavorite(ayah, surahName, surahNumber)}
      className={cn(
        "p-2 rounded-xl transition-all duration-300 active:scale-90",
        favorited 
          ? "bg-rose-500/10 text-rose-500" 
          : "bg-slate-800 text-slate-500 hover:text-rose-500 hover:bg-rose-500/5"
      )}
      title={favorited ? "Remove from Favorites" : "Add to Favorites"}
    >
      <Heart className={cn("w-5 h-5", favorited && "fill-current")} />
    </button>
  );
}
