import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Star,
  ChevronDown,
  Clock,
  Package,
  Leaf,
  GlassWater,
  ShoppingBag,
  Recycle,
} from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { menuItems } from '../data/menuData';

/* ─── Category Config ─── */
const categories = [
  { label: "All Products", icon: null, color: "#f35e16" },
  { label: "Containers", icon: Package, color: "#22c55e" },
  { label: "Bags & Wraps", icon: ShoppingBag, color: "#ef4444" },
  { label: "Cups & Lids", icon: GlassWater, color: "#3b82f6" },
  { label: "Eco-Friendly", icon: Leaf, color: "#16a34a" },
];

/* ─── Hero Section ─── */
const MenuHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] bg-[#101810] flex items-center overflow-hidden pt-20"
    >
      {/* Background ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#f35e16]/5 blur-[120px]" />
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#1a3d1a]/60 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#f35e16]/3 blur-[150px]" />
      </div>

      {/* Dotted grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          {/* Left Content */}
          <motion.div style={{ y, opacity }} className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#f35e16]/30 bg-[#f35e16]/10">
                <Star size={14} className="text-[#f35e16] fill-[#f35e16]" />
                <span className="text-[#f35e16] text-sm font-medium tracking-wider uppercase">
                  Food Service Packaging
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <div className="space-y-2 overflow-hidden">
              {["Quality", "Packaging"].map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + i * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`font-serif font-semibold leading-[1.05] text-white block ${
                      i === 1 ? "text-[#f35e16]" : ""
                    }`}
                    style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
                  >
                    {word}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-white/60 text-lg leading-relaxed max-w-md font-sans"
            >
              Browse Abhyati Food Pak’s full catalog of containers, cups, bags,
              and compostable disposables — distributed in bulk for restaurants,
              cafés, catering, and food service operators.
            </motion.p>

            {/* Stats pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { icon: Clock, text: "Fast bulk dispatch" },
                { icon: Star, text: "500+ clients" },
                { icon: Leaf, text: "85% eco range" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <Icon size={14} className="text-[#f35e16]" />
                  <span className="text-white/70 text-sm font-sans">
                    {text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="flex gap-4"
            >
              <motion.a
                href="#menu-grid"
                whileHover={{ scale: 1.05, backgroundColor: "#e04e08" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#f35e16] text-white font-medium transition-colors duration-300"
              >
                Browse Catalog
                <ChevronDown size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
              >
                Request Quote
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — Decorative Image Composition */}
          <div className="relative flex items-center justify-center">
            {/* Large circular main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[420px] h-[420px] md:w-[480px] md:h-[480px]"
            >
              {/* Outer glowing ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-[#f35e16]/20"
                style={{ animation: "spin 20s linear infinite" }}
              />
              <div className="absolute inset-4 rounded-full border border-[#f35e16]/10" />

              {/* Main food image */}
              <motion.div
                className="absolute inset-8 rounded-full overflow-hidden ring-4 ring-[#f35e16]/20 shadow-2xl shadow-[#f35e16]/20"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2070&auto=format&fit=crop"
                  alt="Eco-friendly food packaging"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101810]/30 to-transparent" />
              </motion.div>

              {/* Floating accent circles */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#f35e16]/20 blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[#1a4a1a]/40 blur-2xl" />
            </motion.div>

            {/* Floating card: Eco certified */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -top-6 -right-4 md:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3 shadow-xl"
              style={{ animation: "float 4s ease-in-out infinite" }}
            >
              <motion.div className="w-12 h-12 rounded-full ring-2 ring-[#f35e16]/40 bg-[#f35e16]/20 flex items-center justify-center">
                <Recycle size={22} className="text-[#f35e16]" />
              </motion.div>
              <div>
                <p className="text-white text-sm font-medium font-sans">
                  Eco Certified
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className="text-[#f35e16] fill-[#f35e16]"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating card: SKU count */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="absolute -bottom-4 -left-4 md:left-0 bg-[#f35e16] rounded-2xl px-5 py-4 shadow-xl"
              style={{ animation: "floatReverse 5s ease-in-out infinite" }}
            >
              <p className="text-white/70 text-xs font-sans uppercase tracking-widest">
                Catalog
              </p>
              <p className="text-white text-3xl font-serif font-bold leading-none mt-1">
                120+
              </p>
              <p className="text-white/70 text-xs font-sans mt-1">
                Product SKUs
              </p>
            </motion.div>

            {/* Floating mini images */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute top-1/2 -right-12 w-16 h-16 rounded-xl overflow-hidden ring-2 ring-white/20 shadow-lg hidden lg:block"
              style={{ animation: "floatSlow 6s ease-in-out infinite" }}
            >
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=200&auto=format&fit=crop"
                alt="Packaging"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs uppercase tracking-[0.3em] font-sans">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-[#f35e16]" />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── Single Menu Card ─── */
const MenuCard = ({ item, index }) => {
  const categoryColors = {
    Containers: { bg: "#dcfce7", text: "#16a34a", border: "#bbf7d0" },
    "Bags & Wraps": { bg: "#fee2e2", text: "#dc2626", border: "#fecaca" },
    "Cups & Lids": { bg: "#dbeafe", text: "#2563eb", border: "#bfdbfe" },
    "Eco-Friendly": { bg: "#ecfdf5", text: "#059669", border: "#a7f3d0" },
  };
  const colors = categoryColors[item.category] || {
    bg: "#f3f4f6",
    text: "#6b7280",
    border: "#e5e7eb",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden bg-gray-100">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick add button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#f35e16] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg translate-y-2 group-hover:translate-y-0"
        >
          Get Quote
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-7">
        {/* Top row: price + category */}
        <div className="flex items-center justify-between mb-4">
          <motion.span
            className="text-[#f35e16] text-2xl font-serif font-bold"
            whileHover={{ scale: 1.05 }}
          >
            From ${item.price.toFixed(2)}
          </motion.span>
          <span
            className="text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider"
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            {item.category}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-2xl font-serif text-[#101810] mb-3 group-hover:text-[#f35e16] transition-colors duration-300 leading-tight">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Bottom row */}
        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className="text-[#f35e16] fill-[#f35e16]"
              />
            ))}
            <span className="text-gray-400 text-xs ml-1 font-sans">(4.8)</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-sans">
            <Package size={12} />
            <span>Bulk supply</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Menu Grid Section ─── */
const MenuGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered =
    activeCategory === "All Products"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const counts = {
    "All Products": menuItems.length,
    Containers: menuItems.filter((i) => i.category === "Containers").length,
    "Bags & Wraps": menuItems.filter((i) => i.category === "Bags & Wraps")
      .length,
    "Cups & Lids": menuItems.filter((i) => i.category === "Cups & Lids").length,
    "Eco-Friendly": menuItems.filter((i) => i.category === "Eco-Friendly")
      .length,
  };

  return (
    <section id="menu-grid" className="bg-[#f8f6f2] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f35e16]/30 bg-[#f35e16]/8 mb-6"
            style={{ backgroundColor: "rgba(243,94,22,0.08)" }}
          >
            <span className="text-[#f35e16] text-xs font-semibold uppercase tracking-[0.2em]">
              Our Selections
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-[#101810] mb-5 leading-tight"
          >
            Explore Our <span className="text-[#f35e16]">Catalog</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg leading-relaxed font-sans"
          >
            High-quality food service packaging for takeout, delivery, catering,
            and dine-in — including compostable and recyclable options from
            Abhyati Food Pak Solutions.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.label;
            return (
              <motion.button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`relative flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  active
                    ? "bg-[#f35e16] text-white border-[#f35e16] shadow-lg shadow-[#f35e16]/25"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#f35e16]/50 hover:text-[#f35e16] shadow-sm"
                }`}
              >
                {Icon && <Icon size={14} />}
                {cat.label}
                <span
                  className={`text-[11px] font-bold ml-1 px-2 py-0.5 rounded-full transition-colors ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {counts[cat.label]}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {mounted &&
              filtered.map((item, index) => (
                <MenuCard key={item.id} item={item} index={index} />
              ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {mounted && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-gray-400"
          >
            <p className="text-6xl mb-4">📦</p>
            <p className="text-xl font-serif">No products in this category yet.</p>
          </motion.div>
        )}

        {/* Load more / View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#e04e08" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full bg-[#f35e16] text-white font-semibold text-base transition-colors duration-300 shadow-xl shadow-[#f35e16]/30"
          >
            Request Bulk Pricing
          </motion.button>
          <p className="text-gray-400 text-sm mt-4 font-sans">
            New SKUs added regularly · Custom branding available on select lines
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Sustainable Solutions Banner ─── */
const ChefSpecial = () => (
  <section className="bg-[#101810] py-20 overflow-hidden relative">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#f35e16]/5 blur-[100px]" />
    </div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="rounded-[2.5rem] bg-gradient-to-br from-[#1a2e1a] to-[#0d1f0d] border border-white/5 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left */}
          <div className="p-12 md:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f35e16]/15 border border-[#f35e16]/25">
                <Star size={12} className="text-[#f35e16] fill-[#f35e16]" />
                <span className="text-[#f35e16] text-xs font-semibold uppercase tracking-widest">
                  Sustainability
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                Eco-Friendly{" "}
                <span className="text-[#f35e16] italic">Packaging Line</span>
              </h2>

              <p className="text-white/50 leading-relaxed font-sans">
                Help your business reduce plastic waste with our compostable
                containers, plant-based cups, bamboo cutlery, and recyclable
                paper solutions — without compromising on durability or presentation.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { label: "Compostable SKUs", value: "45+" },
                  { label: "Recyclable Options", value: "60+" },
                  { label: "Certified Materials", value: "100%" },
                  { label: "Years in Business", value: "15+" },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-1">
                    <p className="text-[#f35e16] text-3xl font-serif font-bold">
                      {value}
                    </p>
                    <p className="text-white/40 text-sm font-sans">{label}</p>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#e04e08" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#f35e16] text-white font-semibold transition-colors duration-300 mt-2"
              >
                Explore Eco Range
              </motion.button>
            </motion.div>
          </div>

          {/* Right — image collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative min-h-[400px] lg:min-h-0"
          >
            {/* Main large image */}
            <div className="absolute inset-4 lg:inset-8 rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
                alt="Eco-friendly packaging"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1a2e1a]/30" />
            </div>

            {/* Small overlay badge */}
            <div className="absolute bottom-12 left-12 lg:left-4 bg-[#f35e16] rounded-2xl px-6 py-4 shadow-2xl">
              <p className="text-white/80 text-xs font-sans uppercase tracking-wider">
                Featured Product
              </p>
              <p className="text-white font-serif text-lg font-semibold mt-1">
                Sugarcane Clamshell Box
              </p>
              <p className="text-white/70 text-sm font-sans">From $48.25/case</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Page ─── */
export default function Menu() {
  return (
    <div className="min-h-screen font-sans selection:bg-[#f35e16]/30 selection:text-[#f35e16]">
      <Navbar />
      <main>
        <MenuHero />
        <MenuGrid />
        <ChefSpecial />
      </main>
      <Footer />
    </div>
  );
}
