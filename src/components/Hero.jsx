import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle, Leaf, Recycle, Droplets } from "lucide-react";
import OrderNowButton from "./OrderNowButton";
import ScrollFrameBackground, {
  HeroScrollTrack,
} from "./ScrollFrameBackground";

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

const Hero = () => {
  const heroRef = useRef(null);

  return (
    <HeroScrollTrack trackRef={heroRef}>
      <ScrollFrameBackground />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

      <div className="relative z-[2] flex h-full items-center px-4 pb-8 pt-20 pointer-events-auto sm:px-6 sm:pt-24 md:px-12 md:pt-28 lg:px-16">
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
            Smart Packaging for a Greener Future
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 drop-shadow-md md:text-base"
          >
            Abhyati Food Pak Solutions Pvt Ltd is a leading distributor of
            high-quality, eco-friendly food service packaging — from containers
            and cups to bags and compostable disposables for restaurants, cafés,
            and catering businesses.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <OrderNowButton to="/menu" />
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                to="/menu"
                className="inline-flex min-h-[44px] items-center gap-ds-2 rounded-ds-sm border border-border-muted px-ds-3 py-ds-2 text-ds-md font-semibold text-text-primary transition-[border-color,transform] duration-fast hover:border-text-secondary hover:bg-surface-raised hover:translate-x-2 motion-reduce:hover:translate-x-0 md:text-ds-lg"
              >
                <PlayCircle size={22} strokeWidth={1.75} />
                Explore Our Products
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
