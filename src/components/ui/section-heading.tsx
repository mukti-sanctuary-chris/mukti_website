import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  level = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Heading level for `title`. Defaults to "h2" for sub-section headings
   * (e.g. the homepage's "Mission and Vision" block). Pages that use
   * SectionHeading as their ONLY top-level heading — Team, In Memory,
   * Ways to Help — must pass level="h1" instead, so each page has exactly
   * one h1 and the rest of that page's headings nest under it without
   * skipping a level. See the accessibility pass following
   * fredericolopes.com/acessibilidade-digital and WCAG 2.1 AA (1.3.1). */
  level?: "h1" | "h2";
}) {
  const Heading = level;
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground">
          {eyebrow}
        </span>
      ) : null}
      <Heading className="max-w-2xl text-3xl leading-tight sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
