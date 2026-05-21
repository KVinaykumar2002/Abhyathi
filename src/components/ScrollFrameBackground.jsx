import { useRef, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * Hero scroll track — tall section with sticky viewport for scroll-scrubbed background.
 */
export function HeroScrollTrack({ trackRef, children }) {
  return (
    <section
      ref={trackRef}
      className="relative w-full"
      style={{ height: "220vh", minHeight: "100vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {children}
      </div>
    </section>
  );
}

/**
 * Hero background: scroll-scrubbed video (30fps-style smooth playback via scroll).
 */
export default function ScrollFrameBackground({ trackRef }) {
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    const target = progress * video.duration;
    if (Math.abs(video.currentTime - target) > 0.04) {
      video.currentTime = target;
    }
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src="/mp_%20(online-video-cutter.com).mp4"
      muted
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}
