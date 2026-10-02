import React, { useState } from 'react';
import { 
  Search, 
  Layers, 
  Code2, 
  CheckCircle, 
  Rocket, 
  TrendingUp, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ProcessTimelineProps {
  onOpenInquiry: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenInquiry }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Descoberta',
      tagline: 'Imersão nos objetivos do seu negócio e levantamento cirúrgico de requisitos.',
      icon: Search,
      duration: 'Semana 1',
      deliverables: [
        'Mapeamento de jornada do usuário e regras de negócio',
        'Definição do escopo do MVP e priorização de features',
        'Estudo de viabilidade técnica e seleção da stack ideal',
        'Cronograma transparente e estimativa orçamentária fixa',
      ],
      quote: '"Não começamos a programar antes de entender exatamente como o software gerará receita."',
    },
    {
      number: '02',
      title: 'Arquitetura',
      tagline: 'Design de sistemas escaláveis e protótipos de alta fidelidade.',
      icon: Layers,
      duration: 'Semanas 1-2',
      deliverables: [
        'Diagrama de arquitetura em nuvem (AWS / GCP / Cloud Run)',
        'Modelagem de banco de dados relacional e vetorial',
        'Design System e protótipo de telas navegável no Figma',
        'Especificação completa de endpoints e contratos de APIs',
      ],
      quote: '"Uma boa arquitetura no primeiro dia evita refatorações custosas no primeiro milhão de usuários."',
    },
    {
      number: '03',
      title: 'Desenvolvimento',
      tagline: 'Engenharia de código limpo, sprints ágeis e integração com IA.',
      icon: Code2,
      duration: 'Semanas 2-4',
      deliverables: [
        'Sprints quinzenais com demonstrações de software funcional',
        'Código em TypeScript/Python com testes automatizados',
        'Integração de agentes de IA, webhooks e gateways de pagamento',
        'Ambiente de staging para você testar a evolução em tempo real',
      ],
      quote: '"Entregamos código limpo e sustentável que a sua equipe técnica terá orgulho de manter."',
    },
    {
      number: '04',
      title: 'Validação',
      tagline: 'Controle de qualidade rigoroso, segurança e testes de estresse.',
      icon: CheckCircle,
      duration: 'Semana 4',
      deliverables: [
        'Auditoria de segurança, vulnerabilidades e proteção de dados (LGPD)',
        'Testes de carga com simulação de acessos simultâneos',
        'Testes em múltiplos dispositivos móveis e navegadores',
        'Homologação formal e ajustes finos de usabilidade',
      ],
      quote: '"O produto só vai para produção quando supera todos os nossos critérios de excelência."',
    },
    {
      number: '05',
      title: 'Deploy',
      tagline: 'Lançamento em produção com zero downtime e pipelines automatizados.',
      icon: Rocket,
      duration: 'Dia do Lançamento',
      deliverables: [
        'Configuração de CI/CD automatizado (GitHub Actions)',
        'Certificados SSL, balanceamento de carga e proteção contra DDoS',
        'Publicação nas lojas Apple App Store e Google Play (se mobile)',
        'Checklist completo de Go-Live com monitoramento em tempo real',
      ],
      quote: '"Lançamento seguro, monitorado e com performance sub-segundo desde o primeiro minuto."',
    },
    {
      number: '06',
      title: 'Evolução',
      tagline: 'Sustentação contínua, telemetria de uso e melhorias estratégicas.',
      icon: TrendingUp,
      duration: 'Contínuo',
      deliverables: [
        'Monitoramento 24/7 com alertas automáticos de anomalias',
        'SLA garantido de suporte e correção imediata de bugs',
        'Análise de métricas de retenção e usabilidade para novas features',
        'Ajuste contínuo de capacidade e otimização de custos de nuvem',
      ],
      quote: '"O lançamento é apenas o começo: estamos ao seu lado durante toda a curva de escala."',
    },
  ];

  return (
    <section id="process" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-black/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Metodologia de Engenharia
            </div>
            <h2 className="font-['Syne',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              PROCESSO CLARO.
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                PREVISIBILIDADE TOTAL.
              </span>
            </h2>
          </div>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300 text-sm sm:text-base max-w-md mt-4 md:mt-0 font-normal leading-relaxed">
            Sem caixas pretas ou promessas vagas. Nosso processo segue marcos de engenharia estruturados para entregar o seu MVP em até 30 dias com padrão de qualidade industrial.
          </p>
        </div>

        {/* Timeline Stepper Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative group overflow-hidden ${
                  isCurrent
                    ? 'bg-gradient-to-b from-amber-500/20 to-orange-600/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-[#060a14] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {isCurrent && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-amber-400">{step.number}</span>
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-amber-400' : 'text-zinc-500'}`} />
                </div>
                <div className="font-['Syne',sans-serif] text-sm sm:text-base font-bold text-white mb-0.5">
                  {step.title}
                </div>
                <div className="font-mono text-[10px] text-zinc-400">
                  {step.duration}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Cinematic Focus Card */}
        {(() => {
          const current = steps[activeStep];
          const Icon = current.icon;
          return (
            <div className="rounded-3xl bg-[#060a14] border border-amber-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
              {/* Background watermark */}
              <div className="absolute right-8 -bottom-10 font-mono text-[160px] font-black text-white/[0.02] pointer-events-none select-none">
                {current.number}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold">
                        FASE {current.number} • {current.duration}
                      </span>
                      <h3 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-white">
                        {current.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
                    {current.tagline}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 pt-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 block font-semibold">
                      ENTREGÁVEIS DESTA FASE:
                    </span>
                    {current.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </div>
                        <span className="text-sm text-zinc-200">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10 italic text-zinc-300 text-sm leading-relaxed">
                    {current.quote}
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
                    <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-2 font-semibold">
                      Pronto para iniciar?
                    </span>
                    <p className="text-zinc-300 text-xs sm:text-sm font-light mb-4">
                      Agende uma conversa estratégica de 30 minutos com nossos engenheiros para mapear sua Fase 01.
                    </p>
                    <button
                      onClick={onOpenInquiry}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
                    >
                      <span>AGENDAR DESCOBERTA</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
