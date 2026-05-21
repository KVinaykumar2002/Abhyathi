import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_SOFT } from "@/lib/motionPresets";

const PLAY_STORE_URL =
  import.meta.env.VITE_PLAY_STORE_URL || "https://play.google.com/store/apps";

const BANNER_SRC = "/download-app-banner.png";

const overlayContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const bannerViewport = { once: true, amount: 0.12 };

function slideFromLeft(reduced) {
  return {
    hidden: { opacity: 1, x: reduced ? 0 : -48 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: reduced ? 0.35 : 0.65, ease: EASE_OUT_SOFT },
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

function PlayStoreButton({ variants, className }) {
  return (
    <motion.a
      variants={variants}
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={
        className ??
        "inline-flex w-fit max-w-full items-center gap-3 rounded-xl bg-[#0d0d0d] px-4 py-3 text-white shadow-lg transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B7A3D] sm:px-5 sm:py-3.5"
      }
      aria-label="Download Abhyati food packaging app on Google Play"
    >
      <GooglePlayIcon className="h-8 w-8 shrink-0 text-[#34A853] sm:h-9 sm:w-9" />
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-medium uppercase tracking-wide text-white/75 sm:text-[11px]">
          Download on
        </span>
        <span className="mt-0.5 text-lg font-semibold tracking-tight sm:text-xl">
          Google Play
        </span>
      </span>
    </motion.a>
  );
}

function DownloadCopy({ itemVariants, mobileOnDark = false }) {
  const headingClass = mobileOnDark
    ? "text-[#4ade80]"
    : "text-[#1B7A3D]";
  const bodyClass = mobileOnDark
    ? "text-white/90"
    : "text-[#0a0a0a]";

  return (
    <>
      <motion.h2
        id="footer-download-heading"
        variants={itemVariants}
        className={`text-balance text-[clamp(1.25rem,4.5vw,2.75rem)] font-bold leading-[1.12] tracking-tight ${headingClass}`}
      >
        Download from the Play Store
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className={`max-w-md text-balance text-[clamp(0.9rem,2.8vw,1.35rem)] font-semibold leading-snug ${bodyClass}`}
      >
        For all your food packaging items — boxes, bags, containers &amp; bulk
        supplies for restaurants and catering.
      </motion.p>

      <PlayStoreButton variants={itemVariants} />
    </>
  );
}

const FooterDownloadBanner = () => {
  const reducedMotion = useReducedMotion();
  const itemVariants = slideFromLeft(reducedMotion);

  return (
    <section
      className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl"
      aria-labelledby="footer-download-heading"
    >
      {/* Desktop / tablet: text on image white area (no extra white card) */}
      <div className="relative hidden sm:block">
        <img
          src={BANNER_SRC}
          alt=""
          className="block h-auto w-full select-none"
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-[min(58%,520px)] flex-col justify-center px-[4%] py-6 md:px-[5%] lg:py-8">
          <motion.div
            variants={overlayContainer}
            initial="hidden"
            whileInView="show"
            viewport={bannerViewport}
            className="pointer-events-auto flex flex-col gap-3 md:gap-4 lg:gap-5 [color:initial]"
          >
            <DownloadCopy itemVariants={itemVariants} />
          </motion.div>
        </div>
      </div>

      {/* Mobile: image + copy below (readable on footer, no white box) */}
      <div className="flex flex-col sm:hidden">
        <img
          src={BANNER_SRC}
          alt=""
          className="block w-full rounded-t-xl object-cover object-right"
          loading="lazy"
          decoding="async"
        />
        <motion.div
          variants={overlayContainer}
          initial="hidden"
          whileInView="show"
          viewport={bannerViewport}
          className="flex flex-col gap-3 px-1 pt-4"
        >
          <DownloadCopy itemVariants={itemVariants} mobileOnDark />
        </motion.div>
      </div>
    </section>
  );
};

export default FooterDownloadBanner;
