import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { productImageSrc } from "@/lib/productImage";

function FavoriteButton({ disabled }) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (disabled) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite((v) => !v);
      }}
      className={cn(
        "absolute left-3 top-3 z-10 flex h-[53px] w-[53px] items-center justify-center rounded-full",
        "border border-white/10 bg-white/10 backdrop-blur-md transition-all duration-300",
        "hover:bg-white/20",
        isFavorite ? "text-red-500" : "text-white"
      )}
      aria-label="Add to favorites"
    >
      <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
    </button>
  );
}

export default function ProductCard({ item, className, index = 0 }) {
  const soldOut = Boolean(item.soldOut);
  const priceLabel = soldOut
    ? "Sold out"
    : `From $${Number(item.price).toFixed(2)}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      className={cn(
        "group relative flex h-full w-full max-w-[384px] flex-col rounded-[26px] bg-white p-3",
        "transition-shadow duration-300 hover:shadow-xl",
        className
      )}
    >
      <div className="relative aspect-[6/5] w-full overflow-hidden rounded-[26px] bg-neutral-100">
        <FavoriteButton disabled={soldOut} />
        {soldOut && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-[#0D0C0C]/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
            Sold out
          </span>
        )}
        <img
          src={productImageSrc(item.image)}
          alt={item.name}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
            soldOut && "opacity-55 grayscale"
          )}
          loading="lazy"
        />
      </div>

      <div className="mt-6 flex flex-1 flex-col px-1 pb-1">
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="min-h-[2.75rem] text-[28px] font-semibold leading-tight tracking-[-1.2px] text-[#0D0C0C] line-clamp-2">
            {item.name}
          </h3>
          <p className="min-h-[2.5rem] line-clamp-2 text-[15px] leading-tight text-[#0D0C0C]/60">
            {item.description}
          </p>
          {item.category && (
            <span className="text-xs font-medium uppercase tracking-wider text-[#0D0C0C]/40">
              {item.category}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-end justify-between gap-3">
          <span
            className={cn(
              "text-[17px] font-medium",
              soldOut ? "text-red-600" : "text-[#0D0C0C]"
            )}
          >
            {priceLabel}
          </span>

          <Link
            to="/contact"
            className={cn(
              "flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#0D0C0C] text-white",
              "transition-transform duration-300 hover:scale-105 active:scale-95",
              "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0D0C0C] focus-visible:outline-offset-2",
              soldOut && "pointer-events-none opacity-40"
            )}
            aria-label={`Enquire about ${item.name}`}
          >
            <ArrowRight className="h-[25px] w-[25px]" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
