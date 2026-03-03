interface NumberBadgeProps {
  value: number | string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function NumberBadge({
  value,
  className = "",
  size = "md",
}: NumberBadgeProps) {
  const sizeClass =
    size === "sm"
      ? "h-9 min-w-9 px-2 text-sm"
      : size === "lg"
        ? "h-14 min-w-14 px-3 text-2xl"
        : "h-11 min-w-11 px-3 text-lg";

  const formatted =
    typeof value === "number" ? String(value).padStart(2, "0") : value;

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border border-black/85 bg-[var(--color-court)] font-display leading-none tracking-tight text-white shadow-[0_3px_12px_rgba(2,2,2,0.14)] ${sizeClass} ${className}`}
      aria-hidden="true"
    >
      {formatted}
    </div>
  );
}
