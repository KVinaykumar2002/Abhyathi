import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MotionLink = motion(Link);

/**
 * Pill CTA (reversed palette): black capsule, orange disc + white arrow, orange label.
 */
export default function OrderNowButton({
  to = "/menu",
  children = "Order Now",
  className,
}) {
  return (
    <MotionLink
      to={to}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center overflow-visible rounded-full bg-neutral-950 py-[5px] pl-[5px] pr-9 sm:pr-10",
        "ring-1 ring-white/15",
        className
      )}
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f35e16] text-white shadow-[6px_0_28px_rgba(243,94,22,0.45)] sm:h-11 sm:w-11">
        <span
          className="pointer-events-none absolute left-[52%] top-1/2 h-[220%] max-h-[5rem] w-[180%] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_left,rgba(243,94,22,0.55)_0%,rgba(243,94,22,0.18)_40%,transparent_72%)] blur-md sm:max-h-[5.5rem]"
          aria-hidden
        />
        <ArrowRight
          className="relative translate-x-px"
          size={17}
          strokeWidth={2}
          aria-hidden
        />
      </span>
      <span className="relative pl-3 pr-1 text-[15px] font-semibold tracking-tight text-[#f35e16] sm:pl-4 sm:text-base">
        {children}
      </span>
    </MotionLink>
  );
}
