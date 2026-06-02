import { useRef, useEffect } from "react";

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
export default function ScrollFrameBackground({ slide }) {
  const videoRef = useRef(null);
  const isVideo = slide?.type === "video";
  const mediaUrl = slide?.mediaUrl;

  useEffect(() => {
    if (!isVideo) return undefined;
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
  }, [isVideo, mediaUrl]);

  if (!mediaUrl) return null;

  if (!isVideo) {
    return (
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={mediaUrl}
        alt=""
        aria-hidden
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src={mediaUrl}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}
