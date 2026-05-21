import { useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Scroll-linked image sequence on a canvas (scrubs forward/back with scroll).
 */
export function useScrollFrameScrub(
  trackRef,
  frameUrls,
  { fit = "contain", offset = ["start start", "end end"] } = {}
) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const readyRef = useRef(false);
  const frameIndexRef = useRef(0);
  const reducedMotion = prefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset,
  });

  const drawFrame = useCallback(
    (index) => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || !images.length) return;

      const clamped = Math.max(0, Math.min(index, images.length - 1));
      const img = images[clamped];
      if (!img?.complete || !img.naturalWidth) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width: cw, height: ch } = canvas.getBoundingClientRect();
      if (!cw || !ch) return;

      const w = Math.round(cw * dpr);
      const h = Math.round(ch * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);
      const scale =
        fit === "cover"
          ? Math.max(w / img.naturalWidth, h / img.naturalHeight)
          : Math.min(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
      frameIndexRef.current = clamped;
    },
    [fit]
  );

  useEffect(() => {
    if (!frameUrls?.length) return;

    let cancelled = false;
    readyRef.current = false;

    const loadAll = frameUrls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = src;
        })
    );

    Promise.all(loadAll).then((loaded) => {
      if (cancelled) return;
      imagesRef.current = loaded.filter(Boolean);
      readyRef.current = imagesRef.current.length > 0;
      drawFrame(reducedMotion ? 0 : frameIndexRef.current);
    });

    return () => {
      cancelled = true;
    };
  }, [frameUrls, drawFrame, reducedMotion]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reducedMotion || !imagesRef.current.length) return;
    const idx = Math.round(progress * (imagesRef.current.length - 1));
    requestAnimationFrame(() => drawFrame(idx));
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ro = new ResizeObserver(() => {
      drawFrame(frameIndexRef.current);
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [drawFrame]);

  useEffect(() => {
    if (reducedMotion && imagesRef.current.length) {
      drawFrame(0);
    }
  }, [drawFrame, reducedMotion]);

  return { canvasRef, scrollYProgress, reducedMotion };
}
