import React from 'react';
import { Sliders, Eye, EyeOff, Download, Sparkles, Sun, RefreshCw, Zap, Compass } from 'lucide-react';
import { BannerSettings } from './Workstation3DCanvas';

interface BannerDirectorPanelProps {
  settings: BannerSettings;
  onUpdateSettings: (newSettings: Partial<BannerSettings>) => void;
  showUiOverlay: boolean;
  onToggleUiOverlay: () => void;
  onExportBanner: () => void;
  aspectRatioMode: '16:9' | 'full' | '21:9';
  onChangeAspectRatio: (mode: '16:9' | 'full' | '21:9') => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export const BannerDirectorPanel: React.FC<BannerDirectorPanelProps> = ({
  settings,
  onUpdateSettings,
  showUiOverlay,
  onToggleUiOverlay,
  onExportBanner,
  aspectRatioMode,
  onChangeAspectRatio,
  isExpanded,
  onToggleExpanded,
}) => {
  return (
    <aside aria-label="Banner studio controls" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Expanded Control Studio Panel */}
      {isExpanded && (
        <div 
          className="w-80 sm:w-96 bg-[#060a14]/95 backdrop-blur-2xl border border-amber-500/30 rounded-2xl p-5 shadow-2xl shadow-black/80 text-white animate-in slide-in-from-bottom-5 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                Banner Studio & Visual Controls
              </span>
            </div>
            <button
              onClick={() => onUpdateSettings({
                haloIntensity: 1.0,
                glowWarmth: 1,
                particleCount: 120,
                ribbonSpeed: 1.0,
                rotationIntensity: 1.0,
                showCodeStreams: true,
              })}
              title="Reset to Reference Defaults"
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Quick Mode Toggles */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onToggleUiOverlay}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border font-medium transition-all ${
                  !showUiOverlay
                    ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                }`}
              >
                {!showUiOverlay ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showUiOverlay ? 'Hide UI (Clean Banner)' : 'Pristine Mode Active'}</span>
              </button>

              <button
                onClick={onExportBanner}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold border border-amber-400/50 shadow-lg shadow-amber-500/20 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export 16:9 Banner</span>
              </button>
            </div>

            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5 flex items-center justify-between">
                <span>Banner Frame Aspect Ratio</span>
                <span className="text-amber-400">{aspectRatioMode}</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
                {(['16:9', '21:9', 'full'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => onChangeAspectRatio(mode)}
                    className={`py-1.5 rounded-lg text-center font-mono font-medium transition-all ${
                      aspectRatioMode === mode
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {mode === 'full' ? 'Responsive' : mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Warmth */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5 flex items-center justify-between">
                <span>Color Palette & Warmth</span>
                <span className="text-amber-400">
                  {settings.glowWarmth === 0 ? 'Champagne Gold' : settings.glowWarmth === 1 ? 'Deep Amber (Ref)' : 'Solar Ember'}
                </span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 0, label: 'Gold', color: 'bg-amber-200' },
                  { id: 1, label: 'Amber (Ref)', color: 'bg-orange-500' },
                  { id: 2, label: 'Solar', color: 'bg-amber-600' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onUpdateSettings({ glowWarmth: item.id })}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg border text-[11px] transition-all ${
                      settings.glowWarmth === item.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
                  <span>Eclipse Halo Volumetric Glow</span>
                  <span className="text-amber-300">{Math.round(settings.haloIntensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="1.8"
                  step="0.05"
                  value={settings.haloIntensity}
                  onChange={(e) => onUpdateSettings({ haloIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
                  <span>Luminous Ribbon Flow Velocity</span>
                  <span className="text-amber-300">{settings.ribbonSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.1"
                  value={settings.ribbonSpeed}
                  onChange={(e) => onUpdateSettings({ ribbonSpeed: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
                  <span>Amber Dust & Code Particle Density</span>
                  <span className="text-amber-300">{settings.particleCount}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="220"
                  step="10"
                  value={settings.particleCount}
                  onChange={(e) => onUpdateSettings({ particleCount: parseInt(e.target.value) })}
                  className="w-full accent-amber-500 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
                  <span>Workstation Parallax Tilt Sensitivity</span>
                  <span className="text-amber-300">{settings.rotationIntensity.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.1"
                  value={settings.rotationIntensity}
                  onChange={(e) => onUpdateSettings({ rotationIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Checkbox code streams */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400">Glowing Digital Code Streams</span>
              <button
                onClick={() => onUpdateSettings({ showCodeStreams: !settings.showCodeStreams })}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  settings.showCodeStreams ? 'bg-amber-500' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.showCodeStreams ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Pill Bar */}
      <div className="flex items-center gap-2 bg-[#060a14]/90 backdrop-blur-xl border border-amber-500/30 p-1.5 rounded-full shadow-xl shadow-black/70">
        <button
          onClick={onToggleUiOverlay}
          title={showUiOverlay ? 'Clean Banner View (Hide UI)' : 'Show Full Website UI'}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
            !showUiOverlay
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
              : 'text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {!showUiOverlay ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showUiOverlay ? 'Clean Banner' : 'Show UI'}</span>
        </button>

        <button
          onClick={onExportBanner}
          title="Download Pristine 16:9 Banner Image (PNG)"
          className="p-2 text-amber-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleExpanded}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
            isExpanded
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-white/5 text-zinc-200 hover:bg-white/10'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span>Director</span>
        </button>
      </div>
    </aside>
  );
};
