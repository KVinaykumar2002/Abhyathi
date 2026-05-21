import { motion } from "framer-motion";
import ProductCatalog from "../components/ProductCatalog";
import PageShell from "../components/PageShell";
import { Button } from "@/components/ui";

const PRODUCTS_HERO_BG = "/image.png";

const ProductsHero = () => (
  <section
    aria-label="Products"
    className="relative isolate flex h-[clamp(420px,min(62vh,680px),820px)] flex-col justify-end overflow-hidden bg-surface-raised pb-ds-4 text-center md:h-[clamp(480px,min(58vh,720px),880px)] md:pb-ds-5"
    style={{
      backgroundImage: `url("${PRODUCTS_HERO_BG}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-surface-base/40 to-transparent"
      aria-hidden
    />

    <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-ds-3 px-ds-3 pb-ds-3 pt-24 md:max-w-5xl md:pt-28">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="text-balance font-primary text-ds-3xl font-semibold leading-tight tracking-tight text-text-primary [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] md:text-ds-4xl"
      >
        High-Quality Food Packaging Solutions
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="max-w-2xl text-ds-lg text-text-primary/90"
      >
        Paper Bags · Takeaway containers · Sweet boxes
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16 }}
      >
        <Button
          variant="secondary"
          size="lg"
          className="border-text-primary bg-text-primary text-surface-base hover:brightness-95"
          onClick={() =>
            document.getElementById("menu-grid")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Shop all
        </Button>
      </motion.div>
    </div>
  </section>
);

export default function Menu() {
  return (
    <PageShell>
      <ProductsHero />
      <ProductCatalog />
      <div className="border-t border-border-muted pb-ds-6 pt-ds-4 text-center">
        <Button to="/contact" variant="primary" size="lg">
          Request bulk pricing
        </Button>
        <p className="mt-ds-2 text-ds-sm text-text-disabled">
          120+ SKUs across containers, cups, bags, and eco-friendly lines
        </p>
      </div>
    </PageShell>
  );
}
