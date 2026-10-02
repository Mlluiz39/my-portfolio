import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(24);
  const [activeSegment, setActiveSegment] = useState(0);

  const segments = [
    { title: '01. Neural AI Infrastructure', brand: 'Vertex Technologies', duration: '0:42' },
    { title: '02. Immersive 3D Spacecraft UI', brand: 'AeroDynamics Global', duration: '1:15' },
    { title: '03. WebGL FinTech Architecture', brand: 'Krypton Protocol', duration: '1:48' },
    { title: '04. Luxury Spatial Experience', brand: 'Vanguard Studios', duration: '2:10' },
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-5xl bg-[#070b14] border border-amber-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#05070e]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
              AURA Cinematic Showreel 2026 • 4K HDR
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video simulation viewport */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-[#060a15] via-[#091122] to-[#03050a] flex items-center justify-center overflow-hidden">
          {/* Animated background waves and golden light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,40,0.18)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 text-center px-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLAGSHIP DIRECTION & DIGITAL CRAFT</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
              {segments[activeSegment].title}
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base font-light mb-6">
              Client: <span className="text-amber-300 font-medium">{segments[activeSegment].brand}</span> • High-Performance WebGL & AI Digital Experience
            </p>

            {/* Simulated Live Audio Spectrum Bars */}
            <div className="flex items-center justify-center gap-1.5 h-12 mb-6">
              {[40, 75, 90, 50, 100, 65, 85, 30, 95, 70, 45, 80, 60, 90, 35].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-amber-600 to-amber-300 rounded-full transition-all duration-150"
                  style={{
                    height: isPlaying ? `${Math.max(12, (h * (progress % 20 + 10)) / 25)}px` : '8px',
                    opacity: isPlaying ? 0.9 : 0.3,
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
              <span>{isPlaying ? 'PAUSE REEL' : 'PLAY REEL'}</span>
            </button>
          </div>

          {/* Timeline progress overlay */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            {/* Progress bar */}
            <div className="relative w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-3 cursor-pointer">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-amber-400 transition-colors">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsMuted(!isMuted)} className="hover:text-amber-400 transition-colors">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span>01:14 / 02:45</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 hidden sm:inline">STEREO 48kHz • 60FPS</span>
                <Maximize2 className="w-4 h-4 text-zinc-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Chapters selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-[#050810] border-t border-white/5">
          {segments.map((seg, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSegment(idx);
                setProgress((idx * 25) + 5);
              }}
              className={`p-3 rounded-lg text-left transition-all border ${
                activeSegment === idx
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                  : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase text-zinc-500">Chapter {idx + 1}</span>
                <span className="font-mono text-[10px] text-zinc-500">{seg.duration}</span>
              </div>
              <p className="text-xs font-semibold truncate text-white">{seg.title.replace(/^\d+\.\s*/, '')}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
