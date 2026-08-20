import { cn } from "@/lib/utils";

/**
 * Stand-in for real photography. Renders a soft gradient swatch with the
 * subject's initial so pages have a believable layout before real photos
 * are dropped into /public and swapped in via next/image.
 */
export function PlaceholderImage({
  label,
  color = "#2f4a3c",
  className,
}: {
  label: string;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-lg",
        className,
      )}
      style={{
        background: `linear-gradient(160deg, ${color}33, ${color}b3)`,
      }}
      role="img"
      aria-label={label}
    >
      <span className="font-serif text-4xl text-white/90">
        {label.charAt(0)}
      </span>
    </div>
  );
}
