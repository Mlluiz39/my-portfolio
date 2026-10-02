import React, { useEffect, useRef } from 'react';

export interface BannerSettings {
  haloIntensity: number;
  glowWarmth: number; // 0: golden, 1: deep amber, 2: cosmic solar
  particleCount: number;
  ribbonSpeed: number;
  rotationIntensity: number;
  showCodeStreams: boolean;
}

interface WorkstationCanvasProps {
  settings: BannerSettings;
  interactiveParallax?: boolean;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export const Workstation3DCanvas: React.FC<WorkstationCanvasProps> = ({
  settings,
  interactiveParallax = true,
  onCanvasReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (onCanvasReady) {
      onCanvasReady(canvas);
    }

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Handle high DPI
    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      z: number; // 0 to 1 depth
      size: number;
      alpha: number;
      speedY: number;
      speedX: number;
      orbitAngle: number;
      orbitRadius: number;
      orbitSpeed: number;
      pulse: number;
      pulseSpeed: number;
      type: 'dust' | 'spark' | 'code' | 'star';
      char?: string;
    }

    const codeChars = [
      '01', 'AI', '{ }', 'fx()', '0xFA', '< / >', 'λ', '99.9%',
      'async', 'void', 'const', '=>', '0101', 'scale', 'tensor',
    ];

    const particles: Particle[] = [];
    const baseCount = Math.floor(settings.particleCount * 0.9);

    for (let i = 0; i < baseCount; i++) {
      const typeRoll = Math.random();
      const type = typeRoll > 0.85 ? 'code' : typeRoll > 0.4 ? 'spark' : 'dust';
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        size: type === 'code' ? 10 : Math.random() * 2.8 + 0.8,
        alpha: Math.random() * 0.7 + 0.2,
        speedY: -(Math.random() * 0.6 + 0.2),
        speedX: (Math.random() - 0.5) * 0.4,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitRadius: Math.random() * 240 + 60,
        orbitSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.04 + 0.01,
        type,
        char: codeChars[Math.floor(Math.random() * codeChars.length)],
      });
    }

    // Ribbon flow control points
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas || !interactiveParallax) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.targetX = (clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (clientY / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Warmth colors
    const getWarmthColors = (level: number) => {
      if (level === 0) {
        // Pure gold & champagne
        return {
          glowCenter: 'rgba(255, 215, 120, 0.95)',
          glowMid: 'rgba(235, 160, 45, 0.45)',
          glowOuter: 'rgba(180, 100, 20, 0.12)',
          rim: '#ffca58',
          particlePrimary: 'rgba(255, 220, 140, ',
          particleAccent: 'rgba(255, 160, 50, ',
        };
      } else if (level === 1) {
        // Deep Amber & Ember (matching reference)
        return {
          glowCenter: 'rgba(255, 180, 60, 0.95)',
          glowMid: 'rgba(240, 110, 20, 0.55)',
          glowOuter: 'rgba(180, 50, 10, 0.15)',
          rim: '#ff8a2b',
          particlePrimary: 'rgba(255, 175, 75, ',
          particleAccent: 'rgba(255, 110, 30, ',
        };
      } else {
        // Solar flare / incandescent
        return {
          glowCenter: 'rgba(255, 230, 170, 0.98)',
          glowMid: 'rgba(255, 130, 30, 0.65)',
          glowOuter: 'rgba(200, 60, 15, 0.18)',
          rim: '#ffa439',
          particlePrimary: 'rgba(255, 205, 120, ',
          particleAccent: 'rgba(255, 90, 20, ',
        };
      }
    };

    const render = () => {
      time += 0.016 * settings.ribbonSpeed;

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mx = mouseRef.current.x * settings.rotationIntensity;
      const my = mouseRef.current.y * settings.rotationIntensity;

      // 1. Clear with deep midnight navy-black gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#03050a'); // deep navy-black top-left
      bgGrad.addColorStop(0.4, '#040711');
      bgGrad.addColorStop(0.7, '#070b18'); // subtle dark blue shadow
      bgGrad.addColorStop(1, '#020307');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Deep blue atmospheric shadow radial gradient (top-right & right side depth)
      const blueHaze = ctx.createRadialGradient(
        width * 0.72 + mx * 20,
        height * 0.48 + my * 20,
        50,
        width * 0.72,
        height * 0.48,
        width * 0.6
      );
      blueHaze.addColorStop(0, 'rgba(16, 32, 65, 0.35)');
      blueHaze.addColorStop(0.5, 'rgba(8, 18, 40, 0.2)');
      blueHaze.addColorStop(1, 'rgba(3, 5, 10, 0)');
      ctx.fillStyle = blueHaze;
      ctx.fillRect(0, 0, width, height);

      const colors = getWarmthColors(settings.glowWarmth);

      // 2. ECLIPSE HALO BEHIND WORKSTATION (Right side dominant, inspired by reference image)
      // Subject position centered around x: 72% width, y: 46% height
      const haloX = width * 0.71 + mx * 18;
      const haloY = height * 0.45 + my * 14;
      const haloRadius = Math.min(width, height) * 0.31;

      ctx.save();

      // Atmospheric volumetric background glow
      const outerAtmosphere = ctx.createRadialGradient(
        haloX,
        haloY,
        haloRadius * 0.2,
        haloX,
        haloY,
        haloRadius * 2.3
      );
      outerAtmosphere.addColorStop(0, colors.glowMid);
      outerAtmosphere.addColorStop(0.35, colors.glowOuter);
      outerAtmosphere.addColorStop(0.7, 'rgba(140, 60, 10, 0.04)');
      outerAtmosphere.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.globalAlpha = settings.haloIntensity;
      ctx.fillStyle = outerAtmosphere;
      ctx.fillRect(0, 0, width, height);

      // Volumetric rays radiating from eclipse
      const rayCount = 14;
      for (let r = 0; r < rayCount; r++) {
        const rayAngle = (r / rayCount) * Math.PI * 2 + time * 0.04;
        const rayLength = haloRadius * (1.4 + Math.sin(r * 2.3 + time * 0.8) * 0.3);
        const rayGrad = ctx.createRadialGradient(haloX, haloY, haloRadius * 0.8, haloX, haloY, rayLength);
        rayGrad.addColorStop(0, colors.glowMid);
        rayGrad.addColorStop(1, 'rgba(255, 130, 20, 0)');

        ctx.beginPath();
        ctx.moveTo(haloX, haloY);
        ctx.arc(haloX, haloY, rayLength, rayAngle - 0.07, rayAngle + 0.07);
        ctx.closePath();
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }

      // Main circular glowing rim (The Eclipse Ring)
      // Inner dark void
      ctx.beginPath();
      ctx.arc(haloX, haloY, haloRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#05070e';
      ctx.fill();

      // Eclipse Rim Bloom
      ctx.lineWidth = 4.5;
      ctx.strokeStyle = colors.glowCenter;
      ctx.shadowColor = colors.rim;
      ctx.shadowBlur = 32 * settings.haloIntensity;
      ctx.stroke();

      // Outer secondary soft rim
      ctx.lineWidth = 14;
      ctx.strokeStyle = colors.glowMid;
      ctx.shadowBlur = 55 * settings.haloIntensity;
      ctx.stroke();

      // Subtle corona embers along the rim
      for (let i = 0; i < 28; i++) {
        const angle = (i / 28) * Math.PI * 2 + Math.sin(time + i) * 0.05;
        const dist = haloRadius + (Math.sin(time * 3 + i * 1.5) * 8 + 4);
        const px = haloX + Math.cos(angle) * dist;
        const py = haloY + Math.sin(angle) * dist;
        const pSize = Math.random() * 2.5 + 1.2;

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? colors.rim : '#fff3d1';
        ctx.shadowBlur = 12;
        ctx.fill();
      }

      ctx.restore();

      // 3. FLOWING LUMINOUS GOLDEN DATA STREAMS / ENERGY RIBBONS
      ctx.save();
      const drawEnergyRibbon = (
        yOffset: number,
        amplitude: number,
        frequency: number,
        phase: number,
        strokeWidth: number,
        alpha: number
      ) => {
        ctx.beginPath();
        const startX = width * 0.42;
        const endX = width * 0.98;
        const segments = 45;

        for (let s = 0; s <= segments; s++) {
          const tNorm = s / segments;
          const currX = startX + (endX - startX) * tNorm;
          // Organic curve wrapping around the workstation
          const wave =
            Math.sin(tNorm * Math.PI * 2 * frequency + phase + time) * amplitude *
            Math.sin(tNorm * Math.PI); // taper ends
          const currY =
            height * 0.52 +
            yOffset +
            wave -
            Math.pow(tNorm - 0.5, 2) * 60 +
            my * 20 * (1 - tNorm);

          if (s === 0) {
            ctx.moveTo(currX, currY);
          } else {
            ctx.lineTo(currX, currY);
          }
        }

        const grad = ctx.createLinearGradient(startX, 0, endX, 0);
        grad.addColorStop(0, 'rgba(255, 180, 50, 0)');
        grad.addColorStop(0.3, colors.particleAccent + (alpha * 0.8) + ')');
        grad.addColorStop(0.65, colors.particlePrimary + alpha + ')');
        grad.addColorStop(1, 'rgba(255, 120, 20, 0)');

        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = grad;
        ctx.shadowColor = colors.rim;
        ctx.shadowBlur = 18;
        ctx.stroke();
      };

      drawEnergyRibbon(-70, 42, 1.2, 0, 2.5, 0.75);
      drawEnergyRibbon(-20, 55, 1.6, 2.1, 3.2, 0.9);
      drawEnergyRibbon(40, 38, 1.1, 4.2, 2.0, 0.65);
      drawEnergyRibbon(85, 48, 1.4, 1.2, 1.8, 0.5);
      ctx.restore();

      // 4. REFLECTIVE STUDIO SURFACE / DESK BASE (Cinematic reflections)
      const deskY = height * 0.68;
      const deskHeight = height * 0.32;
      const surfaceGrad = ctx.createLinearGradient(0, deskY, 0, height);
      surfaceGrad.addColorStop(0, 'rgba(12, 18, 32, 0.7)');
      surfaceGrad.addColorStop(0.3, 'rgba(7, 10, 20, 0.95)');
      surfaceGrad.addColorStop(1, '#020306');

      ctx.fillStyle = surfaceGrad;
      ctx.fillRect(0, deskY, width, deskHeight);

      // Subtle horizontal surface horizon line & light reflection
      ctx.save();
      const horizonGlow = ctx.createLinearGradient(width * 0.35, deskY, width * 0.95, deskY);
      horizonGlow.addColorStop(0, 'rgba(255, 160, 50, 0)');
      horizonGlow.addColorStop(0.5, 'rgba(255, 180, 70, 0.3)');
      horizonGlow.addColorStop(0.8, 'rgba(255, 140, 40, 0.5)');
      horizonGlow.addColorStop(1, 'rgba(255, 160, 50, 0)');
      ctx.strokeStyle = horizonGlow;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = colors.rim;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(width * 0.3, deskY);
      ctx.lineTo(width, deskY);
      ctx.stroke();
      ctx.restore();

      // 5. 3D SLEEK MODERN WORKSTATION / LAPTOP (Isometric 3D perspective on the right)
      ctx.save();
      const wsX = width * 0.71 + mx * 28;
      const wsY = height * 0.53 + my * 20;
      const scale = Math.min(width / 1300, 1.2) * (width < 768 ? 0.75 : 1.05);

      ctx.translate(wsX, wsY);

      // Floating gentle hover animation
      const hoverY = Math.sin(time * 1.5) * 6;
      ctx.translate(0, hoverY);

      // --- Reflective Surface Shadow beneath workstation ---
      ctx.beginPath();
      ctx.ellipse(0, 130 * scale, 220 * scale, 38 * scale, 0, 0, Math.PI * 2);
      const shadowGrad = ctx.createRadialGradient(0, 130 * scale, 20, 0, 130 * scale, 220 * scale);
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      shadowGrad.addColorStop(0.5, 'rgba(20, 10, 5, 0.4)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.fill();

      // --- LAPTOP KEYBOARD BASE (Perspective base plate) ---
      // 3D angles: tilted slightly toward viewer and left
      const bW = 280 * scale;
      const bD = 135 * scale;
      const bH = 14 * scale;

      // Base top polygon
      const p1 = { x: -bW * 0.85, y: 35 * scale };
      const p2 = { x: bW * 0.75, y: 15 * scale };
      const p3 = { x: bW * 0.95, y: 15 * scale + bD };
      const p4 = { x: -bW * 0.65, y: 35 * scale + bD };

      // Base extrusion thickness (front and side rim)
      ctx.beginPath();
      ctx.moveTo(p4.x, p4.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p3.x, p3.y + bH);
      ctx.lineTo(p4.x, p4.y + bH);
      ctx.closePath();
      const frontEdgeGrad = ctx.createLinearGradient(p4.x, p4.y, p3.x, p3.y);
      frontEdgeGrad.addColorStop(0, '#10141f');
      frontEdgeGrad.addColorStop(0.4, '#1b2336');
      frontEdgeGrad.addColorStop(0.7, '#2a354f');
      frontEdgeGrad.addColorStop(1, '#10141f');
      ctx.fillStyle = frontEdgeGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 180, 80, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Left edge extrusion
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.lineTo(p4.x, p4.y + bH);
      ctx.lineTo(p1.x, p1.y + bH);
      ctx.closePath();
      ctx.fillStyle = '#0c0f17';
      ctx.fill();

      // Top surface of base
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      const baseTopGrad = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
      baseTopGrad.addColorStop(0, '#0e1320');
      baseTopGrad.addColorStop(0.5, '#161c2d');
      baseTopGrad.addColorStop(1, '#0b0f19');
      ctx.fillStyle = baseTopGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(80, 110, 170, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Keyboard & Trackpad depression on base
      ctx.save();
      const kbInset = 0.8;
      ctx.beginPath();
      ctx.moveTo(p1.x * 0.75 + p2.x * 0.25, p1.y * 0.75 + p2.y * 0.25 + 10 * scale);
      ctx.lineTo(p1.x * 0.25 + p2.x * 0.75, p1.y * 0.25 + p2.y * 0.75 + 10 * scale);
      ctx.lineTo(p4.x * 0.35 + p3.x * 0.65, p4.y * 0.35 + p3.y * 0.65 - 35 * scale);
      ctx.lineTo(p4.x * 0.75 + p3.x * 0.25, p4.y * 0.75 + p3.y * 0.25 - 35 * scale);
      ctx.closePath();
      ctx.fillStyle = '#090c13';
      ctx.fill();

      // Keyboard backlight warm glow
      ctx.strokeStyle = 'rgba(255, 170, 60, 0.25)';
      ctx.shadowColor = colors.rim;
      ctx.shadowBlur = 12;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sleek Trackpad
      ctx.beginPath();
      ctx.moveTo(p4.x * 0.55 + p3.x * 0.45 - 28 * scale, p4.y * 0.7 + p1.y * 0.3 + 12 * scale);
      ctx.lineTo(p4.x * 0.45 + p3.x * 0.55 + 28 * scale, p4.y * 0.7 + p2.y * 0.3 + 12 * scale);
      ctx.lineTo(p4.x * 0.45 + p3.x * 0.55 + 32 * scale, p4.y * 0.95 + p2.y * 0.05 - 6 * scale);
      ctx.lineTo(p4.x * 0.55 + p3.x * 0.45 - 32 * scale, p4.y * 0.95 + p1.y * 0.05 - 6 * scale);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(150, 180, 240, 0.3)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();

      // --- LAPTOP DISPLAY SCREEN (Sleek upright bezel + futuristic holographic display) ---
      const sW = 270 * scale;
      const sH = 195 * scale;

      // Screen four corners in perspective (slightly angled back and toward right)
      const s1 = { x: -sW * 0.85, y: -sH + 20 * scale }; // top-left
      const s2 = { x: sW * 0.75, y: -sH * 1.05 };       // top-right
      const s3 = { x: p2.x, y: p2.y };                  // bottom-right (hinge)
      const s4 = { x: p1.x, y: p1.y };                  // bottom-left (hinge)

      // Screen back/lid thickness bevel
      ctx.beginPath();
      ctx.moveTo(s1.x - 4 * scale, s1.y - 3 * scale);
      ctx.lineTo(s2.x + 3 * scale, s2.y - 3 * scale);
      ctx.lineTo(s3.x + 3 * scale, s3.y);
      ctx.lineTo(s4.x - 4 * scale, s4.y);
      ctx.closePath();
      ctx.fillStyle = '#06080e';
      ctx.fill();

      // Screen Outer Bezel
      ctx.beginPath();
      ctx.moveTo(s1.x, s1.y);
      ctx.lineTo(s2.x, s2.y);
      ctx.lineTo(s3.x, s3.y);
      ctx.lineTo(s4.x, s4.y);
      ctx.closePath();
      const bezelGrad = ctx.createLinearGradient(s1.x, s1.y, s3.x, s3.y);
      bezelGrad.addColorStop(0, '#101522');
      bezelGrad.addColorStop(0.5, '#1e263c');
      bezelGrad.addColorStop(1, '#0e121b');
      ctx.fillStyle = bezelGrad;
      ctx.fill();

      // Rim light on the screen edges (illuminated by the amber eclipse behind it!)
      ctx.strokeStyle = colors.rim;
      ctx.shadowColor = colors.rim;
      ctx.shadowBlur = 18;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Inner Active OLED Screen Area
      const pad = 12 * scale;
      const scr1 = { x: s1.x + pad, y: s1.y + pad };
      const scr2 = { x: s2.x - pad, y: s2.y + pad };
      const scr3 = { x: s3.x - pad, y: s3.y - pad };
      const scr4 = { x: s4.x + pad, y: s4.y - pad };

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(scr1.x, scr1.y);
      ctx.lineTo(scr2.x, scr2.y);
      ctx.lineTo(scr3.x, scr3.y);
      ctx.lineTo(scr4.x, scr4.y);
      ctx.closePath();
      ctx.clip();

      // Screen interior background: deep oceanic navy with glowing code & architectural waves
      const screenBg = ctx.createLinearGradient(scr1.x, scr1.y, scr3.x, scr3.y);
      screenBg.addColorStop(0, '#060c18');
      screenBg.addColorStop(0.5, '#0b162c');
      screenBg.addColorStop(1, '#070d19');
      ctx.fillStyle = screenBg;
      ctx.fill();

      // Futuristic holographic UI inside the screen
      // Top bar dots
      ctx.fillStyle = 'rgba(255, 140, 40, 0.8)';
      ctx.beginPath();
      ctx.arc(scr1.x + 14 * scale, scr1.y + 12 * scale, 3 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 200, 80, 0.7)';
      ctx.beginPath();
      ctx.arc(scr1.x + 24 * scale, scr1.y + 12 * scale, 3 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(100, 220, 180, 0.6)';
      ctx.beginPath();
      ctx.arc(scr1.x + 34 * scale, scr1.y + 12 * scale, 3 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Live 3D Holographic Graph / Neural Mesh on screen
      ctx.strokeStyle = 'rgba(255, 180, 70, 0.4)';
      ctx.lineWidth = 1.2;
      for (let w = 0; w < 5; w++) {
        ctx.beginPath();
        const waveYBase = scr1.y * 0.5 + scr4.y * 0.5 + (w - 2) * 16 * scale;
        for (let step = 0; step <= 20; step++) {
          const u = step / 20;
          const px = scr1.x * (1 - u) + scr2.x * u;
          const py = waveYBase + Math.sin(u * Math.PI * 3 + time * 2 + w) * 14 * scale;
          if (step === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Code text lines on screen
      ctx.font = `${Math.max(9, Math.floor(10 * scale))}px "JetBrains Mono", monospace`;
      ctx.fillStyle = 'rgba(255, 210, 120, 0.85)';
      ctx.fillText('const agency = new DigitalStudio();', scr1.x + 18 * scale, scr1.y + 38 * scale);
      ctx.fillStyle = 'rgba(160, 205, 255, 0.75)';
      ctx.fillText('await agency.transform({ ai: true });', scr1.x + 18 * scale, scr1.y + 54 * scale);
      ctx.fillStyle = 'rgba(255, 140, 50, 0.9)';
      ctx.fillText('// HIGH-PERFORMANCE WEB ARCHITECTURE', scr1.x + 18 * scale, scr1.y + 70 * scale);

      // Glass reflection diagonal sheen
      const glassSheen = ctx.createLinearGradient(scr1.x, scr1.y, scr2.x, scr4.y);
      glassSheen.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      glassSheen.addColorStop(0.3, 'rgba(255, 255, 255, 0.03)');
      glassSheen.addColorStop(0.7, 'rgba(255, 200, 100, 0.08)');
      glassSheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glassSheen;
      ctx.fill();

      ctx.restore(); // restore clip

      // Golden Anamorphic Flares projecting outward from screen corners
      ctx.save();
      const flareGrad = ctx.createRadialGradient(scr2.x, scr2.y, 2, scr2.x, scr2.y, 80 * scale);
      flareGrad.addColorStop(0, 'rgba(255, 230, 160, 0.9)');
      flareGrad.addColorStop(0.4, 'rgba(255, 140, 30, 0.4)');
      flareGrad.addColorStop(1, 'rgba(255, 100, 20, 0)');
      ctx.fillStyle = flareGrad;
      ctx.beginPath();
      ctx.arc(scr2.x, scr2.y, 80 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore(); // restore workstation transform

      // 6. FLOATING AMBER PARTICLES & CODE GEOMETRY (Depth layers)
      ctx.save();
      particles.forEach((p) => {
        // Update positions
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;

        // Wrap around
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        // Orbit swirl around the workstation
        p.orbitAngle += p.orbitSpeed;
        const orbitInfluence = (1 - p.z) * 0.4;
        const currentX = p.x + Math.cos(p.orbitAngle) * (p.orbitRadius * orbitInfluence);
        const currentY = p.y + Math.sin(p.orbitAngle) * (p.orbitRadius * orbitInfluence * 0.4);

        const currentAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);

        if (p.type === 'code' && settings.showCodeStreams) {
          // Floating syntax tokens in deep amber & gold
          ctx.font = `600 ${Math.floor(p.size * (1 + (1 - p.z) * 0.4))}px "JetBrains Mono", monospace`;
          ctx.fillStyle = colors.particlePrimary + (currentAlpha * 0.9) + ')';
          ctx.shadowColor = colors.rim;
          ctx.shadowBlur = 10;
          ctx.fillText(p.char || '01', currentX, currentY);
        } else if (p.type === 'spark') {
          // Sharp amber sparks
          ctx.beginPath();
          ctx.arc(currentX, currentY, p.size * (1 - p.z * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = colors.particleAccent + currentAlpha + ')';
          ctx.shadowColor = colors.rim;
          ctx.shadowBlur = 14;
          ctx.fill();

          // Spark micro-tail
          ctx.strokeStyle = colors.particlePrimary + (currentAlpha * 0.5) + ')';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(currentX, currentY);
          ctx.lineTo(currentX - p.speedX * 4, currentY - p.speedY * 5);
          ctx.stroke();
        } else {
          // Soft golden bokeh dust
          ctx.beginPath();
          ctx.arc(currentX, currentY, p.size * (1 + p.z * 1.5), 0, Math.PI * 2);
          ctx.fillStyle = colors.particlePrimary + (currentAlpha * 0.6) + ')';
          ctx.shadowBlur = 0;
          ctx.fill();
        }
      });
      ctx.restore();

      // 7. CINEMATIC VIGNETTE & FILM ATMOSPHERE
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.35,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(0.65, 'rgba(2, 4, 8, 0.4)');
      vignette.addColorStop(1, 'rgba(1, 2, 5, 0.85)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Clean negative space feathering on the left side (ensures crystal clear readability for headlines)
      const leftNegativeSpaceHaze = ctx.createLinearGradient(0, 0, width * 0.55, 0);
      leftNegativeSpaceHaze.addColorStop(0, 'rgba(3, 5, 11, 0.85)');
      leftNegativeSpaceHaze.addColorStop(0.6, 'rgba(4, 7, 14, 0.5)');
      leftNegativeSpaceHaze.addColorStop(1, 'rgba(4, 7, 14, 0)');
      ctx.fillStyle = leftNegativeSpaceHaze;
      ctx.fillRect(0, 0, width * 0.55, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [settings, interactiveParallax, onCanvasReady]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ display: 'block' }}
    />
  );
};
