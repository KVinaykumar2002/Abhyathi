import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_SOFT, viewportScrollReplay } from "@/lib/motionPresets";

const PLAY_STORE_URL =
  import.meta.env.VITE_PLAY_STORE_URL || "https://play.google.com/store/apps";

const BANNER_SRC = "/download-app-banner.png";

const overlayContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

function slideFromLeft(reduced) {
  return {
    hidden: { opacity: 0, x: reduced ? 0 : -56 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: reduced ? 0.35 : 0.7, ease: EASE_OUT_SOFT },
    },
  };
}

function GooglePlayIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15 4.34 1.91 4.95 2 5.35 2.36L19.07 11.86c.47.35.47.93 0 1.28L5.35 22.64c-.4.36-1.01.45-1.51.21C3.34 22.61 3 22.09 3 20.5z" />
    </svg>
  );
}

function PlayStoreButton({ variants }) {
  return (
    <motion.a
      variants={variants}
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex w-fit max-w-full items-center gap-3 rounded-xl bg-[#0d0d0d] px-5 py-3.5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B7A3D]"
      aria-label="Download Abhyati food packaging app on Google Play"
    >
      <GooglePlayIcon className="h-9 w-9 shrink-0 text-[#34A853]" />
      <span className="flex flex-col items-start leading-none">
        <span className="text-[11px] font-medium uppercase tracking-wide text-white/75">
          Download on
        </span>
        <span className="mt-0.5 text-xl font-semibold tracking-tight">
          Google Play
        </span>
      </span>
    </motion.a>
  );
}

const FooterDownloadBanner = () => {
  const reducedMotion = useReducedMotion();
  const itemVariants = slideFromLeft(reducedMotion);

  return (
    <section
      className="relative w-full overflow-hidden rounded-2xl bg-white shadow-[0_4px_40px_rgba(0,0,0,0.08)]"
      aria-labelledby="footer-download-heading"
    >
      <img
        src={BANNER_SRC}
        alt="Abhyati food packaging — download the app on Google Play"
        className="block h-auto w-full select-none"
        loading="lazy"
        decoding="async"
      />

      {/* Copy sits in the banner’s left white area */}
      <div className="absolute inset-y-0 left-0 flex w-full max-w-[min(100%,54%)] flex-col justify-center px-5 py-8 sm:px-8 md:px-10 lg:px-14 lg:py-10">
        <motion.div
          variants={overlayContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportScrollReplay}
          className="flex flex-col gap-4 md:gap-5"
        >
          <motion.h2
            id="footer-download-heading"
            variants={itemVariants}
            className="text-balance text-[clamp(1.35rem,3.2vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-[#1B7A3D]"
          >
            Download from the Play Store
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="max-w-md text-balance text-[clamp(1rem,1.8vw,1.35rem)] font-semibold leading-snug text-[#0a0a0a]"
          >
            For all your food packaging items — boxes, bags, containers &amp;
            bulk supplies for restaurants and catering.
          </motion.p>

          <PlayStoreButton variants={itemVariants} />
        </motion.div>
      </div>
    </section>
  );
};

export default FooterDownloadBanner;
