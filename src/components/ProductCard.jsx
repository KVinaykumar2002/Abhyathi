import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProductCard({ item, className }) {
  const soldOut = Boolean(item.soldOut);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "group overflow-hidden rounded-ds-md border border-border-muted bg-surface-raised",
        "transition-[border-color,box-shadow] duration-fast hover:shadow-xl hover:border-text-secondary/30",
        className
      )}
    >
      <div className="relative h-44 overflow-hidden bg-surface-base">
        {soldOut && (
          <span className="absolute right-ds-2 top-ds-2 z-10 rounded-ds-xl border border-border-muted bg-surface-raised px-ds-2 py-ds-1 text-ds-xs font-bold uppercase tracking-wide text-feedback-error">
            Sold out
          </span>
        )}
        <img
          src={item.image}
          alt={item.name}
          className={cn(
            "h-full w-full object-cover transition-transform duration-slow group-hover:scale-105",
            soldOut && "opacity-55 grayscale"
          )}
          loading="lazy"
        />
      </div>

      <div className="p-ds-3">
        <div className="mb-ds-2 flex items-start justify-between gap-ds-2">
          <span className="font-primary text-ds-lg font-semibold text-text-secondary">
            From ${item.price}
          </span>
          <span className="shrink-0 rounded-ds-xl border border-border-muted px-ds-2 py-ds-1 text-ds-xs font-medium uppercase tracking-wider text-text-disabled">
            {item.category}
          </span>
        </div>

        <h3 className="mb-ds-2 font-primary text-ds-lg leading-snug text-text-primary transition-colors duration-fast group-hover:text-text-secondary">
          {item.name}
        </h3>

        <p className="line-clamp-2 text-ds-sm leading-relaxed text-text-disabled">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}
