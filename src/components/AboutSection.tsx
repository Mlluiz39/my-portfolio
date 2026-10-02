import React from 'react';
import { Award, Compass, Shield, Terminal, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenInquiry: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenInquiry }) => {
  const pillars = [
    {
      icon: Terminal,
      title: 'Architectural Rigor',
      description: 'Zero bloat, type-safe full-stack architectures built for resilience, rapid iteration, and extreme performance.',
    },
    {
      icon: Compass,
      title: 'Cinematic Art Direction',
      description: 'High-contrast typography, volumetric lighting, and immersive 3D spatial interfaces that seize attention.',
    },
    {
      icon: Shield,
      title: 'Enterprise Scalability',
      description: 'Battle-tested security standards, cloud-native deployments, and sub-100ms latency across global edge networks.',
    },
    {
      icon: Award,
      title: 'Measurable ROI',
      description: 'Every line of code and interaction design choice is directly tethered to your primary conversion metrics.',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#04060c] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Philosophy & Method
            </div>
            
            <h2 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              WE DON'T JUST BUILD WEBSITES.
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                WE FORGE DIGITAL WORLDS.
              </span>
            </h2>

            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300 text-base leading-relaxed">
              Founded on the belief that digital interfaces should be as breathtaking as cinema and as reliable as aerospace telemetry. We partner with visionaries, venture-backed innovators, and iconic brands to deliver unfair competitive advantages.
            </p>

            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-400 text-sm leading-relaxed">
              From our digital workstation to global production deployments, every detail—from micro-geometry to server-side orchestration—is meticulously calibrated.
            </p>

            <div className="pt-4">
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-amber-500/30 hover:border-amber-400 text-amber-300 font-mono text-xs tracking-wider uppercase transition-all"
              >
                <span>INITIATE COLLABORATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Core Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#070b16] border border-white/5 hover:border-amber-500/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-['Syne',sans-serif] text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light">
                    {item.description}
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
