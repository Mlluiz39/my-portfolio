import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

interface PortfolioSectionProps {
  onOpenInquiry: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenInquiry }) => {
  const [filter, setFilter] = useState('ALL');

  const projects = [
    {
      title: 'AeroDynamics AI Cockpit',
      category: 'AI & Spatial UI',
      client: 'AeroDynamics Space Corp',
      year: '2026',
      impact: '+340% Telemetry Efficiency',
      description: 'Next-generation aerospace command interface utilizing WebGL spatial mapping and real-time autonomous anomaly detection.',
      accent: 'from-amber-500/20 via-orange-600/10 to-transparent',
      borderColor: 'group-hover:border-amber-500/50',
      tags: ['WebGL', 'Gemini AI', 'WebSockets', 'Telemetry'],
    },
    {
      title: 'Krypton Liquidity Protocol',
      category: 'FinTech Architecture',
      client: 'Krypton Global Capital',
      year: '2026',
      impact: '$4.2B Daily Volume Processed',
      description: 'Ultra-low latency institutional trading interface with sub-12ms order routing, algorithmic depth books, and dark mode ergonomics.',
      accent: 'from-orange-500/20 via-amber-600/10 to-transparent',
      borderColor: 'group-hover:border-orange-500/50',
      tags: ['TypeScript', 'Rust Wasm', 'Next.js 15', 'Sub-15ms'],
    },
    {
      title: 'Solstice Luxury Brand System',
      category: 'Creative Direction',
      client: 'Solstice Maison Paris',
      year: '2025',
      impact: 'Cannes Lions Design Gold',
      description: 'Global eCommerce flagship featuring 3D virtual fitting salon, generative typography, and bespoke tactile motion choreography.',
      accent: 'from-amber-400/20 via-yellow-600/10 to-transparent',
      borderColor: 'group-hover:border-amber-400/50',
      tags: ['Three.js', 'Shader Craft', 'Shopify Plus', 'Spatial Audio'],
    },
    {
      title: 'NeuroFlow Diagnostic OS',
      category: 'Digital Transformation',
      client: 'Novartis BioVenture',
      year: '2025',
      impact: '1.2M Patient Records Unified',
      description: 'Enterprise healthcare workflow transformation migrating legacy EHR pipelines into an intelligent, HIPAA-compliant diagnostic canvas.',
      accent: 'from-amber-600/20 via-orange-700/10 to-transparent',
      borderColor: 'group-hover:border-amber-600/50',
      tags: ['Cloud Native', 'PostgreSQL', 'RBAC', 'AI Copilot'],
    },
  ];

  const categories = ['ALL', 'AI & Spatial UI', 'FinTech Architecture', 'Creative Direction', 'Digital Transformation'];

  const filteredProjects = filter === 'ALL'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="work" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#03050a] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Selected Portfolio
            </div>
            <h2 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-bold text-white tracking-tight">
              PROVEN RESULTS.
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                UNCOMPROMISING FIDELITY.
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  filter === cat
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className={`group relative rounded-3xl p-8 sm:p-10 bg-[#060a14] border border-white/10 ${project.borderColor} transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer`}
              onClick={onOpenInquiry}
            >
              {/* Top ambient hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-amber-400 uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="font-mono text-xs text-zinc-400">{project.year}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-amber-400/80 group-hover:bg-amber-500/10 flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-300 transition-colors" />
                  </div>
                </div>

                <h3 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-amber-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                  {project.description}
                </p>

                {/* Key Impact Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-medium mb-6">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{project.impact}</span>
                </div>
              </div>

              {/* Tags and Client */}
              <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs text-zinc-400">
                  Client: <span className="text-white font-medium">{project.client}</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-400 font-mono text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Box */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0d1424] via-[#101b33] to-[#0d1424] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
              Have an ambitious vision?
            </span>
            <h3 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-white">
              Let's engineer your brand's definitive digital breakthrough.
            </h3>
          </div>
          <button
            onClick={onOpenInquiry}
            className="shrink-0 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold font-mono text-sm tracking-wider uppercase shadow-xl shadow-amber-500/25 transition-all transform hover:scale-105"
          >
            START A PROJECT
          </button>
        </div>
      </div>
    </section>
  );
};
