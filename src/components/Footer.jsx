import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_SOFT, viewportScrollReplay } from "@/lib/motionPresets";

const gridContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const columnReveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE_OUT_SOFT,
      staggerChildren: 0.06,
      delayChildren: 0.06,
    },
  },
};

const linkReveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: EASE_OUT_SOFT },
  },
};

const blockReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_SOFT },
  },
};

/** Repeating tile: corner lines + subtle “+” at the cell center (matches reference footer). */
const FOOTER_GRID_PATTERN =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'>` +
      `<path d='M48 0H0V48' fill='none' stroke='rgba(255,255,255,0.055)' stroke-width='1'/>` +
      `<path d='M24 22.5v3M22.5 24h3' stroke='rgba(255,255,255,0.09)' stroke-width='1' stroke-linecap='round'/>` +
      `</svg>`
  );

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Community", href: "/testimonials" },
  { label: "Menu", href: "/menu" },
  { label: "Contact Us", href: "/contact" },
];

const ACCOUNT_LINKS = [
  { label: "Login", href: "/account" },
  { label: "Register", href: "/account" },
];

const CONTACT_INFO = [
  {
    label: "info@abhyatifoodpak.com",
    href: "mailto:info@abhyatifoodpak.com",
  },
  { label: "+91 (000) 000-0000", href: "tel:+910000000000" },
  { label: "Abhyati Food Pak Solutions Pvt Ltd, India", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Tiktok", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

function FooterLinkAnchor({ link, pathname }) {
  const isActive = link.href.startsWith("/") && link.href === pathname;
  const className = cn(
    "text-[18px] font-medium transition-all duration-300 hover:opacity-100",
    isActive ? "text-white opacity-100" : "text-white opacity-50"
  );

  if (link.href.startsWith("/")) {
    return (
      <Link to={link.href} className={className}>
        {link.label}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      onClick={(e) => link.href === "#" && e.preventDefault()}
      className={className}
    >
      {link.label}
    </a>
  );
}

const FooterColumn = ({ title, links, className, pathname }) => {
  return (
    <motion.div
      variants={columnReveal}
      className={cn("flex flex-col gap-4", className)}
    >
      {title && (
        <motion.h3
          variants={linkReveal}
          className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-2"
        >
          {title}
        </motion.h3>
      )}
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <motion.li key={link.label} variants={linkReveal}>
            <FooterLinkAnchor link={link} pathname={pathname} />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const Footer = () => {
  const { pathname } = useLocation();
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  /** Subtle vertical drift on the wordmark while the footer crosses the viewport */
  const wordmarkY = useTransform(scrollYProgress, [0, 0.45, 1], [22, 0, -18]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#000000] text-white selection:bg-[#F4783E] selection:text-white overflow-hidden"
    >
      {/* Warm glow behind the large wordmark (bottom center) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,rgba(244,120,62,0.28)_0%,rgba(244,120,62,0.08)_35%,transparent_62%)]"
      />
      {/* Fine grid + intersection marks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.85]"
        style={{
          backgroundImage: `url("${FOOTER_GRID_PATTERN}")`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 pt-24 pb-12 flex flex-col gap-24 lg:gap-32">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportScrollReplay}
        >
          <FooterColumn links={NAV_LINKS} pathname={pathname} />
          <FooterColumn links={ACCOUNT_LINKS} pathname={pathname} />
          <FooterColumn
            links={CONTACT_INFO}
            pathname={pathname}
            className="lg:col-span-1 lg:max-w-[340px]"
          />
          <FooterColumn
            links={SOCIAL_LINKS}
            pathname={pathname}
            className="lg:items-end lg:text-right"
          />
        </motion.div>

        <div className="relative flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportScrollReplay}
              transition={{ duration: 0.55, ease: EASE_OUT_SOFT }}
              className="min-w-0"
            >
              <motion.h1
                style={{ y: wordmarkY }}
                className="text-[clamp(2.25rem,10vw,14rem)] lg:text-[clamp(3.5rem,12vw,280px)] leading-[0.85] font-medium tracking-tighter -ml-[0.05em] select-none pointer-events-none max-w-[95vw] lg:max-w-none text-balance will-change-transform"
              >
                abhyati food pvk
              </motion.h1>
            </motion.div>

            <motion.button
              type="button"
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportScrollReplay}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_SOFT }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-24 h-24 lg:w-32 lg:h-32 shrink-0 rounded-full bg-[#F4783E] flex items-center justify-center cursor-pointer transition-transform duration-500 ease-in-out group self-end mb-4 lg:mb-0"
              aria-label="Back to top"
            >
              <svg
                viewBox="0 0 166 167"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full p-5 lg:p-6"
              >
                <path
                  d="M103.75 70.7445C101.55 70.7445 98.2661 68.4631 95.5093 66.1536C91.9521 63.1843 88.8485 59.636 86.4801 55.568C84.7045 52.5177 83 48.8201 83 45.8445M83 45.8445C83 48.8201 81.2955 52.5208 79.5199 55.568C77.1485 59.636 74.0449 63.1843 70.4937 66.1536C67.7339 68.4631 64.4436 70.7445 62.25 70.7445M83 45.8445L83 120.545"
                  stroke="white"
                  strokeWidth="6.225"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:-translate-y-1 transition-transform duration-300"
                />
              </svg>
            </motion.button>
          </div>

          <motion.div
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={viewportScrollReplay}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-12 border-t border-white/10"
          >
            <motion.p
              variants={blockReveal}
              className="text-[18px] font-medium opacity-50"
            >
              <span>© All rights reserved 2026</span>
            </motion.p>

            <div className="flex flex-wrap items-center gap-8 md:gap-16">
              {LEGAL_LINKS.map((link) => (
                <motion.div key={link.label} variants={blockReveal}>
                  <Link
                    to={link.href}
                    className="text-[18px] font-medium opacity-50 transition-opacity hover:opacity-100 whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
