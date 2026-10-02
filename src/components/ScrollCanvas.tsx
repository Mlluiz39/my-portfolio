import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const FRAME_COUNT = 300;

function getFrameUrl(index: number, mobile: boolean): string {
  const padded = String(index + 1).padStart(3, '0');
  return mobile
    ? `/frames/mobile/ezgif-frame-${padded}.webp`
    : `/frames/ezgif-frame-${padded}.jpg`;
}

export const ScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);

    let targetProgress = 0;
    let lastDrawnIndex = -1;
    let animId: number;
    let disposed = false;
    let activeLoads = 0;
    let firstFrameReady = false;
    const pending = new Set<number>();
    const failed = new Set<number>();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      lastDrawnIndex = -1;
      draw(targetProgress);
    };

    const drawFrame = (img: HTMLImageElement) => {
      if (!img || !img.complete || !img.naturalWidth) return;

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

      return null;
    };

    const draw = (progress: number) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))
      );

      if (frameIndex === lastDrawnIndex) return;

      const imgToDraw = getNearestLoadedImage(frameIndex);
      if (imgToDraw && imgToDraw.complete) {
        const loadedIndex = images.indexOf(imgToDraw);
        if (loadedIndex === lastDrawnIndex) return;
        drawFrame(imgToDraw);
        lastDrawnIndex = loadedIndex;
      }
    };

    // Fetch only nearby frames, prioritizing the current scroll position.
    const loadNearbyFrames = () => {
      if (disposed) return;
      const center = Math.round(targetProgress * (FRAME_COUNT - 1));
      const candidates = [center];
      for (let offset = 1; offset <= 8; offset++) {
        candidates.push(center + offset, center - offset);
      }
      for (const index of candidates) {
        if (activeLoads >= 4) break;
        if (index < 0 || index >= FRAME_COUNT || loaded[index] || pending.has(index) || failed.has(index)) continue;
        const img = new Image();
        images[index] = img;
        pending.add(index);
        activeLoads++;
        img.decoding = 'async';
        const finish = (success: boolean) => {
          if (disposed) return;
          pending.delete(index);
          activeLoads--;
          loaded[index] = success;
          if (!success) failed.add(index);
          draw(targetProgress);
          // Release distant decoded images while keeping the displayed fallback.
          const currentCenter = Math.round(targetProgress * (FRAME_COUNT - 1));
          for (let i = 0; i < FRAME_COUNT; i++) {
            if (Math.abs(i - currentCenter) > 20 && i !== lastDrawnIndex && !pending.has(i)) {
              delete images[i];
              loaded[i] = false;
            }
          }
          loadNearbyFrames();
        };
        img.onload = () => finish(true);
        img.onerror = () => finish(false);
        img.src = getFrameUrl(index, mobile);
      }
    };

    // Give the first visible frame priority before starting background requests.
    const firstImg = new Image();
    images[0] = firstImg;
    firstImg.fetchPriority = 'high';
    firstImg.decoding = 'async';
    firstImg.onload = () => {
      if (disposed) return;
      loaded[0] = true;
      firstFrameReady = true;
      resize();
      loadNearbyFrames();
    };
    firstImg.onerror = () => {
      if (disposed) return;
      failed.add(0);
      firstFrameReady = true;
      loadNearbyFrames();
    };
    firstImg.src = getFrameUrl(0, mobile);

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        targetProgress = 0;
      } else {
        targetProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      }
      if (firstFrameReady) loadNearbyFrames();
    };

    // Setup Lenis for smooth momentum scrolling
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', () => {
      updateScroll();
    });

    // One animation loop; draw only when the visible frame changes.
    const animate = (time: number) => {
      if (!document.hidden) {
        lenis.raf(time);
        draw(targetProgress);
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateScroll, { passive: true });

    resize();
    updateScroll();
    animId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      for (const img of images) {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      }
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateScroll);
      cancelAnimationFrame(animId);
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
