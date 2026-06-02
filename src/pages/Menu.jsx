import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import ProductCatalog from "../components/ProductCatalog";
import PageShell from "../components/PageShell";
import { Button } from "@/components/ui";
import MediaCarousel from "@/components/MediaCarousel";
import { useSiteContent } from "@/hooks/useSiteContent";

const DEFAULT_PRODUCT_SLIDES = [
  {
    type: "image",
    mediaUrl: "/image.png",
    title: "High-Quality Food Packaging Solutions",
    subtitle: "Paper Bags · Takeaway containers · Sweet boxes",
    ctaText: "Shop all",
    ctaHref: "#menu-grid",
    order: 0,
    isActive: true,
  },
  {
    type: "image",
    mediaUrl: "/1000.png",
    title: "Eco-Friendly Product Range",
    subtitle: "Compostable and biodegradable packaging choices.",
    ctaText: "Browse Eco",
    ctaHref: "#menu-grid",
    order: 1,
    isActive: true,
  },
  {
    type: "image",
    mediaUrl: "/10002.jpg",
    title: "Designed for Food Delivery",
    subtitle: "Keep food fresh and secure in transit.",
    ctaText: "View Catalogue",
    ctaHref: "/Abhyati catlog (1).pdf",
    order: 2,
    isActive: true,
  },
  {
    type: "video",
    mediaUrl: "/mp_%20(online-video-cutter.com).mp4",
    title: "See Product Quality in Motion",
    subtitle: "Watch the packaging performance overview.",
    ctaText: "Contact Sales",
    ctaHref: "/contact",
    order: 3,
    isActive: true,
  },
];

const ProductsHero = () => {
  const { data: siteContent } = useSiteContent();
  const [activeSlide, setActiveSlide] = useState(null);
  const productSlides = useMemo(() => {
    const configured = (siteContent?.productSlides ?? []).filter((slide) => slide?.mediaUrl);
    if (configured.length >= 2) return configured;
    return DEFAULT_PRODUCT_SLIDES;
  }, [siteContent?.productSlides]);
  const title = activeSlide?.title || "High-Quality Food Packaging Solutions";
  const subtitle = activeSlide?.subtitle || "Paper Bags · Takeaway containers · Sweet boxes";
  const ctaText = activeSlide?.ctaText?.trim() || "Shop all";

  return (
    <section
    aria-label="Products"
    className="relative isolate flex h-[clamp(420px,min(62vh,680px),820px)] flex-col justify-end overflow-hidden bg-surface-raised pb-ds-4 text-center md:h-[clamp(480px,min(58vh,720px),880px)] md:pb-ds-5"
  >
    <MediaCarousel
      slides={productSlides}
      onActiveSlideChange={setActiveSlide}
      overlayClassName="bg-gradient-to-t from-surface-base/40 to-transparent"
      controlsPosition="bottom"
    />

    <div className="relative z-[3] mx-auto flex w-full max-w-4xl flex-col items-center gap-ds-3 px-ds-3 pb-ds-3 pt-24 md:max-w-5xl md:pt-28">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="text-balance font-primary text-ds-3xl font-semibold leading-tight tracking-tight text-text-primary [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] md:text-ds-4xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="max-w-2xl text-ds-lg text-text-primary/90"
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16 }}
      >
        <Button
          variant="primary"
          size="lg"
          className="min-w-[160px] border-0 bg-[#f4783e] font-semibold text-black hover:bg-[#e86b31] hover:brightness-100"
          onClick={() =>
            document.getElementById("menu-grid")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {ctaText}
        </Button>
      </motion.div>
    </div>
  </section>
  );
};

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
