import React from 'react';
import { Layers, Clock, Cpu, MessageSquare, ShieldCheck } from 'lucide-react';

export const TrustMetrics: React.FC = () => {
  const metrics = [
    {
      value: '50+',
      label: 'projetos entregues',
      desc: 'Sistemas web, apps mobile e plataformas SaaS em produção',
      icon: Layers,
    },
    {
      value: '30 dias',
      label: 'para MVP',
      desc: 'Do conceito inicial ao produto testável pronto para validar tração',
      icon: Clock,
    },
    {
      value: 'IA + Automação',
      label: 'em todas as soluções',
      desc: 'Pipelines inteligentes para acelerar o desenvolvimento e o seu negócio',
      icon: Cpu,
    },
    {
      value: '24h',
      label: 'tempo de resposta',
      desc: 'Comunicação ágil e suporte direto com engenheiros de software',
      icon: MessageSquare,
    },
  ];

  return (
    <section className="relative z-20 py-12 px-6 sm:px-12 bg-black/60 backdrop-blur-md border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-[#060a15] border border-white/5 hover:border-amber-500/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-amber-500/5"
              >
                {/* Subtle warm glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                    METRIC 0{idx + 1}
                  </span>
                </div>

                <div className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1 group-hover:text-amber-200 transition-colors">
                  {item.value}
                </div>

                <div className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                  {item.label}
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
