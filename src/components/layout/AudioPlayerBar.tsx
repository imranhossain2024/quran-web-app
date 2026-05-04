"use client";

import React from "react";
import { Repeat, Volume2, VolumeX, Loader2, Play, Pause, SkipBack, SkipForward, X } from "lucide-react";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import FavoriteButton from "@/components/modules/quran/FavoriteButton";

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayerBar() {
  const {
    currentAyah,
    currentSurah,
    isPlaying,
    isLoading,
    progress,
    duration,
    volume,
    playbackRate,
    repeatMode,
    pause,
    resume,
    stop,
    nextAyah,
    prevAyah,
    seekTo,
    setVolume,
    setPlaybackRate,
    toggleRepeat,
  } = useAudioPlayer();

  if (!currentAyah || !currentSurah) return null;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    seekTo(percent);
  };

  const handleVolumeSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const val = Math.max(0, Math.min(1, x / rect.width));
    setVolume(val);
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
  const volumePercent = volume * 100;

  const handleSpeedChange = () => {
    const rates = [1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
  };

  return (
    <div className="fixed bottom-[4.5rem] md:bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-2xl border-t border-white/5 px-4 md:px-6 py-3 md:py-4 z-[60] flex flex-wrap md:flex-nowrap items-center justify-between gap-3 md:gap-0 transform transition-transform translate-y-0">
       <div className="flex items-center gap-4 w-full md:w-1/4 order-1 md:order-none justify-between md:justify-start">
          <div>
            <div className="text-sm font-bold truncate max-w-[200px]">
              {currentSurah.englishName} : {currentAyah.numberInSurah}
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 flex items-center gap-2">
              <span>Alafasy</span>
              <div className="scale-[0.6] origin-left -ml-1">
                 <FavoriteButton 
                    ayah={currentAyah} 
                    surahName={currentSurah.englishName} 
                    surahNumber={currentSurah.number} 
                 />
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-2">
             <button onClick={handleSpeedChange} className="text-xs font-mono font-bold text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5">
                {playbackRate}x
             </button>
             <button onClick={() => setVolume(volume > 0 ? 0 : 1)} className="text-slate-500 hover:text-white p-2">
               {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
             </button>
             <button onClick={stop} className="text-slate-500 hover:text-rose-500 p-2 ml-1" title="Close Player">
               <X className="w-5 h-5" />
             </button>
          </div>
       </div>
       
       <div className="flex flex-col items-center gap-2 md:gap-3 flex-1 w-full md:w-auto order-3 md:order-none max-w-2xl">
          <div className="flex items-center gap-8">
             <button 
                onClick={toggleRepeat}
                className={`transition-colors ${repeatMode ? "text-emerald-500" : "text-slate-500 hover:text-white"}`}
             >
                <Repeat className="w-4 h-4" />
             </button>
             
             <button 
                onClick={prevAyah}
                className="text-slate-200 hover:text-emerald-500 transition-colors"
             >
                <SkipBack className="w-6 h-6 fill-current" />
             </button>
             
             <button 
                onClick={isPlaying ? pause : resume}
                className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg shadow-emerald-600/20"
             >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                )}
             </button>
             
             <button 
                onClick={nextAyah}
                className="text-slate-200 hover:text-emerald-500 transition-colors"
             >
                <SkipForward className="w-6 h-6 fill-current" />
             </button>
          </div>
          
          <div className="w-full flex items-center gap-4">
             <span className="text-[10px] font-mono text-slate-500 w-10 text-right">{formatTime(progress)}</span>
             
             <div 
               className="flex-1 h-1.5 bg-white/5 rounded-full relative group cursor-pointer"
               onClick={handleSeek}
             >
                <div 
                  className="absolute top-0 left-0 h-full bg-emerald-600 rounded-full transition-all duration-150 pointer-events-none"
                  style={{ width: `${progressPercent}%` }}
                >
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg translate-x-1/2" />
                </div>
             </div>
             
             <span className="text-[10px] font-mono text-slate-500 w-10">{formatTime(duration)}</span>
          </div>
       </div>

       <div className="hidden md:flex items-center justify-end w-1/4 pr-4 order-2 md:order-none">
          <div className="flex items-center gap-3">
             <button onClick={handleSpeedChange} className="text-xs font-mono font-bold text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 mr-2">
                {playbackRate}x
             </button>
             <button onClick={() => setVolume(volume > 0 ? 0 : 1)} className="text-slate-500 hover:text-white transition-colors">
               {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
             </button>
             <div 
               className="w-24 h-1.5 bg-white/5 rounded-full relative cursor-pointer group"
               onClick={handleVolumeSeek}
             >
                <div 
                  className="absolute top-0 left-0 h-full bg-emerald-600 rounded-full transition-all duration-150 pointer-events-none" 
                  style={{ width: `${volumePercent}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg translate-x-1/2" />
                </div>
             </div>
             <div className="w-px h-6 bg-white/10 mx-1"></div>
             <button onClick={stop} className="text-slate-500 hover:text-rose-500 transition-colors" title="Close Player">
               <X className="w-5 h-5" />
             </button>
          </div>
       </div>
    </div>
  );
}
