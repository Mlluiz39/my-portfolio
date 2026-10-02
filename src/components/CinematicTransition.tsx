import React from 'react';
import { Terminal, Cpu, Laptop, Rocket, Sparkles, ChevronDown } from 'lucide-react';

export const CinematicTransition: React.FC = () => {
  const milestones = [
    {
      step: '01',
      title: 'PESSOA COM LAPTOP',
      subtitle: 'O insight estratégico do fundador e o mapeamento de processos reais.',
      icon: Laptop,
    },
    {
      step: '02',
      title: 'FLUXO DE CÓDIGO DOURADO',
      subtitle: 'Arquitetura de microsserviços, modelagem de dados e engenharia rigorosa.',
      icon: Terminal,
    },
    {
      step: '03',
      title: 'MULTIPLICADOR COM IA',
      subtitle: 'Integração de agentes autônomos, pipelines de machine learning e automação.',
      icon: Cpu,
    },
    {
      step: '04',
      title: 'PRODUTO EM PRODUÇÃO',
      subtitle: 'Software escalável, seguro e testado gerando receita e tração comprovada.',
      icon: Rocket,
    },
  ];

  return (
    <section className="relative py-28 px-6 sm:px-12 overflow-hidden border-t border-white/5">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Transição Cinemática
          </div>
          <h2 className="font-['Syne',sans-serif] text-[clamp(1.5rem,7vw,1.875rem)] sm:text-3xl md:text-4xl font-bold md:font-extrabold text-white tracking-tight">
            DO PENSAMENTO À REALIDADE:
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              O FLUXO DE TRANSFORMAÇÃO
            </span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-light">
            Como conectamos visão de negócios, código de alta precisão e IA para materializar produtos digitais que dominam mercados.
          </p>
        </div>

        {/* 4 Connected Milestones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 hover:border-amber-500/50 transition-all duration-300 shadow-xl group hover:shadow-[0_0_30px_rgba(255,150,40,0.15)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-400">
                    ETAPA {item.step}
                  </span>
                </div>

                <h3 className="font-['Syne',sans-serif] text-base font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Flow indicator */}
        <div className="flex items-center justify-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-400 font-mono text-xs">
            <span>EXPLORE OS CASES REAIS ABAIXO</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>
      </div>
    </section>
  );
};
