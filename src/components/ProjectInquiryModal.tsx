import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, Code2, Globe, Cpu, ArrowRight } from 'lucide-react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('Digital Transformation & Web Architecture');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$25,000 - $50,000',
    timeline: '1-3 months',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after success
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  const services = [
    { title: 'Digital Transformation & Web Architecture', icon: Globe },
    { title: 'AI Engineering & Next-Gen Systems', icon: Cpu },
    { title: 'Creative Direction & 3D Spatial UI', icon: Sparkles },
    { title: 'Full-Stack Performance Engineering', icon: Code2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#070b14] border border-amber-500/25 rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#05070e]">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Direct Inquiry
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Let's Engineer Your Digital Vision</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Inquiry Dispatched</h4>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              Thank you for reaching out. Our engineering and design leadership team will review your requirements and respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Select Strategic Domain
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = selectedService === item.title;
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedService(item.title)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300 shadow-sm shadow-amber-500/20'
                          : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`} />
                      <span className="font-medium line-clamp-1">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova, Vertex Lab"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Direct Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Investment Scope
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090e1a] border border-white/10 text-white text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                >
                  <option value="$15,000 - $25,000">$15,000 - $25,000</option>
                  <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                  <option value="$50,000 - $100,000+">$50,000 - $100,000+</option>
                  <option value="Enterprise Advisory">Enterprise Advisory / Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Target Launch Horizon
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090e1a] border border-white/10 text-white text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                >
                  <option value="Immediate (< 4 weeks)">Immediate (&lt; 4 weeks)</option>
                  <option value="1-3 months">1 - 3 months</option>
                  <option value="Q3/Q4 Strategic Launch">Q3/Q4 Strategic Launch</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Project Scope / Key Objectives
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe the product, brand vision, or engineering challenge..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-500 font-mono">
                Encrypted & NDA Protected
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all transform hover:scale-[1.02]"
              >
                <span>SEND INQUIRY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
