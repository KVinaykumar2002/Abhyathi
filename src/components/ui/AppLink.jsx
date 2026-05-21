import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * EATnaked link — design.md link component rules
 */
export default function AppLink({
  to,
  href,
  external = false,
  disabled = false,
  className,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex min-h-[44px] items-center font-primary text-ds-md text-text-secondary",
    "transition-colors duration-fast hover:text-text-primary hover:underline",
    "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2",
    disabled && "pointer-events-none text-text-disabled no-underline",
    className
  );

  if (href || external) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {children}
        {external && <span className="sr-only"> (opens in new window)</span>}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} aria-disabled={disabled || undefined} {...props}>
      {children}
    </Link>
  );
}
