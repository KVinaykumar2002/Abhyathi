import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollFrameBackground from "./ScrollFrameBackground";

const AUTO_SLIDE_MS = 5000;

export default function MediaCarousel({
  slides = [],
  className = "",
  overlayClassName = "",
  onActiveSlideChange,
  controlsPosition = "center",
}) {
  const activeSlides = useMemo(
    () =>
      [...slides]
        .filter((slide) => slide?.isActive !== false && slide?.mediaUrl)
        .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)),
    [slides]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeSlides.length]);

  useEffect(() => {
    if (activeSlides.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeSlides.length);
    }, AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [activeSlides.length]);

  useEffect(() => {
    if (activeSlides.length > 0 && onActiveSlideChange) {
      onActiveSlideChange(activeSlides[activeIndex]);
    }
  }, [activeIndex, activeSlides, onActiveSlideChange]);

  if (activeSlides.length === 0) return null;

  return (
    <div className={`absolute inset-0 ${className}`}>
      {activeSlides.map((slide, index) => (
        <div
          key={`${slide.mediaUrl}-${index}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <ScrollFrameBackground slide={slide} />
        </div>
      ))}
      <div className={`pointer-events-none absolute inset-0 ${overlayClassName}`} aria-hidden />
      {activeSlides.length > 1 && (
        <>
          <div
            className={`absolute left-4 z-[6] flex ${
              controlsPosition === "bottom" ? "bottom-6 items-end" : "inset-y-0 items-center"
            }`}
          >
            <button
              type="button"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? activeSlides.length - 1 : prev - 1
                )
              }
              className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#f4783e] text-white shadow-[0_10px_28px_rgba(0,0,0,0.4)] transition-transform hover:scale-105 hover:bg-[#e86b31] active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          </div>
          <div
            className={`absolute right-4 z-[6] flex ${
              controlsPosition === "bottom" ? "bottom-6 items-end" : "inset-y-0 items-center"
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % activeSlides.length)}
              className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#f4783e] text-white shadow-[0_10px_28px_rgba(0,0,0,0.4)] transition-transform hover:scale-105 hover:bg-[#e86b31] active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
          <div className="absolute right-4 top-24 z-[6] rounded-full border border-white/70 bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {activeIndex + 1}/{activeSlides.length}
          </div>
          <div className="absolute bottom-6 left-1/2 z-[6] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/50 bg-black/65 px-3 py-2 backdrop-blur-sm">
            {activeSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-[#f4783e] scale-110" : "bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
