import React, { useState } from 'react';
import { Globe, Cpu, Sparkles, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ServicesSectionProps {
  onOpenInquiry: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiry }) => {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: '01',
      title: 'Digital Transformation & Architecture',
      tagline: 'Modernizing core systems into high-velocity digital ecosystems.',
      icon: Globe,
      features: [
        'Cloud-native architecture & microservices migration',
        'Headless CMS & composable enterprise platforms',
        'Multi-region performance optimization & sub-100ms latency',
        'Enterprise security, RBAC & compliance governance',
      ],
      stack: ['Next.js 15', 'TypeScript', 'Edge Compute', 'Docker', 'Kubernetes'],
      metric: '4.2x Faster Time-to-Market',
    },
    {
      id: '02',
      title: 'AI Engineering & Autonomous Systems',
      tagline: 'Bridging frontier models with production-grade business logic.',
      icon: Cpu,
      features: [
        'Multimodal LLM pipelines & retrieval-augmented generation (RAG)',
        'Domain-specific fine-tuning & agentic orchestration',
        'Real-time streaming inference & synthetic data engines',
        'Explainable AI governance & guardrail monitoring',
      ],
      stack: ['Gemini 2.5', 'Vector DBs', 'Python', 'LangGraph', 'PyTorch'],
      metric: '88% Workflow Automation',
    },
    {
      id: '03',
      title: 'Creative Direction & 3D Spatial UI',
      tagline: 'Emotionally resonant, award-winning visual identities and interactive craft.',
      icon: Sparkles,
      features: [
        'WebGL, Three.js & GLSL cinematic interactive web experiences',
        'Photorealistic 3D product visualizations & digital twins',
        'Holistic design systems, typography & motion choreography',
        'Micro-interactions & fluid 60fps gesture interfaces',
      ],
      stack: ['Three.js', 'GLSL Shaders', 'WebGPU', 'Figma', 'Blender'],
      metric: '14 International Awards',
    },
    {
      id: '04',
      title: 'Full-Stack Performance Engineering',
      tagline: 'Scalable, resilient web applications built for millions of concurrent users.',
      icon: Layers,
      features: [
        'Zero-downtime CI/CD deployment pipelines',
        'Optimistic UI state synchronization & offline cache',
        'Real-time WebSockets & collaborative multiplayer canvases',
        'Core Web Vitals 100/100 audit guarantee',
      ],
      stack: ['React 19', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
      metric: '99.99% Uptime SLA',
    },
  ];

  return (
    <section id="services" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#04060c] border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Strategic Capabilities
            </div>
            <h2 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-bold text-white tracking-tight">
              SERVICES DESIGNED FOR
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                HIGH-IMPACT SCALING
              </span>
            </h2>
          </div>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-400 text-sm sm:text-base max-w-md mt-4 md:mt-0">
            We operate at the intersection of cinematic design, artificial intelligence, and rigorous software engineering to build category-defining products.
          </p>
        </div>

        {/* Interactive Service Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Service Tab Column */}
          <div className="lg:col-span-5 space-y-3">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={svc.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/50 shadow-xl shadow-amber-500/5'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-orange-600" />
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-amber-400 font-bold">{svc.id}</span>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                  </div>
                  <h3 className="font-['Syne',sans-serif] text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light line-clamp-2">
                    {svc.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Detail Showcase Card */}
          <div className="lg:col-span-7 bg-[#070b16] border border-amber-500/20 rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            {/* Background watermarked service number */}
            <div className="absolute right-6 -bottom-10 font-mono text-[140px] font-black text-white/[0.02] select-none pointer-events-none">
              {services[activeTab].id}
            </div>

            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
                  Domain Architecture #{services[activeTab].id}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
                  {services[activeTab].metric}
                </span>
              </div>

              <h3 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {services[activeTab].title}
              </h3>
              <p className="text-zinc-300 text-base mb-8 leading-relaxed">
                {services[activeTab].tagline}
              </p>

              {/* Feature List */}
              <div className="space-y-3 mb-8">
                {services[activeTab].features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & CTA */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
                    Engineered With
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {services[activeTab].stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 font-mono text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold font-mono text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105"
                >
                  <span>ENGAGE PRACTICE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
