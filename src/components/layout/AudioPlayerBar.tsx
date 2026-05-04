"use client";

import React from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Volume2, VolumeX, Loader2 } from "lucide-react";
import { useAudioPlayer } from "@/context/AudioPlayerContext";

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
    repeatMode,
    pause,
    resume,
    nextAyah,
    prevAyah,
    seekTo,
    setVolume,
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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-2xl border-t border-white/5 px-6 py-4 z-[60] flex items-center justify-between transform transition-transform translate-y-0">
       <div className="flex items-center gap-4 w-1/4">
          <div>
            <div className="text-sm font-bold truncate max-w-[200px]">
              {currentSurah.englishName} : {currentAyah.numberInSurah}
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Alafasy</div>
          </div>
       </div>
       
       <div className="flex flex-col items-center gap-3 flex-1 max-w-2xl">
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

       <div className="flex items-center justify-end w-1/4 pr-4">
          <div className="flex items-center gap-3">
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
          </div>
       </div>
    </div>
  );
}
