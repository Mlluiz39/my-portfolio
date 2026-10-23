import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useSmoothScroll';

const FRAME_COUNT = 300;

// How many frames on each side of the current one to keep prefetched.
// Total in flight is roughly WINDOW * 2 + lookahead. This is what keeps the
// page from downloading all 300 frames (11 MB) up front.
const WINDOW = 20;
// A slight bias towards the scroll direction feels more responsive.
const LOOKAHEAD = 10;

function getFrameUrl(index: number): string {
  const padded = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${padded}.jpg`;
}

export const ScrollCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reducedMotion = prefersReducedMotion();

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);

    let currentProgress = 0;
    let targetProgress = 0;
    let currentIndex = 0;
    let lastDrawnIndex = -1;
    let lastDirection = 1;
    let animId = 0;
    let retryTimer = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      lastDrawnIndex = -1;
      draw(currentProgress);
    };

    const drawFrame = (img: HTMLImageElement) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

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

    const loadFrame = (index: number, onLoaded?: () => void) => {
      if (index < 0 || index >= FRAME_COUNT) return;
      if (images[index]) return; // already requested

      const img = new Image();
      images[index] = img;
      img.onload = () => {
        loaded[index] = true;
        // If this frame is the one we're waiting on, repaint immediately.
        if (index === currentIndex) {
          lastDrawnIndex = -1;
          draw(currentProgress);
        }
        onLoaded?.();
      };
      img.onerror = () => {
        // Release the slot so it can be retried on a later tick.
        images[index] = undefined as unknown as HTMLImageElement;
      };
      img.src = getFrameUrl(index);
    };

    // Keep only a sliding window of frames around the current index in flight.
    const updateWindow = (index: number, direction: number) => {
      const back = WINDOW;
      const ahead = WINDOW + (direction >= 0 ? LOOKAHEAD : 0);
      const from = Math.max(0, index - back);
      const to = Math.min(FRAME_COUNT - 1, index + ahead);

      // Kick off loads in the direction of travel, starting nearest first.
      if (direction >= 0) {
        for (let i = index; i <= to; i++) loadFrame(i);
        for (let i = index - 1; i >= from; i--) loadFrame(i);
      } else {
        for (let i = index; i >= from; i--) loadFrame(i);
        for (let i = index + 1; i <= to; i++) loadFrame(i);
      }
    };

    // Retry any frame that is in the window but failed / is not yet loaded.
    // This keeps the current window self-healing without reloading old frames.
    const ensureWindowLoaded = () => {
      const from = Math.max(0, currentIndex - WINDOW);
      const to = Math.min(FRAME_COUNT - 1, currentIndex + WINDOW + LOOKAHEAD);
      for (let i = from; i <= to; i++) {
        if (!loaded[i] && !images[i]) loadFrame(i);
      }
    };

    const draw = (progress: number) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))
      );

      if (frameIndex === lastDrawnIndex) return;

      const imgToDraw = getNearestLoadedImage(frameIndex);
      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        drawFrame(imgToDraw);
        lastDrawnIndex = frameIndex;
      }
    };

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = maxScroll <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const animate = () => {
      const delta = targetProgress - currentProgress;
      // Snap to the target immediately for users who opt out of motion.
      const ease = reducedMotion ? 1 : 0.085;
      if (Math.abs(delta) > 0.0001) {
        currentProgress += delta * ease;
      } else if (currentProgress !== targetProgress) {
        currentProgress = targetProgress;
      } else {
        animId = requestAnimationFrame(animate);
        return;
      }

      const nextIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(currentProgress * (FRAME_COUNT - 1)))
      );
      const direction = nextIndex >= currentIndex ? 1 : -1;
      if (direction !== lastDirection || nextIndex !== currentIndex) {
        lastDirection = direction;
        currentIndex = nextIndex;
        updateWindow(currentIndex, direction);
      }

      draw(currentProgress);
      animId = requestAnimationFrame(animate);
    };

    // Load the opening frames right away so the hero is never blank.
    loadFrame(0, () => {
      lastDrawnIndex = -1;
      resize();
      updateWindow(0, 1);
    });

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateScroll, { passive: true });

    // Periodically heal the window in case some frames failed to load.
    retryTimer = window.setInterval(ensureWindowLoaded, 1500);

    resize();
    updateScroll();
    updateWindow(0, 1);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateScroll);
      cancelAnimationFrame(animId);
      window.clearInterval(retryTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="scroll-canvas"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: 'block' }}
    />
  );
};
