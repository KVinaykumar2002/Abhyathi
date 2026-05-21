import { useRef, useEffect } from "react";

const HERO_VIDEO_SRC = "/mp_%20(online-video-cutter.com).mp4";

/**
 * Hero section — full viewport with looping background video.
 */
export function HeroScrollTrack({ trackRef, children }) {
  return (
    <section ref={trackRef} className="relative w-full">
      <div className="relative h-screen min-h-[520px] w-full overflow-hidden">
        {children}
      </div>
    </section>
  );
}

/**
 * Hero background video — autoplays (muted) for reliable browser support.
 */
export default function ScrollFrameBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => {
        // Autoplay may be blocked until user interaction; retry once on pointer down
        const resume = () => {
          video.play().catch(() => {});
          window.removeEventListener("pointerdown", resume);
        };
        window.addEventListener("pointerdown", resume, { once: true });
      });
    };

    video.addEventListener("loadeddata", play);
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      play();
    }

    return () => video.removeEventListener("loadeddata", play);
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src={HERO_VIDEO_SRC}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}
