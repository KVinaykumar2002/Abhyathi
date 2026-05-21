import { useRef, useMemo } from "react";
import { motion, useTransform } from "framer-motion";
import { getAboutFrameUrls, ABOUT_SCROLL_FRAMES } from "@/data/aboutScrollFrames";
import { useScrollFrameScrub } from "@/hooks/useScrollFrameScrub";

/**
 * Scroll-scrub frame canvas. With `pinScrollTargetRef`, the parent supplies the
 * tall runway + sticky shell (see About page); frames scrub until scroll completes,
 * then the next section scrolls in on top.
 */
export default function AboutScrollSequence({ pinScrollTargetRef } = {}) {
  const localTrackRef = useRef(null);
  const scrollTarget = pinScrollTargetRef ?? localTrackRef;
  const pinned = Boolean(pinScrollTargetRef);

  const frameUrls = useMemo(() => getAboutFrameUrls(), []);
  const { canvasRef, scrollYProgress, reducedMotion } = useScrollFrameScrub(
    scrollTarget,
    frameUrls,
    {
      fit: "cover",
      offset: pinned ? ["start start", "end end"] : ["start start", "end start"],
    }
  );

  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [1, 0, 0, 1]);

  if (reducedMotion) {
    return (
      <section
        className="relative bg-surface-base py-10 md:py-14"
        aria-label="Packaging showcase"
      >
        <div className="mx-auto flex max-h-[70svh] min-h-[240px] max-w-7xl items-center justify-center px-4 md:px-8">
          <img
            src={frameUrls[0]}
            alt="Abhyati eco-friendly food packaging"
            className="max-h-[min(70svh,640px)] w-full rounded-2xl object-cover object-center"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>
    );
  }

  const canvasBlock = (
    <>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
      <motion.p
        style={{ opacity: hintOpacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border-muted bg-surface-raised/90 px-4 py-2 text-ds-xs font-medium uppercase tracking-widest text-text-disabled backdrop-blur-sm"
      >
        Scroll to explore · {ABOUT_SCROLL_FRAMES.count} frames @ {ABOUT_SCROLL_FRAMES.fps}
        fps
      </motion.p>
    </>
  );

  if (pinned) {
    return <div className="relative h-full w-full">{canvasBlock}</div>;
  }

  return (
    <section
      className="relative bg-surface-base [--about-scroll-h:calc(100svh_+_55vh)]"
      aria-label="Packaging showcase animation"
    >
      <div
        ref={localTrackRef}
        className="relative w-full"
        style={{ height: "var(--about-scroll-h)" }}
      >
        <div className="sticky top-0 z-0 flex h-svh w-full items-center justify-center overflow-hidden bg-surface-base">
          {canvasBlock}
        </div>
      </div>
    </section>
  );
}
