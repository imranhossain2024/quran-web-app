import React from "react";

export default function Home() {
  return (
    <div className="p-8 lg:p-12 max-w-5xl">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
          Assalamu <span className="text-emerald-500">Alaikum</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          Welcome to your production-ready Quran experience. Explore the Divine guidance with beautiful Arabic fonts, translations, and high-quality audio playback.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
             <span className="text-emerald-500 text-3xl">📖</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Read Quran</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Select a Surah from the list to start your reading journey with multiple translations and clean interface.
          </p>
          <div className="flex items-center text-emerald-500 text-xs font-bold uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Explore Now</span>
            <span>→</span>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
             <span className="text-emerald-500 text-3xl">🎧</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Listen Ayah</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Experience high-quality audio recitation for every Ayah. Switch between different reciters seamlessly.
          </p>
          <div className="flex items-center text-emerald-500 text-xs font-bold uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Listen Now</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
