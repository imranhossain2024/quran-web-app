"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Ayah, Surah } from "@/types/quran";
import { getSurah } from "@/lib/quran"; // We can use this to fetch surah data if needed

interface AudioPlayerContextType {
  currentAyah: Ayah | null;
  currentSurah: Surah | null;
  isPlaying: boolean;
  isLoading: boolean;
  progress: number;
  duration: number;
  volume: number;
  repeatMode: boolean;
  playAyah: (ayah: Ayah) => void;
  pause: () => void;
  resume: () => void;
  nextAyah: () => void;
  prevAyah: () => void;
  seekTo: (percent: number) => void;
  setVolume: (val: number) => void;
  toggleRepeat: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentAyah, setCurrentAyah] = useState<Ayah | null>(null);
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [repeatMode, setRepeatMode] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      
      // Auto-play next logic is handled in a separate effect or directly here
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Handle auto-play next or repeat
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatMode) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        // Play next ayah if exists
        nextAyah();
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentAyah, currentSurah, repeatMode]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playAyah = (ayah: Ayah) => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    if (currentAyah?.id === ayah.id) {
      if (isPlaying) {
        audio.pause();
      } else {
        setIsLoading(true);
        audio.play().catch(console.error);
      }
      return;
    }

    if (currentSurah?.number !== ayah.surahId) {
      const data = getSurah(ayah.surahId);
      if (data) setCurrentSurah(data.surah);
    }

    setCurrentAyah(ayah);
    setIsLoading(true);
    audio.src = ayah.audio;
    audio.load();
    audio.play().catch(console.error);
  };

  const pause = () => {
    audioRef.current?.pause();
  };

  const resume = () => {
    audioRef.current?.play().catch(console.error);
  };

  const nextAyah = () => {
    if (!currentSurah || !currentAyah) return;
    
    const data = getSurah(currentSurah.number);
    if (!data) return;
    
    const currentIndex = data.ayahs.findIndex(a => a.id === currentAyah.id);
    if (currentIndex >= 0 && currentIndex < data.ayahs.length - 1) {
      const next = data.ayahs[currentIndex + 1];
      playAyah(next);
    } else if (currentSurah.number < 114) {
      // Next surah
      const nextSurahData = getSurah(currentSurah.number + 1);
      if (nextSurahData && nextSurahData.ayahs.length > 0) {
        playAyah(nextSurahData.ayahs[0]);
      }
    }
  };

  const prevAyah = () => {
    if (!currentSurah || !currentAyah) return;
    
    const data = getSurah(currentSurah.number);
    if (!data) return;
    
    const currentIndex = data.ayahs.findIndex(a => a.id === currentAyah.id);
    if (currentIndex > 0) {
      const prev = data.ayahs[currentIndex - 1];
      playAyah(prev);
    } else if (currentSurah.number > 1) {
      // Previous surah
      const prevSurahData = getSurah(currentSurah.number - 1);
      if (prevSurahData && prevSurahData.ayahs.length > 0) {
        playAyah(prevSurahData.ayahs[prevSurahData.ayahs.length - 1]);
      }
    }
  };

  const seekTo = (percent: number) => {
    if (!audioRef.current || !duration) return;
    audioRef.current.currentTime = (percent / 100) * duration;
  };

  const setVolume = (val: number) => {
    setVolumeState(Math.max(0, Math.min(1, val)));
  };

  const toggleRepeat = () => {
    setRepeatMode(prev => !prev);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentAyah,
        currentSurah,
        isPlaying,
        isLoading,
        progress,
        duration,
        volume,
        repeatMode,
        playAyah,
        pause,
        resume,
        nextAyah,
        prevAyah,
        seekTo,
        setVolume,
        toggleRepeat,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
}
