"use client";

import React from "react";
import { Play, Pause, Loader2 } from "lucide-react";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { Ayah } from "@/types/quran";

interface PlayAudioButtonProps {
  ayah: Ayah;
}

export default function PlayAudioButton({ ayah }: PlayAudioButtonProps) {
  const { currentAyah, isPlaying, isLoading, playAyah } = useAudioPlayer();

  const isThisAyahPlaying = currentAyah?.id === ayah.id;
  const showLoading = isThisAyahPlaying && isLoading;
  const showPause = isThisAyahPlaying && isPlaying && !isLoading;

  const togglePlay = () => {
    playAyah(ayah);
  };

  return (
    <button 
      onClick={togglePlay}
      className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-500 transition-all active:scale-95"
      title={showPause ? "Pause" : "Play Audio"}
    >
      {showLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
      ) : showPause ? (
        <Pause className="w-5 h-5 fill-current" />
      ) : (
        <Play className="w-5 h-5 fill-current translate-x-0.5" />
      )}
    </button>
  );
}
