/** Scroll-scrub frames from public/ezgif-3f9a15a5319cceac-jpg (30 fps source) */
export const ABOUT_SCROLL_FRAMES = {
  basePath: "/ezgif-3f9a15a5319cceac-jpg",
  count: 150,
  fps: 30,
};

export function getAboutFrameUrl(frameIndex) {
  const n = String(frameIndex).padStart(3, "0");
  return `${ABOUT_SCROLL_FRAMES.basePath}/ezgif-frame-${n}.jpg`;
}

export function getAboutFrameUrls() {
  return Array.from({ length: ABOUT_SCROLL_FRAMES.count }, (_, i) =>
    getAboutFrameUrl(i + 1)
  );
}
