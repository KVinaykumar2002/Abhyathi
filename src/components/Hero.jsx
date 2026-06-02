import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle, Leaf, Recycle, Droplets } from "lucide-react";
import OrderNowButton from "./OrderNowButton";
import { HeroScrollTrack } from "./ScrollFrameBackground";
import MediaCarousel from "./MediaCarousel";
import { useSiteContent } from "@/hooks/useSiteContent";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const features = [
  { icon: Leaf, label: "Eco-Friendly Materials" },
  { icon: Recycle, label: "Compostable & Biodegradable" },
  { icon: Droplets, label: "Durable & Leak-Proof" },
];

const DEFAULT_HERO_SLIDES = [
  {
    type: "video",
    mediaUrl: "/mp_%20(online-video-cutter.com).mp4",
    title: "Smart Packaging for a Greener Future",
    subtitle:
      "Abhyati Food Pak Solutions Pvt Ltd is a leading distributor of high-quality, eco-friendly food service packaging.",
    ctaText: "Explore Products",
    ctaHref: "/menu",
    order: 0,
    isActive: true,
  },
  {
    type: "image",
    mediaUrl: "/image.png",
    title: "Premium Food Containers",
    subtitle: "Durable and leak-proof containers for every need.",
    ctaText: "Shop Containers",
    ctaHref: "/menu",
    order: 1,
    isActive: true,
  },
  {
    type: "image",
    mediaUrl: "/1000.png",
    title: "Custom Branding Available",
    subtitle: "Build your brand presence with custom packaging.",
    ctaText: "Contact Us",
    ctaHref: "/contact",
    order: 2,
    isActive: true,
  },
  {
    type: "image",
    mediaUrl: "/10001.png",
    title: "Bulk Supply Across India",
    subtitle: "Reliable stock and quick dispatch for businesses.",
    ctaText: "Get Quote",
    ctaHref: "/contact",
    order: 3,
    isActive: true,
  },
];

const Hero = () => {
  const heroRef = useRef(null);
  const { data: siteContent } = useSiteContent();
  const [activeSlide, setActiveSlide] = useState(null);
  const homeSlides = useMemo(
    () => {
      const configured = (siteContent?.homeSlides ?? []).filter((slide) => slide?.mediaUrl);
      if (configured.length > 0) return configured;
      return DEFAULT_HERO_SLIDES;
    },
    [siteContent?.homeSlides]
  );

  const heroTitle = activeSlide?.title || "Smart Packaging for a Greener Future";
  const heroSubtitle =
    activeSlide?.subtitle ||
    "Abhyati Food Pak Solutions Pvt Ltd is a leading distributor of high-quality, eco-friendly food service packaging — from containers and cups to bags and compostable disposables for restaurants, cafés, and catering businesses.";
  const heroCtaText = activeSlide?.ctaText || "Explore Our Products";
  const heroCtaHref = activeSlide?.ctaHref || "/menu";

  return (
    <HeroScrollTrack trackRef={heroRef}>
      <MediaCarousel
        slides={homeSlides}
        onActiveSlideChange={setActiveSlide}
        overlayClassName="bg-gradient-to-r from-black/75 via-black/45 to-black/20"
        controlsPosition="bottom"
      />

      <div className="relative z-[3] flex h-full items-center px-4 pb-8 pt-20 pointer-events-auto sm:px-6 sm:pt-24 md:px-12 md:pt-28 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl lg:max-w-3xl drop-shadow-sm"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl"
          >
            {heroTitle}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 drop-shadow-md md:text-base"
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <OrderNowButton
              to="/menu"
              className="bg-[#f4783e] ring-0 hover:bg-[#e86b31] [&>span:first-child]:bg-white [&>span:first-child]:text-black [&>span:last-child]:text-white"
            />
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                to={heroCtaHref}
                className="inline-flex min-h-[44px] items-center gap-ds-2 rounded-ds-sm border border-white/60 bg-black/55 px-ds-3 py-ds-2 text-ds-md font-semibold text-white transition-[border-color,background-color,transform] duration-fast hover:border-white hover:bg-black/75 hover:translate-x-2 motion-reduce:hover:translate-x-0 md:text-ds-lg"
              >
                <PlayCircle size={22} strokeWidth={1.75} />
                {heroCtaText}
              </Link>
            </motion.div>
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6 md:mt-10"
          >
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/60 text-white">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span className="text-sm font-bold text-white drop-shadow-md md:text-base">
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </HeroScrollTrack>
  );
};

export default Hero;
