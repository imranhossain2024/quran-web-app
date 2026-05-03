import React from "react";
import { Book, Volume2, Search, Settings, ShieldCheck, Heart, Code, Globe } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Book,
    title: "Seamless Reading",
    description: "Enjoy a clean, distraction-free interface for reading the Holy Quran with high-quality Arabic fonts."
  },
  {
    icon: Volume2,
    title: "Audio Playback",
    description: "Listen to beautiful recitations of each Ayah by world-renowned Qaris to improve your Tajweed."
  },
  {
    icon: Search,
    title: "Global Search",
    description: "Find any Ayah instantly using our powerful search engine that supports both Arabic and English."
  },
  {
    icon: Settings,
    title: "Personalization",
    description: "Customize your reading experience with adjustable font sizes and beautiful Arabic font styles."
  }
];

export default function AboutPage() {
  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16 text-center">
        <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-600/20 mx-auto mb-6">
           <Book className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">Quran Mazid</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          A production-grade, highly responsive Quran application designed to provide the best reading and studying experience for Muslims worldwide.
        </p>
      </header>

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 rounded-[2.5rem] bg-slate-900/50 border border-slate-800/50 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
             <ShieldCheck className="w-6 h-6 text-emerald-500" /> Our Mission
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            Our mission is to leverage modern web technologies to make the Holy Quran accessible to everyone, everywhere, in a format that is beautiful, fast, and easy to use.
          </p>
          <p className="text-slate-400 leading-relaxed">
            We believe that spiritual growth should be accompanied by a premium digital experience, which is why we've built this app with a focus on clean architecture and performance.
          </p>
        </div>
        <div className="relative rounded-[2.5rem] overflow-hidden group">
           <img 
             src="/images/about-hero.png" 
             alt="Holy Quran" 
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        </div>
      </section>

      {/* Features Grid */}
      <h2 className="text-2xl font-bold text-white mb-10 text-center uppercase tracking-widest text-xs flex items-center justify-center gap-4">
        <div className="h-px w-10 bg-slate-800" /> Core Features <div className="h-px w-10 bg-slate-800" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {features.map((feature, idx) => (
          <div key={idx} className="p-8 rounded-[2rem] bg-slate-900/30 border border-slate-800/50 hover:bg-slate-900/50 hover:border-emerald-500/20 transition-all group">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all">
               <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Developer Section */}
      <footer className="p-10 rounded-[3rem] bg-emerald-600 text-white text-center shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
           <Heart className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Built with Love & Passion</h2>
          <p className="mb-10 opacity-90 max-w-xl mx-auto">
            This project is built using Next.js, TypeScript, and Tailwind CSS. It is fully open-source and dedicated to the global Muslim community.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="https://github.com/imranhossain2024/quran-web-app" target="_blank" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl backdrop-blur-md transition-all flex items-center gap-2">
              <Code className="w-5 h-5" /> GitHub
            </Link>
            <Link href="https://trximran.vercel.app/" target="_blank" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl backdrop-blur-md transition-all flex items-center gap-2">
              <Globe className="w-5 h-5" /> Portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
