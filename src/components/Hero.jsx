import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Leaf,
  Recycle,
  Droplets,
} from "lucide-react";

const HERO_VIDEO = encodeURI("/mp_ (online-video-cutter.com).mp4");

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
  return (
    <section className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-[#101810]">
      {/* Video layer — block flow inside section, cannot extend above section top */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="block h-full w-full object-cover"
          aria-hidden
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      {/* Text overlay */}
      <div className="relative z-[1] flex h-full items-center px-6 pb-8 pt-24 md:px-12 md:pt-28 lg:px-16">
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
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1a4d3e] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#1a4d3e]/25 transition-colors hover:bg-[#153d32] md:text-base"
              >
                Shop Now
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:text-base"
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
    </section>
  );
};

export default Hero;
