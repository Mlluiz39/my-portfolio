import React from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  onOpenInquiry: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenInquiry,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'services', label: 'SERVICES' },
    { id: 'work', label: 'WORK' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <nav className="absolute top-0 inset-x-0 z-30 px-6 sm:px-12 py-7 flex items-center justify-between">
      {/* Brand Monogram */}
      <button 
        onClick={() => onNavigate('home')} 
        className="flex items-center gap-2.5 text-left group"
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-amber-500/40 group-hover:border-amber-400 transition-colors">
          <span className="font-mono font-black text-base text-amber-400">R</span>
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-xs font-black tracking-widest text-white group-hover:text-amber-200 transition-colors">
            RATAN <span className="text-amber-400">STUDIO</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
            DIGITAL CRAFT
          </span>
        </div>
      </button>

      {/* Center Navigation Links (Matching Reference) */}
      <div className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`font-mono text-xs uppercase tracking-widest transition-all relative py-1 ${
              activeSection === item.id
                ? 'text-white font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {item.label}
            {activeSection === item.id && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            )}
          </button>
        ))}
      </div>

      {/* Right "LETS TALK" Capsule Button with glowing amber dot (Exact reference match) */}
      <div className="hidden sm:flex items-center gap-3">
        <button
          onClick={onOpenInquiry}
          className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#170e06] via-[#241305] to-[#120b05] border border-amber-600/40 hover:border-amber-400/80 shadow-lg shadow-orange-950/40 transition-all duration-300 transform hover:scale-[1.03]"
        >
          <span className="font-mono text-xs font-bold tracking-widest text-amber-100 group-hover:text-white uppercase">
            LETS TALK
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-[0_0_8px_#ff9900]"></span>
          </span>
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={onOpenInquiry}
          className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold"
        >
          TALK
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-zinc-400 hover:text-white rounded-lg bg-white/5"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-20 inset-x-6 bg-[#080d19] border border-amber-500/30 rounded-2xl p-6 shadow-2xl z-40 md:hidden animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left font-mono text-sm tracking-wider text-zinc-300 hover:text-amber-400 py-2 border-b border-white/5"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenInquiry();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold font-mono text-xs uppercase tracking-widest text-center"
            >
              LETS TALK
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
