import { useRef, useMemo } from "react";
import { motion, useTransform } from "framer-motion";
import { getAboutFrameUrls, ABOUT_SCROLL_FRAMES } from "@/data/aboutScrollFrames";
import { useScrollFrameScrub } from "@/hooks/useScrollFrameScrub";

/** ~5s of footage at 30fps → comfortable scroll distance for smooth scrubbing */
const SCROLL_HEIGHT_VH = 280;

export default function AboutScrollSequence() {
  const trackRef = useRef(null);
  const frameUrls = useMemo(() => getAboutFrameUrls(), []);
  const { canvasRef, scrollYProgress, reducedMotion } = useScrollFrameScrub(
    trackRef,
    frameUrls,
    { fit: "contain" }
  );

  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [1, 0, 0, 1]);

  return (
    <section
      className="relative bg-surface-base"
      aria-label="Packaging showcase animation"
    >
      <div
        ref={trackRef}
        className="relative w-full"
        style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
      >
        <div className="sticky top-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden bg-surface-base">
          <canvas
            ref={canvasRef}
            className="h-full w-full max-h-[min(100vh,900px)] max-w-7xl px-4 md:px-8"
            aria-hidden
          />

          {!reducedMotion && (
            <motion.p
              style={{ opacity: hintOpacity }}
              className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border-muted bg-surface-raised/90 px-4 py-2 text-ds-xs font-medium uppercase tracking-widest text-text-disabled backdrop-blur-sm"
            >
              Scroll to explore · {ABOUT_SCROLL_FRAMES.count} frames @{" "}
              {ABOUT_SCROLL_FRAMES.fps}fps
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
