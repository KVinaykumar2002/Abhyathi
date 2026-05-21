import { cn } from "@/lib/utils";

/**
 * EATnaked card — design.md card component rules
 */
export default function Card({
  as: Component = "article",
  interactive = false,
  compact = false,
  loading = false,
  error = false,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        "rounded-ds-md border border-border-muted bg-surface-raised font-primary",
        "transition-[border-color,box-shadow] duration-fast",
        compact ? "p-ds-2" : "p-ds-3",
        interactive &&
          "cursor-pointer hover:border-text-secondary/40 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2",
        loading && "pointer-events-none opacity-70",
        error && "border-t-2 border-t-feedback-error",
        className
      )}
      aria-busy={loading || undefined}
      {...props}
    >
      {children}
    </Component>
  );
}
