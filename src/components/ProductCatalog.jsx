import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useSiteContent } from "@/hooks/useSiteContent";
import { resolveProductCategories } from "@/lib/productCategories";
import { cn } from "@/lib/utils";

export default function ProductCatalog({
  limit,
  showViewAll = false,
  id = "menu-grid",
  className,
}) {
  const { data: siteContent } = useSiteContent();
  const categories = useMemo(
    () => ["All Products", ...resolveProductCategories(siteContent)],
    [siteContent]
  );
  const [activeCategory, setActiveCategory] = useState("All Products");
  const { data: products = [], isLoading, isError } = useProducts(activeCategory);
  const isPreview = Boolean(limit);

  const safeActive = categories.includes(activeCategory)
    ? activeCategory
    : "All Products";

  let filtered = products;
  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return (
    <section
      id={id}
      className={cn(
        "overflow-x-hidden py-[60px] font-primary",
        "bg-[#F5F5F5] px-4 sm:px-6 md:px-9",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12">
        <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-[531px]"
          >
            <h2 className="text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[1.1] tracking-[-3px] text-[#0D0C0C]">
              {isPreview ? (
                <>
                  Our Product
                  <br />
                  Range
                </>
              ) : (
                <>
                  Quality Food
                  <br />
                  Packaging
                </>
              )}
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-[#0D0C0C]/60">
              Explore containers, cups, bags, and compostable disposables — built
              for restaurants, cloud kitchens, and catering at scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="pb-1 md:pb-4"
          >
            <Link
              to="/menu"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0D0C0C] px-9 py-3 text-[17px] font-medium text-white transition-all hover:bg-neutral-800 active:scale-95"
            >
              {isPreview ? "Shop All" : "View Catalog"}
            </Link>
          </motion.div>
        </div>

        <div className="flex w-full flex-wrap justify-center gap-2 md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "min-h-[44px] rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300",
                "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0D0C0C] focus-visible:outline-offset-2",
                safeActive === cat
                  ? "border-[#0D0C0C] bg-[#0D0C0C] text-white"
                  : "border-[#0D0C0C]/15 bg-white text-[#0D0C0C]/70 hover:border-[#0D0C0C]/40 hover:text-[#0D0C0C]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading && filtered.length === 0 && (
          <p className="py-12 text-center text-[17px] text-[#0D0C0C]/50">
            Loading products…
          </p>
        )}

        {isError && (
          <p className="text-center text-sm text-red-600">
            Could not load products from the server. Showing cached catalog if
            available.
          </p>
        )}

        <motion.div
          layout
          className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <div key={item.id} className="flex h-full justify-center">
                <ProductCard item={item} index={index} className="h-full" />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!isLoading && filtered.length === 0 && (
          <p className="py-12 text-center text-[17px] text-[#0D0C0C]/50">
            No products in this category yet.
          </p>
        )}

        {showViewAll && (
          <p className="text-center text-sm text-[#0D0C0C]/45">
            120+ SKUs across containers, cups, bags, and eco-friendly lines
          </p>
        )}
      </div>
    </section>
  );
}
