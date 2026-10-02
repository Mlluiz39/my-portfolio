import React from 'react';
import { Shield, Target, Zap, HeartHandshake, Sparkles, Terminal, ArrowRight } from 'lucide-react';

interface AboutEditorialProps {
  onOpenInquiry: () => void;
}

export const AboutEditorial: React.FC<AboutEditorialProps> = ({ onOpenInquiry }) => {
  const values = [
    {
      icon: Target,
      title: 'Foco no Negócio',
      description: 'Código é meio, não fim. Cada funcionalidade é projetada para reduzir custos operacionais ou aumentar o faturamento da sua empresa.',
    },
    {
      icon: Shield,
      title: 'Transparência Radical',
      description: 'Sem caixas pretas ou termos técnicos indecifráveis. Você acompanha cada sprint, cada commit e sabe exatamente para onde vai cada centavo investido.',
    },
    {
      icon: Zap,
      title: 'Velocidade & Precisão',
      description: 'Com ferramentas modernas e automações com IA, colocamos seu MVP funcional no ar em até 30 dias sem abrir mão de segurança e boas práticas.',
    },
    {
      icon: HeartHandshake,
      title: 'Parceria de Longo Prazo',
      description: 'Atuamos como a equipe de tecnologia interna da sua empresa. Do primeiro protótipo à escala para centenas de milhares de clientes.',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-black/60 backdrop-blur-[2px] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Refined Editorial Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              Manifesto & Identidade
            </div>

            <h2 className="font-['Syne',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              TECNOLOGIA NÃO PRECISA SER{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                COMPLICADA.
              </span>
            </h2>

            <div className="space-y-4 text-zinc-300 font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg font-light leading-relaxed">
              <p>
                A <strong className="text-white font-semibold">mlluizdevtech</strong> nasceu com uma convicção clara: a maioria dos projetos de tecnologia falha não por limitações técnicas, mas por excesso de complexidade e falta de alinhamento com a realidade de quem opera o negócio.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base">
                Fundada pelo engenheiro de software e arquiteto de soluções <strong className="text-zinc-200">Luiz Pereira</strong>, combinamos rigor de engenharia de software, automações com IA e design refinado para criar sistemas robustos que resolvem dores reais de empresas brasileiras e globais.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base">
                Do código backend de alta disponibilidade aos aplicativos mobile com experiência nativa, tratamos o seu software como o ativo estratégico mais importante da sua organização.
              </p>
            </div>

            {/* Founder Note Box */}
            <div className="p-6 rounded-2xl bg-[#060a14] border border-amber-500/25 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono font-black text-amber-400 text-lg shrink-0">
                LP
              </div>
              <div>
                <div className="font-['Syne',sans-serif] text-base font-bold text-white">
                  Luiz Pereira
                </div>
                <div className="font-mono text-xs text-amber-400">
                  Founder & Principal Software Architect • mlluizdevtech
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-amber-500/30 hover:border-amber-400 text-amber-300 font-mono text-xs uppercase tracking-wider transition-all"
              >
                <span>FALAR DIRETAMENTE COM O ENGENHEIRO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Values Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-[#060a15] border border-white/5 hover:border-amber-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-['Syne',sans-serif] text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
