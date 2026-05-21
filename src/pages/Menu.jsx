import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { menuItems } from "../data/menuData";

const CATEGORIES = [
  "All Products",
  "Containers",
  "Bags & Wraps",
  "Cups & Lids",
  "Eco-Friendly",
];

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

/* ─── Product range grid (matches home catalog layout) ─── */
const ProductCard = ({ item }) => {
  const soldOut = Boolean(item.soldOut);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-2xl bg-[#f8f9fa] shadow-sm transition-shadow duration-500 hover:shadow-xl"
    >
      <div className="relative h-44 overflow-hidden bg-neutral-100">
        {soldOut && (
          <span className="absolute right-3 top-3 z-10 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600">
            Sold out
          </span>
        )}
        <img
          src={item.image}
          alt={item.name}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            soldOut ? "opacity-55 grayscale" : ""
          }`}
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <span className="font-serif text-lg font-semibold text-[#f35e16]">
            From ${item.price}
          </span>
          <span className="shrink-0 rounded-full border border-gray-200 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-600">
            {item.category}
          </span>
        </div>

        <h3 className="mb-2 font-serif text-lg leading-snug text-[#101810] transition-colors group-hover:text-[#f35e16]">
          {item.name}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
};

const MenuGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");

  const filtered =
    activeCategory === "All Products"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="menu-grid"
      className="border-t border-neutral-100 bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 font-serif text-4xl text-[#101810] md:text-5xl"
          >
            Our Product Range
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-gray-500"
          >
            Explore our catalog of containers, cups, bags, and compostable
            disposables — sourced for quality, sustainability, and reliable bulk
            supply.
          </motion.p>
        </div>

        <div className="mb-16 flex flex-wrap justify-center gap-3 md:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 md:px-8 ${
                activeCategory === cat
                  ? "border-[#f35e16] bg-[#f35e16] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#f35e16] hover:text-[#f35e16]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-lg font-medium text-gray-600">
            No products in this category yet.
          </p>
        )}

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#f35e16] px-10 py-4 text-base font-semibold text-white shadow-xl shadow-[#f35e16]/30 transition-colors hover:bg-[#e04e08]"
          >
            Request bulk pricing
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            120+ SKUs across containers, cups, bags, and eco-friendly lines
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
