import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Leaf, GlassWater, ShoppingBag } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { menuItems } from '../data/menuData';

/** Catalog hero — kraft / eco packaging lineup (public/image.png) */
const PRODUCTS_HERO_BG = "/image.png";

/* ─── Top hero — taller band, image under navbar row ─── */
const ProductsHero = () => (
  <section
    aria-label="Products"
    className="relative isolate flex h-[clamp(420px,min(62vh,680px),820px)] flex-col justify-end overflow-hidden bg-neutral-100 pb-10 text-center md:h-[clamp(480px,min(58vh,720px),880px)] md:pb-14"
    style={{
      backgroundImage: `url("${PRODUCTS_HERO_BG}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/[0.12] to-transparent" aria-hidden />

    <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-6 pb-4 pt-24 md:max-w-5xl md:gap-6 md:pb-6 md:pt-28">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="text-balance font-sans text-3xl font-semibold leading-[1.12] tracking-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35),0_2px_24px_rgba(0,0,0,0.25)] sm:text-4xl md:text-5xl lg:text-[3.25rem]"
      >
        High-Quality Food Packaging Solutions
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl text-sm font-medium text-white/95 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] sm:text-base md:text-lg"
      >
        Paper Bags · Takeaway containers · Sweet boxes
      </motion.p>
      <motion.a
        href="#menu-grid"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white px-8 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-black/15 transition-colors hover:border-white hover:bg-white/95 hover:text-neutral-900 md:px-10 md:py-3.5 md:text-[15px]"
      >
        Shop all
      </motion.a>
    </div>
  </section>
);

/* ─── Category Config ─── */
const categories = [
  { label: "All Products", icon: null, color: "#f35e16" },
  { label: "Containers", icon: Package, color: "#22c55e" },
  { label: "Bags & Wraps", icon: ShoppingBag, color: "#ef4444" },
  { label: "Cups & Lids", icon: GlassWater, color: "#3b82f6" },
  { label: "Eco-Friendly", icon: Leaf, color: "#16a34a" },
];

/** INR-style list price for catalog (placeholder scale from `price`). */
function formatCatalogRs(item) {
  const n = item.priceRs ?? Math.round(item.price * 10);
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ─── Catalog product cell — minimal grid like storefront ─── */
const MenuCard = ({ item, index }) => {
  const soldOut = Boolean(item.soldOut);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] rounded-xl bg-white">
        {soldOut && (
          <span className="absolute right-2 top-2 z-10 rounded-md border border-neutral-200 bg-neutral-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600">
            Sold out
          </span>
        )}
        <img
          src={item.image}
          alt=""
          className={`h-full w-full object-contain p-4 ${soldOut ? "opacity-[0.55] grayscale" : ""}`}
          loading="lazy"
        />
      </div>
      <h3 className="mt-5 max-w-[260px] px-1 text-[12px] font-semibold uppercase leading-snug tracking-wide text-neutral-950 sm:text-[13px]">
        {item.name}
      </h3>
      <p className="mt-2 text-sm text-neutral-600">
        From RS. {formatCatalogRs(item)}
      </p>
    </motion.article>
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
    <section
      id="menu-grid"
      className="border-t border-neutral-100 bg-white pt-8 pb-14 md:pt-10 md:pb-16"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <div className="mb-8 flex flex-col items-center gap-2 text-center md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f35e16]">
            Products
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
            Catalog
          </h2>
          <p className="max-w-lg text-sm text-neutral-500">
            Filter by category — pricing shown as indicative list rates.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap justify-center gap-2 md:mb-10 md:gap-2.5"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.label;
            return (
              <motion.button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(cat.label)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors md:px-5 md:text-sm ${
                  active
                    ? "border-neutral-950 bg-neutral-950 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-[#f35e16]/50 hover:text-[#f35e16]"
                }`}
              >
                {Icon && <Icon size={14} className="shrink-0 opacity-80" />}
                {cat.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${
                    active ? "bg-white/15 text-white" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {counts[cat.label]}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {mounted &&
              filtered.map((item, index) => (
                <MenuCard key={item.id} item={item} index={index} />
              ))}
          </AnimatePresence>
        </motion.div>

        {mounted && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-neutral-500"
          >
            <p className="text-lg font-medium text-neutral-800">
              No products in this category yet.
            </p>
          </motion.div>
        )}

        <div className="mt-14 flex flex-col items-center gap-3 text-center md:mt-16">
          <Link
            to="/contact"
            className="rounded-full border-2 border-neutral-950 bg-neutral-950 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#f35e16] hover:border-[#f35e16]"
          >
            Request bulk pricing
          </Link>
          <p className="max-w-md text-xs text-neutral-500">
            New SKUs added regularly · Custom branding on select lines
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── Page ─── */
export default function Menu() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#f35e16]/30 selection:text-[#f35e16]">
      <Navbar />
      <main className="bg-white">
        <ProductsHero />
        <MenuGrid />
      </main>
      <Footer />
    </div>
  );
}
