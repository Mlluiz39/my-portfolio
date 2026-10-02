import React, { useRef } from 'react';
import { Play, Layers, Users, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { Workstation3DCanvas, BannerSettings } from './Workstation3DCanvas';

interface HeroBannerProps {
  settings: BannerSettings;
  showUiOverlay: boolean;
  aspectRatioMode: '16:9' | 'full' | '21:9';
  onOpenShowreel: () => void;
  onOpenInquiry: () => void;
  onNavigateSection: (section: string) => void;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
}

export const CinematicHeroBanner: React.FC<HeroBannerProps> = ({
  settings,
  showUiOverlay,
  aspectRatioMode,
  onOpenShowreel,
  onOpenInquiry,
  onNavigateSection,
  onCanvasReady,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Determine container aspect ratio class
  const getAspectClass = () => {
    if (aspectRatioMode === '16:9') {
      return 'w-full aspect-[16/9] min-h-[640px] max-h-[960px]';
    } else if (aspectRatioMode === '21:9') {
      return 'w-full aspect-[21/9] min-h-[580px] max-h-[820px]';
    }
    return 'w-full min-h-screen';
  };

  return (
    <section 
      ref={containerRef}
      className={`relative ${getAspectClass()} overflow-hidden bg-[#03050a] flex items-center select-none transition-all duration-300`}
    >
      {/* 1. Underlying 3D Workstation & Atmospheric Canvas */}
      <Workstation3DCanvas
        settings={settings}
        interactiveParallax={true}
        onCanvasReady={onCanvasReady}
      />

      {/* 2. Optional UI OVERLAY (Can be hidden for pristine banner asset view/export) */}
      {showUiOverlay && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 pt-28 pb-12 pointer-events-none">
          {/* Main Hero Body: Left-aligned Negative Space Composition */}
          <div className="max-w-2xl lg:max-w-3xl pointer-events-auto mt-auto mb-auto">
            {/* Kicker tag with glowing amber indicator */}
            <div className="inline-flex items-center gap-2.5 mb-5 group">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-[0_0_10px_#ff9900]"></span>
              </span>
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-zinc-300 uppercase">
                HEY I AM <span className="text-amber-400 font-bold">RATAN</span> • DIGITAL ARCHITECT
              </span>
            </div>

            {/* Monumental Headline matching the reference typography */}
            <h1 className="font-['Syne',sans-serif] text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-extrabold tracking-tight text-white leading-[1.02] mb-6">
              I DESIGN
              <br />
              EXPERIENCES
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,140,40,0.35)]">
                THAT INSPIRE
              </span>
            </h1>

            {/* Sub-narrative in refined lower-case / editorial styling */}
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300/90 text-sm sm:text-base md:text-lg font-normal max-w-lg mb-8 leading-relaxed">
              i'm a graphic designer crafting visual identities, digital experiences
              and creating solutions that make impact.
            </p>

            {/* Dual CTAs (Matching reference buttons precisely) */}
            <div className="flex flex-wrap items-center gap-5 mb-10">
              {/* Primary "VIEW WORK" capsule with indicator dot */}
              <button
                onClick={() => onNavigateSection('work')}
                className="group relative inline-flex items-center justify-between gap-4 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ff4800] hover:from-[#ff7711] hover:to-[#ff5500] text-black font-extrabold font-mono text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(255,100,0,0.45)] hover:shadow-[0_0_40px_rgba(255,120,0,0.65)] transition-all duration-300 transform hover:scale-[1.03]"
              >
                <span>VIEW WORK</span>
                <span className="w-4 h-4 rounded-full bg-black/85 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-2.5 h-2.5 text-amber-400" />
                </span>
              </button>

              {/* Secondary "WATCH SHOWREEL" with play ring icon */}
              <button
                onClick={onOpenShowreel}
                className="group inline-flex items-center gap-3 px-5 py-3.5 rounded-full text-zinc-200 hover:text-white font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-full border border-amber-500/50 group-hover:border-amber-400 bg-amber-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,160,50,0.2)] transition-all group-hover:scale-110">
                  <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400 ml-0.5" />
                </div>
                <span className="group-hover:text-amber-300 transition-colors">WATCH SHOWREEL</span>
              </button>
            </div>

            {/* Metrics & Performance Badges (from Reference: 150+ PROJECT, 80+ CLIENT) */}
            <div className="flex items-center gap-8 pt-4 border-t border-white/10 max-w-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">150+</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">PROJECT</div>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">80+</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">CLIENT</div>
                </div>
              </div>
            </div>

            {/* Brand Trust Bar (From reference: LinkedIn, Instagram, Ps, Adobe, Netflix emblems) */}
            <div className="mt-7">
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-3">
                TRUSTED BY BRANDS WORLDWIDE
              </div>
              <div className="flex items-center gap-4 sm:gap-6 text-zinc-400">
                {/* LinkedIn Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] hover:border-amber-500/40 hover:text-white transition-colors cursor-pointer" title="LinkedIn">
                  <span className="font-mono text-xs font-bold">in</span>
                </div>

                {/* Instagram Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] hover:border-amber-500/40 hover:text-white transition-colors cursor-pointer" title="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>

                {/* Photoshop Ps Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] hover:border-amber-500/40 hover:text-white transition-colors cursor-pointer" title="Photoshop">
                  <span className="font-mono text-xs font-bold text-sky-400">Ps</span>
                </div>

                {/* Adobe Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] hover:border-amber-500/40 hover:text-white transition-colors cursor-pointer" title="Adobe Creative Suite">
                  <span className="font-mono text-sm font-black text-red-500">A</span>
                </div>

                {/* Netflix / Media Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] hover:border-amber-500/40 hover:text-white transition-colors cursor-pointer" title="Media Entertainment">
                  <span className="font-mono text-xs font-black text-rose-500">N</span>
                </div>

                {/* Linear / System Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] hover:border-amber-500/40 hover:text-white transition-colors cursor-pointer" title="Linear Engineering">
                  <span className="font-mono text-[10px] font-bold text-amber-300">DEV</span>
                </div>
              </div>
            </div>
          </div>

          {/* Far Right Vertical Editorial Typography (Matching the reference image!) */}
          <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-12 pointer-events-none">
            {/* Glowing amber top orb */}
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_15px_#ff9900]" />

            <div className="writing-vertical-lr rotate-180 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 select-none">
              VISUAL THAT SPEAK
            </div>

            <div className="h-16 w-px bg-gradient-to-b from-amber-500/50 via-zinc-800 to-transparent" />

            <div className="writing-vertical-lr rotate-180 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400 select-none text-right">
              CREATING IMPACT THROUGH DESIGN
            </div>
          </div>
        </div>
      )}

      {/* Floating Indicator when UI is hidden */}
      {!showUiOverlay && (
        <div className="absolute top-6 left-6 z-20 pointer-events-none bg-black/60 backdrop-blur-md border border-amber-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-[11px] text-amber-200">
            Pristine 16:9 Banner Asset Mode • High-Contrast Cinematic 3D Workstation
          </span>
        </div>
      )}
    </section>
  );
};
