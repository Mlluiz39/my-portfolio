import React from 'react';
import { ArrowUp, Mail, MessageCircle, MapPin, Sparkles, Terminal } from 'lucide-react';

interface FooterMlluizProps {
  onOpenInquiry: () => void;
  onNavigate: (section: string) => void;
}

export const FooterMlluiz: React.FC<FooterMlluizProps> = ({ onOpenInquiry, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-black/80 backdrop-blur-md border-t border-white/10 pt-20 pb-12 px-6 sm:px-12 lg:px-20 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 via-orange-600/20 to-black border border-amber-500/40">
                <span className="font-mono font-black text-sm text-amber-400">ML</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Syne',sans-serif] text-base font-extrabold tracking-tight text-white">
                  mlluiz<span className="text-amber-400">devtech</span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                  SOFTWARE HOUSE & SOLUÇÕES COM IA
                </span>
              </div>
            </div>

            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-400 text-sm max-w-sm leading-relaxed">
              Software que transforma ideias em negócios digitais. Engenharia de software personalizada, aplicativos mobile, SaaS e automações inteligentes.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Novos projetos com início imediato
              </span>
            </div>
          </div>

          {/* Services Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 block mb-3 font-semibold">
              Especialidades
            </span>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">
                  Websites & Sistemas Web
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">
                  Aplicativos Mobile (iOS/Android)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">
                  IA & Automação de Processos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">
                  APIs & Integrações de Sistemas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">
                  SaaS sob medida
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">
                  Evolução Contínua & Suporte
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Channels */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 block mb-3 font-semibold">
              Canais de Contato Direto
            </span>
            
            <div className="space-y-2.5 text-xs font-mono">
              <a
                href="mailto:mlluizpereira39@gmail.com"
                className="flex items-center gap-2.5 text-zinc-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>mlluizpereira39@gmail.com</span>
              </a>

              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1%20mlluizdevtech!%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-zinc-300 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Direto com a Engenharia</span>
              </a>

              <div className="flex items-center gap-2.5 text-zinc-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Brasil • Atendimento Nacional e Global</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold font-mono text-xs tracking-wider uppercase transition-all shadow-md shadow-amber-500/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>SOLICITAR ORÇAMENTO</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} mlluizdevtech. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">Termos de Serviço</span>
            <span className="hover:text-zinc-300 cursor-pointer">Política de Privacidade</span>
            <span className="hover:text-zinc-300 cursor-pointer">Segurança & LGPD</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
