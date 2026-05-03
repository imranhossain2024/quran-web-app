"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Loader2 } from "lucide-react";

interface PlayAudioButtonProps {
  url: string;
}

export default function PlayAudioButton({ url }: PlayAudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      
      audioRef.current.onplaying = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };
      
      audioRef.current.onpause = () => {
        setIsPlaying(false);
      };
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };

      audioRef.current.onwaiting = () => {
        setIsLoading(true);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setIsLoading(true);
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setIsLoading(false);
      });
    }
  };

  return (
    <button 
      onClick={togglePlay}
      className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-500 transition-all active:scale-95"
      title={isPlaying ? "Pause" : "Play Audio"}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
      ) : isPlaying ? (
        <Pause className="w-5 h-5 fill-current" />
      ) : (
        <Play className="w-5 h-5 fill-current" />
      )}
    </button>
  );
}
