import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, Package, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { viewportScrollReplay } from "@/lib/motionPresets";
import { useSiteContent } from "@/hooks/useSiteContent";

export const DEFAULT_TRUST_STATS = {
  customers: 5000,
  products: 1500,
  rating: 5,
};

function AnimatedNumber({ target, suffix = "", inView }) {
  const [text, setText] = useState(`0${suffix}`);

  useEffect(() => {
    if (!inView) {
      setText(`0${suffix}`);
      return undefined;
    }
    setText(`0${suffix}`);
    const ctrl = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setText(`${Math.round(latest)}${suffix}`),
    });
    return () => ctrl.stop();
  }, [inView, target, suffix]);

  return text;
}

function Stars({ count, className }) {
  const filled = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${filled} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4 md:h-5 md:w-5",
            i < filled ? "fill-text-secondary text-text-secondary" : "text-current opacity-30"
          )}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

function TrustStatItem({ index, children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...viewportScrollReplay, margin: "-5% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Shared trust stats for About + Testimonials.
 * @param {"light" | "dark"} variant
 */
export default function TrustStats({ variant = "light", className }) {
  const { data: siteContent } = useSiteContent();
  const stats = {
    customers: siteContent?.testimonialStats?.customers ?? DEFAULT_TRUST_STATS.customers,
    products: siteContent?.testimonialStats?.products ?? DEFAULT_TRUST_STATS.products,
    rating: siteContent?.testimonialStats?.rating ?? DEFAULT_TRUST_STATS.rating,
  };

  const ref = useRef(null);
  const inView = useInView(ref, {
    ...viewportScrollReplay,
    margin: "-8% 0px",
    amount: 0.35,
  });

  const isDark = variant === "dark";
  const iconWrap = isDark
    ? "border-white/15 bg-white/5 text-text-secondary"
    : "border-border-muted bg-text-secondary/10 text-text-secondary";
  const valueClass = isDark
    ? "text-white"
    : "text-text-primary";
  const labelClass = isDark
    ? "text-white/50"
    : "text-text-disabled";
  const leadClass = isDark
    ? "text-white/70"
    : "text-text-disabled";

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8",
        className
      )}
    >
      <TrustStatItem
        index={0}
        className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left"
      >
        <span className={cn("mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border sm:mb-0", iconWrap)}>
          <Users className="h-7 w-7" strokeWidth={1.75} />
        </span>
        <div>
          <p className={cn("text-sm font-medium leading-snug", leadClass)}>
            Trusted Food packaging partner for
          </p>
          <p className={cn("mt-1 text-3xl font-bold tracking-tight md:text-4xl", valueClass)}>
            <AnimatedNumber target={stats.customers} suffix="+" inView={inView} />{" "}
            <span className="text-[0.55em] font-semibold uppercase tracking-wide">Customers</span>
          </p>
        </div>
      </TrustStatItem>

      <TrustStatItem
        index={1}
        className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left"
      >
        <span className={cn("mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border sm:mb-0", iconWrap)}>
          <Package className="h-7 w-7" strokeWidth={1.75} />
        </span>
        <div>
          <p className={cn("text-sm font-semibold uppercase tracking-wide", labelClass)}>
            Products
          </p>
          <p className={cn("mt-1 text-4xl font-bold tracking-tight md:text-5xl", valueClass)}>
            <AnimatedNumber target={stats.products} suffix="+" inView={inView} />
          </p>
        </div>
      </TrustStatItem>

      <TrustStatItem
        index={2}
        className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left"
      >
        <span className={cn("mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border sm:mb-0", iconWrap)}>
          <Star className="h-7 w-7" strokeWidth={1.75} />
        </span>
        <div>
          <p className={cn("text-sm font-semibold uppercase tracking-wide", labelClass)}>
            Customer Rating
          </p>
          <p className={cn("mt-1 flex flex-wrap items-center justify-center gap-2 text-4xl font-bold tracking-tight md:justify-start md:text-5xl", valueClass)}>
            <AnimatedNumber target={stats.rating} suffix="" inView={inView} />
            <Stars count={stats.rating} />
          </p>
        </div>
      </TrustStatItem>
    </div>
  );
}
