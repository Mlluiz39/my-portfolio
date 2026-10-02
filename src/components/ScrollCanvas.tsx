import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const FRAME_COUNT = 300;

function getFrameUrl(index: number): string {
  const padded = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${padded}.jpg`;
}

export const ScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);

    let currentProgress = 0;
    let targetProgress = 0;
    let lastDrawnIndex = -1;
    let animId: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      lastDrawnIndex = -1;
      draw(currentProgress);
    };

    const drawFrame = (img: HTMLImageElement) => {
      if (!img || !img.complete) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1280;
      const ih = img.naturalHeight || 720;

      const imgRatio = iw / ih;
      const canvasRatio = cw / ch;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
        drawX = 0;
        drawY = (ch - drawH) / 2;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
        drawX = (cw - drawW) / 2;
        drawY = 0;
      }

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    const getNearestLoadedImage = (targetIndex: number): HTMLImageElement | null => {
      if (loaded[targetIndex] && images[targetIndex]) {
        return images[targetIndex];
      }

      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        const prev = targetIndex - offset;
        if (prev >= 0 && loaded[prev] && images[prev]) {
          return images[prev];
        }
        const next = targetIndex + offset;
        if (next < FRAME_COUNT && loaded[next] && images[next]) {
          return images[next];
        }
      }

      return images[0] || null;
    };

    const draw = (progress: number) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))
      );

      if (frameIndex === lastDrawnIndex) return;

      const imgToDraw = getNearestLoadedImage(frameIndex);
      if (imgToDraw && imgToDraw.complete) {
        drawFrame(imgToDraw);
        lastDrawnIndex = frameIndex;
      }
    };

    // Preload all frames
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    images[0] = firstImg;
    firstImg.onload = () => {
      loaded[0] = true;
      resize();
    };

    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      images[i] = img;
      img.onload = () => {
        loaded[i] = true;
        if (Math.round(currentProgress * (FRAME_COUNT - 1)) === i) {
          lastDrawnIndex = -1;
          draw(currentProgress);
        }
      };
    }

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        targetProgress = 0;
      } else {
        targetProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      }
    };

    const animate = () => {
      const delta = targetProgress - currentProgress;
      if (Math.abs(delta) > 0.0001) {
        currentProgress += delta * 0.085;
        draw(currentProgress);
      } else if (currentProgress !== targetProgress) {
        currentProgress = targetProgress;
        draw(currentProgress);
      }
      animId = requestAnimationFrame(animate);
    };

    // Setup Lenis for smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', () => {
      updateScroll();
    });

    let lenisRafId: number;
    const lenisRaf = (time: number) => {
      lenis.raf(time);
      lenisRafId = requestAnimationFrame(lenisRaf);
    };
    lenisRafId = requestAnimationFrame(lenisRaf);

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateScroll, { passive: true });

    resize();
    updateScroll();
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateScroll);
      cancelAnimationFrame(animId);
      cancelAnimationFrame(lenisRafId);
      lenis.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="scroll-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: 'block' }}
    />
  );
};
