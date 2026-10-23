import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, ShieldCheck, Clock } from 'lucide-react';

interface FinalVortexCTAProps {
  onOpenInquiry: () => void;
}

export const FinalVortexCTA: React.FC<FinalVortexCTAProps> = ({ onOpenInquiry }) => {
  return (
    <section className="relative py-36 px-6 sm:px-12 lg:px-20 border-t border-white/5 overflow-hidden text-center">
      {/* Soft gradient backdrop so text has maximum contrast over the background laptop frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          Inicie a Transformação Digital
        </div>

        {/* Requested Headline */}
        <h2 className="font-['Syne',sans-serif] text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-4 drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
          Tem uma ideia?
        </h2>

        {/* Requested Subheadline */}
        <p className="font-['Syne',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent mb-10 drop-shadow-[0_0_20px_rgba(255,140,40,0.3)]">
          Vamos transformá-la em software.
        </p>

        {/* Requested CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onOpenInquiry}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold font-mono text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(255,140,40,0.5)] hover:shadow-[0_0_50px_rgba(255,140,40,0.7)] transition-all duration-300 transform hover:scale-[1.03] cursor-pointer"
          >
            <span>COMEÇAR MEU PROJETO</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%20mlluizdevtech!%20Gostaria%20de%20conversar%20sobre%20um%20projeto%20de%20software."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-emerald-300 font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>CONVERSAR NO WHATSAPP</span>
          </a>
        </div>

        {/* Trust Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-zinc-300">
          <div className="flex items-center gap-2 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Resposta em até 24 horas úteis</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Acordo de Confidencialidade (NDA)</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Orçamento & Roadmap sem compromisso</span>
          </div>
        </div>
      </div>
    </section>
  );
};
