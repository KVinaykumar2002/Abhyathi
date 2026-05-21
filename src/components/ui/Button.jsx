import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-text-secondary text-surface-base border-transparent hover:brightness-110 active:scale-[0.98]",
  secondary:
    "bg-surface-raised text-text-primary border-border-muted hover:border-text-secondary/50",
  ghost:
    "bg-transparent text-text-secondary border-transparent hover:text-text-primary",
  danger:
    "bg-surface-raised text-text-secondary border-feedback-error hover:border-text-secondary",
};

const sizes = {
  sm: "min-h-[44px] px-ds-3 py-ds-2 text-ds-sm gap-ds-1",
  md: "min-h-[44px] px-ds-3 py-ds-2 text-ds-md gap-ds-1",
  lg: "min-h-[44px] px-ds-4 py-ds-2 text-ds-lg gap-ds-2",
};

/**
 * EATnaked button — design.md states: default, hover, focus-visible, active, disabled, loading, error
 */
const buttonClassName = (variant, size, error, className) =>
  cn(
    "inline-flex items-center justify-center rounded-ds-sm border font-primary font-normal",
    "transition-[background-color,border-color,transform,filter] duration-fast",
    "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:text-text-disabled disabled:opacity-60",
    error && "border-feedback-error",
    variants[variant],
    sizes[size],
    className
  );

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    className,
    disabled = false,
    loading = false,
    error = false,
    type = "button",
    to,
    children,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;
  const classes = buttonClassName(variant, size, error, className);

  const content = loading ? (
    <>
      <span
        className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        aria-hidden
      />
      <span className="sr-only">Loading</span>
      {children}
    </>
  ) : (
    children
  );

  if (to) {
    return (
      <Link
        ref={ref}
        to={to}
        className={cn(classes, isDisabled && "pointer-events-none opacity-60")}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
});

export default Button;
