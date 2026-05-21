import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * EATnaked text input — design.md input component rules
 */
const sizeStyles = {
  default: {
    label: "text-ds-sm",
    input: "text-ds-md min-h-[44px]",
    hint: "text-ds-sm",
  },
  lg: {
    label: "text-base font-medium",
    input: "text-lg min-h-[48px]",
    hint: "text-base",
  },
};

const Input = forwardRef(function Input(
  {
    label,
    helper,
    error,
    disabled = false,
    loading = false,
    size = "default",
    id,
    className,
    wrapperClassName,
    ...props
  },
  ref
) {
  const inputId = id || props.name;
  const errorId = error && inputId ? `${inputId}-error` : undefined;
  const helperId = helper && inputId ? `${inputId}-helper` : undefined;
  const s = sizeStyles[size] ?? sizeStyles.default;

  return (
    <div className={cn("flex flex-col gap-ds-1 font-primary", wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className={cn(s.label, "text-text-primary")}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          disabled={disabled || loading}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={[errorId, helperId].filter(Boolean).join(" ") || undefined}
          className={cn(
            "w-full rounded-ds-sm border border-border-muted bg-surface-raised px-ds-3 py-ds-2",
            s.input,
            "text-text-primary placeholder:text-text-disabled",
            "transition-[border-color,box-shadow] duration-fast",
            "hover:border-text-secondary/30",
            "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2 focus-visible:border-text-secondary",
            "disabled:pointer-events-none disabled:opacity-60",
            error && "border-feedback-error",
            className
          )}
          {...props}
        />
        {loading && (
          <span
            className="pointer-events-none absolute right-ds-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-text-secondary border-t-transparent"
            aria-hidden
          />
        )}
      </div>
      {helper && !error && (
        <p id={helperId} className={cn(s.hint, "text-text-disabled")}>
          {helper}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className={cn(s.hint, "text-feedback-error")}>
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
