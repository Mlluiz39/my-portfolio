import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare, Terminal } from 'lucide-react';

interface NavbarMlluizProps {
  onOpenInquiry: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const NavbarMlluiz: React.FC<NavbarMlluizProps> = ({
  onOpenInquiry,
  activeSection,
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Início' },
    { id: 'services', label: 'Serviços' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'ai-core', label: 'IA & Automação' },
    { id: 'process', label: 'Processo' },
    { id: 'about', label: 'Sobre' },
    { id: 'contact', label: 'Contato' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#03050a]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 via-orange-600/20 to-black border border-amber-500/40 group-hover:border-amber-400 transition-all shadow-[0_0_15px_rgba(255,140,40,0.2)]">
            <span className="font-mono font-black text-sm text-amber-400">ML</span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#ff9900]" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Syne',sans-serif] text-sm sm:text-base font-extrabold tracking-tight text-white group-hover:text-amber-200 transition-colors">
              mlluiz<span className="text-amber-400">devtech</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">
              SOFTWARE HOUSE & IA
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`font-mono text-xs uppercase tracking-wider transition-all relative py-1 ${
                activeSection === item.id
                  ? 'text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              )}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenInquiry}
            className="group relative inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold font-mono text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(255,140,40,0.3)] hover:shadow-[0_0_30px_rgba(255,140,40,0.5)] transition-all duration-300 transform hover:scale-[1.03]"
          >
            <span>CRIAR MEU PROJETO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onOpenInquiry}
            className="px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold"
          >
            PROJETO
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-[#060a14]/95 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left font-mono text-sm tracking-wider text-zinc-300 hover:text-amber-400 py-2.5 border-b border-white/5"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenInquiry();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-3 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold font-mono text-xs uppercase tracking-widest text-center shadow-lg shadow-amber-500/30"
            >
              CRIAR MEU PROJETO
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
