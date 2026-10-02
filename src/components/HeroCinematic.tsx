import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

interface HeroCinematicProps {
  onOpenInquiry: () => void;
  onNavigatePortfolio: () => void;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({
  onOpenInquiry,
  onNavigatePortfolio,
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center overflow-hidden pt-24 pb-16">
      {/* Subtle vignette gradient so text stays 100% legible over the scroll canvas */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />

      {/* Hero Content (Left-aligned with generous space for background animation) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-wider mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-[0_0_8px_#ff9900]"></span>
            </span>
            <span className="font-semibold">mlluizdevtech • Brazilian Software House</span>
          </div>

          {/* Headline */}
          <h1 className="font-['Syne',sans-serif] text-[clamp(1.75rem,8vw,2.25rem)] sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold sm:font-black tracking-tight text-white leading-[1.08] mb-6">
            Software que transforma{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,140,40,0.4)]">
              ideias em negócios digitais.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-9 max-w-2xl">
            Criamos sistemas, aplicativos, automações e soluções com IA para transformar processos complexos em experiências simples, eficientes e escaláveis.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12">
            {/* Primary CTA */}
            <button
              onClick={onOpenInquiry}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold font-mono text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(255,140,40,0.45)] hover:shadow-[0_0_40px_rgba(255,140,40,0.65)] transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
              <span>CRIAR MEU PROJETO</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onNavigatePortfolio}
              className="group inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-500/40 text-zinc-200 hover:text-white font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>VER NOSSOS PROJETOS</span>
            </button>
          </div>

          {/* Visual Concept Tagline */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-zinc-400 pt-6 border-t border-white/10">
            <span className="text-zinc-400 uppercase tracking-widest font-semibold">FLUXO:</span>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-white font-medium">IDEA</span>
              <span className="text-amber-500">→</span>
              <span className="text-amber-300 font-medium">CODE</span>
              <span className="text-amber-500">→</span>
              <span className="text-orange-400 font-bold">AI</span>
              <span className="text-amber-500">→</span>
              <span className="text-amber-200 font-medium">SOFTWARE</span>
              <span className="text-amber-500">→</span>
              <span className="text-emerald-400 font-bold">RESULT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Far Right Vertical Editorial Typography */}
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-10 pointer-events-none select-none">
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_15px_#ff9900]" />
        <div className="writing-vertical-lr rotate-180 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          ENGINEERED IN BRAZIL
        </div>
        <div className="h-14 w-px bg-gradient-to-b from-amber-500/50 via-zinc-800 to-transparent" />
        <div className="writing-vertical-lr rotate-180 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400">
          MLLUIZDEVTECH • 2026
        </div>
      </div>
    </section>
  );
};
