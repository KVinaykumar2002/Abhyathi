import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MotionLink = motion(Link);

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
        "group relative inline-flex min-h-[44px] items-center overflow-visible rounded-ds-xl bg-surface-raised py-ds-1 pl-ds-1 pr-ds-4",
        "ring-1 ring-border-muted transition-colors duration-fast",
        "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2",
        className
      )}
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-text-secondary text-surface-base sm:h-11 sm:w-11">
        <ArrowRight size={17} strokeWidth={2} aria-hidden />
      </span>
      <span className="relative pl-ds-2 pr-ds-1 text-ds-md font-semibold tracking-tight text-text-secondary">
        {children}
      </span>
    </MotionLink>
  );
}
