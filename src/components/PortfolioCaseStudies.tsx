import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Terminal,
  Activity,
  Zap
} from 'lucide-react';

interface PortfolioCaseStudiesProps {
  onOpenInquiry: () => void;
}

export const PortfolioCaseStudies: React.FC<PortfolioCaseStudiesProps> = ({ onOpenInquiry }) => {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      id: '01',
      title: 'AgroTrack Telemetria & IA',
      tagline: 'Plataforma web e mobile para monitoramento preditivo de safras agrícolas.',
      category: 'Sistemas & IA',
      metrics: '+34% de produtividade • 120 mil hectares monitorados',
      challenge:
        'A produtora agrícola gerenciava dados de telemetria dispersos em planilhas e sensores desconectados, causando atrasos críticos na identificação de pragas e estresse hídrico no solo.',
      solution:
        'Arquitetamos um dashboard web de alta performance integrado a aplicativo mobile offline-first com processamento local. Implementamos modelos de IA preditiva para prever janelas ideais de colheita e alertas automáticos via WhatsApp.',
      result:
        'Redução de 45% nas perdas de insumos, tempo de detecção de anomalias reduzido de 5 dias para menos de 2 horas e adoção por mais de 450 operadores em campo.',
      technology: ['Next.js 15', 'React Native', 'Python (FastAPI)', 'Gemini AI', 'PostgreSQL / PostGIS', 'IoT WebSockets'],
      uiHighlight: 'Mapa Interativo de Calor Satelital com Telemetria em Tempo Real',
      stats: [
        { label: 'Hectares', val: '120k+' },
        { label: 'Sensores Ativos', val: '1.450' },
        { label: 'Economia Anual', val: 'R$ 1.8M' },
      ],
    },
    {
      id: '02',
      title: 'Krypton Pay & Billing',
      tagline: 'Infraestrutura SaaS financeira para conciliação bancária e cobrança PIX instantânea.',
      category: 'Fintech & SaaS',
      metrics: 'R$ 48M transacionados/mês • 99.99% de disponibilidade',
      challenge:
        'Empresas B2B sofriam com inadimplência recorrente e perda de tempo na conciliação manual de extratos bancários de múltiplos adquirentes e bancos tradicionais.',
      solution:
        'Desenvolvemos um SaaS multi-tenant completo com integração direta ao Banco Central (PIX com webhook sub-segundo), réguas de cobrança automatizadas por e-mail/WhatsApp e painel de reconciliação inteligente.',
      result:
        'Inadimplência reduzida em 28% no primeiro trimestre. Tempo de conciliação financeira reduzido de 14 horas semanais para processo 100% automático em tempo real.',
      technology: ['React 19', 'Node.js', 'Redis', 'Docker', 'PostgreSQL', 'Stripe & Asaas APIs', 'Kafka'],
      uiHighlight: 'Terminal de Liquidação e Gráfico de Conciliação em Tempo Real',
      stats: [
        { label: 'Volume Mensal', val: 'R$ 48M' },
        { label: 'Tempo PIX', val: '< 650ms' },
        { label: 'Falhas de Reconciliação', val: '0.001%' },
      ],
    },
    {
      id: '03',
      title: 'OmniLog Fleet Mobile',
      tagline: 'Aplicativo de logística para motoristas e centro de controle operacional.',
      category: 'Mobile iOS & Android',
      metrics: '3.200 motoristas ativos • Roteirização inteligente',
      challenge:
        'A operadora logística enfrentava gargalos de rastreamento, canhotos de entrega físicos perdidos e comunicação ineficiente entre o centro de distribuição e os motoristas em trânsito.',
      solution:
        'Criamos um aplicativo mobile com assinatura digital, captura inteligente de comprovantes com OCR, rastreamento GPS com otimização de bateria e algoritmo de roteirização dinâmica.',
      result:
        'Eliminação de 100% do papel nos comprovantes de entrega. Aumento de 22% no número de entregas realizadas por dia por veículo.',
      technology: ['Flutter', 'Google Maps Platform', 'Node.js', 'Firebase Cloud Messaging', 'AWS S3', 'OCR Vision'],
      uiHighlight: 'Cockpit Mobile com Comprovante Digital e Geofencing Automático',
      stats: [
        { label: 'Motoristas', val: '3.200+' },
        { label: 'Entregas/Mês', val: '180k' },
        { label: 'Economia Combustível', val: '-18%' },
      ],
    },
    {
      id: '04',
      title: 'ClinicOS Telemedicina',
      tagline: 'Sistema de prontuário eletrônico em nuvem com triagem anamnésica por IA.',
      category: 'HealthTech & Web',
      metrics: '85 clínicas integradas • Conformidade LGPD & CFM',
      challenge:
        'Clínicas médicas perdiam até 25% de agendamentos por no-show e os profissionais gastavam tempo excessivo digitando notas manuais de consulta.',
      solution:
        'Construímos uma plataforma médica completa com sala de teleconsulta WebRTC criptografada ponta a ponta, transcrição de áudio com resumo clínico automático estruturado e confirmação inteligente por WhatsApp.',
      result:
        'Queda do no-show para menos de 4%. Médicos relataram ganho médio de 12 minutos por paciente focado em cuidado humano ao invés de digitação.',
      technology: ['Next.js', 'WebRTC', 'Gemini AI', 'Tailwind CSS', 'PostgreSQL Encriptado', 'HIPAA/LGPD'],
      uiHighlight: 'Prontuário Médico Dinâmico com Resumo Clínico em Tempo Real',
      stats: [
        { label: 'Consultas/Mês', val: '42.000' },
        { label: 'No-Show', val: '< 4%' },
        { label: 'Tempo Poupado', val: '12 min/atend' },
      ],
    },
  ];

  return (
    <section id="portfolio" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-black/60 backdrop-blur-[2px] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Cases de Sucesso • mlluizdevtech
            </div>
            <h2 className="font-['Syne',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              PROJETOS QUE
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                GERAM RESULTADO.
              </span>
            </h2>
          </div>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300 text-sm sm:text-base max-w-md mt-4 md:mt-0 font-normal leading-relaxed">
            Conheça algumas das soluções que desenvolvemos para empresas que precisavam de software robusto, escalável e com impacto mensurável no faturamento.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {cases.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedCase(idx)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                selectedCase === idx
                  ? 'bg-amber-500 text-black border-amber-400 font-extrabold shadow-lg shadow-amber-500/25'
                  : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {item.id} • {item.title}
            </button>
          ))}
        </div>

        {/* Selected Case Study Presentation */}
        {(() => {
          const current = cases[selectedCase];
          return (
            <div className="rounded-3xl bg-[#060a15] border border-amber-500/30 overflow-hidden shadow-2xl">
              {/* Top Banner with Title & Key Metric */}
              <div className="p-8 sm:p-10 border-b border-white/10 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
                      {current.category}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">CASE STUDY #{current.id}</span>
                  </div>
                  <h3 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-white">
                    {current.title}
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base mt-1 font-light max-w-2xl">
                    {current.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="px-5 py-3 rounded-2xl bg-black/50 border border-amber-500/30 text-right">
                    <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                      Impacto Comprovado
                    </div>
                    <div className="font-mono text-sm sm:text-base font-bold text-amber-300">
                      {current.metrics}
                    </div>
                  </div>
                  <button
                    onClick={onOpenInquiry}
                    className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition-all shadow-md shadow-amber-500/20"
                    title="Construir projeto similar"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Case Content: Challenge, Solution, Result, Technology */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10">
                {/* Left Columns: The Case Breakdown */}
                <div className="lg:col-span-7 space-y-8">
                  {/* 1. Challenge (Desafio) */}
                  <div className="relative pl-6 border-l-2 border-orange-500/40">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-400 block mb-1.5">
                      01 / O DESAFIO
                    </span>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                      {current.challenge}
                    </p>
                  </div>

                  {/* 2. Solution (Solução) */}
                  <div className="relative pl-6 border-l-2 border-amber-500/40">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
                      02 / A SOLUÇÃO MLLUIZDEVTECH
                    </span>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                      {current.solution}
                    </p>
                  </div>

                  {/* 3. Result (Resultado) */}
                  <div className="relative pl-6 border-l-2 border-emerald-500/50">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1.5">
                      03 / O RESULTADO MENSURÁVEL
                    </span>
                    <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-medium">
                      {current.result}
                    </p>
                  </div>

                  {/* 4. Technology (Tecnologias) */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                      STACK TECNOLÓGICA UTILIZADA:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {current.technology.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 font-mono text-xs font-medium hover:border-amber-500/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Large Visual Mockup */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="rounded-2xl bg-[#03060d] border border-white/10 p-6 relative overflow-hidden shadow-inner h-full flex flex-col justify-between">
                    {/* Visual Mockup Header Bar */}
                    <div>
                      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="font-mono text-[10px] text-zinc-400 uppercase">
                          mlluizdevtech production system
                        </span>
                      </div>

                      {/* Mockup UI Component Canvas */}
                      <div className="bg-[#070b16] rounded-xl border border-white/5 p-4 mb-4">
                        <div className="flex items-center justify-between mb-3 text-xs font-mono">
                          <span className="text-amber-400 flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5" />
                            {current.uiHighlight}
                          </span>
                          <span className="text-emerald-400 font-semibold">● ONLINE</span>
                        </div>

                        {/* Visual telemetry bar simulation */}
                        <div className="space-y-2">
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-4/5 animate-pulse" />
                          </div>
                          <div className="flex justify-between font-mono text-[10px] text-zinc-400">
                            <span>Latência de API: 14ms</span>
                            <span>Segurança: TLS 1.3 + RBAC</span>
                          </div>
                        </div>
                      </div>

                      {/* Real Business Stats Cards */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {current.stats.map((st, sIdx) => (
                          <div key={sIdx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                            <div className="font-mono text-base sm:text-lg font-bold text-white mb-0.5">
                              {st.val}
                            </div>
                            <div className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                              {st.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Callout */}
                    <div className="pt-4 border-t border-white/10">
                      <button
                        onClick={onOpenInquiry}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                      >
                        <span>DISCUTIR PROJETO SIMILAR</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
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
