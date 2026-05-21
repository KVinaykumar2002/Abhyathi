import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "@/data/menuData";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export const PRODUCT_CATEGORIES = [
  "All Products",
  "Containers",
  "Bags & Wraps",
  "Cups & Lids",
  "Eco-Friendly",
];

export default function ProductCatalog({
  limit,
  showViewAll = false,
  id = "menu-grid",
  className,
}) {
  const [activeCategory, setActiveCategory] = useState("All Products");

  let filtered =
    activeCategory === "All Products"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return (
    <section id={id} className={cn("section-pad bg-surface-base", className)}>
      <div className="mx-auto max-w-7xl px-ds-3">
        <div className="mb-ds-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-ds-3 font-primary text-ds-3xl text-text-primary md:text-ds-4xl"
          >
            Our Product Range
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-ds-lg text-text-disabled"
          >
            Explore our catalog of containers, cups, bags, and compostable
            disposables — sourced for quality, sustainability, and reliable bulk
            supply.
          </motion.p>
        </div>

        <div className="mb-ds-4 flex flex-wrap justify-center gap-ds-2">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "min-h-[44px] rounded-ds-xl border px-ds-4 py-ds-2 text-ds-sm font-medium transition-all duration-fast",
                "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2",
                activeCategory === cat
                  ? "border-text-secondary bg-text-secondary text-surface-base"
                  : "border-border-muted bg-surface-raised text-text-disabled hover:border-text-secondary hover:text-text-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-ds-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-ds-6 text-center text-ds-lg text-text-disabled">
            No products in this category yet.
          </p>
        )}

        {showViewAll && (
          <div className="mt-ds-4 text-center">
            <Button to="/menu" variant="primary" size="lg">
              View Full Catalog
            </Button>
            <p className="mt-ds-2 text-ds-sm text-text-disabled">
              120+ SKUs across containers, cups, bags, and eco-friendly lines
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
