import React, { useState } from 'react';
import { Cpu, Code2, Database, Zap, Network, Layers, Sparkles } from 'lucide-react';

interface AICoreSectionProps {
  onOpenInquiry: () => void;
}

export const AICoreSection: React.FC<AICoreSectionProps> = ({ onOpenInquiry }) => {
  const [activeNode, setActiveNode] = useState(0);

  const nodes = [
    {
      id: 'codigo',
      title: 'Código',
      icon: Code2,
      multiplier: '3.5x mais rápido no desenvolvimento',
      detail: 'Sistemas com tipagem estrita, arquitetura modular e scaffolding inteligente assistido por IA.',
      impact: 'Redução drástica de bugs e entrega de features em dias em vez de meses.',
    },
    {
      id: 'dados',
      title: 'Dados',
      icon: Database,
      multiplier: '100% de inteligência estruturada',
      detail: 'Bancos vetoriais, PostgreSQL e pipelines de ETL que transformam dados brutos em decisões.',
      impact: 'Busca semântica imediata e relatórios executivos em tempo real.',
    },
    {
      id: 'automacao',
      title: 'Automação',
      icon: Zap,
      multiplier: 'Zero tarefas manuais repetitivas',
      detail: 'Fluxos de trabalho autônomos, integrações de webhook e sincronização de múltiplos sistemas.',
      impact: 'Elimina gargalos operacionais e erros humanos em rotinas críticas.',
    },
    {
      id: 'ia',
      title: 'IA',
      icon: Cpu,
      multiplier: 'Agentes autônomos em produção',
      detail: 'Modelos de linguagem (LLMs) multimodais treinados com as regras específicas do seu negócio.',
      impact: 'Atendimento qualificado 24/7 e triagem preditiva de solicitações.',
    },
    {
      id: 'apis',
      title: 'APIs',
      icon: Network,
      multiplier: 'Integrações seguras e universais',
      detail: 'Microsserviços de alta disponibilidade conectando ERPs, CRMs, gateways de pagamento e WhatsApp.',
      impact: 'Ecossistema unificado sem fricção para o usuário final.',
    },
    {
      id: 'software',
      title: 'Software',
      icon: Layers,
      multiplier: 'Experiência fluida e escalável',
      detail: 'Aplicações web modernas e aplicativos mobile com interfaces intuitivas de alta conversão.',
      impact: 'Retenção recorde de usuários e arquitetura pronta para milhões de acessos.',
    },
  ];

  return (
    <section id="ai-core" className="relative py-28 px-6 sm:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Engenharia Orientada a Multiplicação
          </div>
          <h2 className="font-['Syne',sans-serif] text-[clamp(1.5rem,7vw,2.25rem)] sm:text-4xl lg:text-5xl font-bold lg:font-extrabold text-white tracking-tight">
            IA NÃO É O PRODUTO.
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              É O MULTIPLICADOR.
            </span>
          </h2>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300 text-sm sm:text-base mt-4 font-normal leading-relaxed">
            Não colocamos chatbots cosméticos na sua aplicação. Integramos IA nos pontos de maior fricção do seu processo de negócio para acelerar o desenvolvimento e multiplicar a capacidade operacional da sua empresa.
          </p>
        </div>

        {/* The Central Glowing Digital Core Interactive Diagram */}
        <div className="relative max-w-4xl mx-auto rounded-3xl bg-black/75 border border-amber-500/30 overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
          {/* Top Label */}
          <div className="relative z-10 flex items-center justify-between flex-wrap gap-2 mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold">
              ● NÚCLEO DIGITAL MLLUIZDEVTECH
            </span>
            <span className="font-mono text-xs text-zinc-400">
              Clique em um elemento para inspecionar o multiplicador
            </span>
          </div>

          {/* Interactive Satellite Node Buttons Bar */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-6 gap-2.5 mb-8">
            {nodes.map((n, idx) => {
              const Icon = n.icon;
              const isSelected = activeNode === idx;
              return (
                <button
                  key={n.id}
                  onClick={() => setActiveNode(idx)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-black/50 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1.5 ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`} />
                  <span className="font-mono text-xs font-bold block">{n.title}</span>
                </button>
              );
            })}
          </div>

          {/* Convergence Target: "SEU NEGÓCIO" */}
          <div className="relative z-10 text-center my-4">
            <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 shadow-2xl shadow-amber-500/30">
              <div className="px-8 py-4 rounded-xl bg-[#060a14] border border-amber-500/40">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 block font-semibold mb-0.5">
                  TODAS AS FORÇAS CONVERGEM PARA:
                </span>
                <span className="font-['Syne',sans-serif] text-xl sm:text-2xl font-black text-white">
                  SEU NEGÓCIO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Node Multiplier Breakdown Card */}
        {(() => {
          const current = nodes[activeNode];
          return (
            <div className="mt-8 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-black/80 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase">
                    {current.title}
                  </span>
                  <span className="font-mono text-sm font-bold text-white">
                    {current.multiplier}
                  </span>
                </div>
                <p className="text-zinc-300 text-sm font-light mb-1">
                  {current.detail}
                </p>
                <p className="text-amber-300/90 text-xs font-mono">
                  Impacto real: {current.impact}
                </p>
              </div>

              <button
                onClick={onOpenInquiry}
                className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold font-mono text-xs uppercase tracking-wider transition-all transform hover:scale-105 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                APLICAR NO MEU PROJETO
              </button>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
