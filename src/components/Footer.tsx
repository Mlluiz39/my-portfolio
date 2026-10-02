import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenInquiry: () => void;
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-[#020306] border-t border-white/10 pt-20 pb-12 px-6 sm:px-12 lg:px-20 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-amber-500/40">
                <span className="font-mono font-black text-base text-amber-400">R</span>
              </div>
              <span className="font-mono text-sm font-black tracking-widest text-white">
                RATAN <span className="text-amber-400">STUDIO</span>
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-400 text-sm max-w-sm leading-relaxed">
              Bespoke digital architecture, cinematic web experiences, and artificial intelligence solutions engineered for market leaders.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Q3/Q4 Strategic Engagements
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 block mb-3">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">
                  01 / HOME
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">
                  02 / SERVICES
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('work')} className="hover:text-amber-400 transition-colors">
                  03 / PORTFOLIO
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  04 / ABOUT & METHOD
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact Box */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 block mb-3">
              Direct Inquiries
            </span>
            <p className="font-mono text-sm text-zinc-300">
              hello@ratanstudio.digital
            </p>
            <p className="font-mono text-xs text-zinc-500">
              Silicon Valley • London • Tokyo • Remote Worldwide
            </p>
            <button
              onClick={onOpenInquiry}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold font-mono text-xs tracking-wider uppercase transition-all shadow-md shadow-amber-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>BOOK A DISCOVERY CALL</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} RATAN STUDIO & AURA DIGITAL. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>TERMS OF ENGAGEMENT</span>
            <span>PRIVACY DISCLOSURE</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
