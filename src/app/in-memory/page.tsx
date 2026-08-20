import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/placeholder-image";
import { memorials } from "@/lib/data/memorials";

export const metadata: Metadata = {
  title: "In Memory",
  description:
    "In loving memory of the animals who lived out their lives at Mukti Sanctuary.",
};

export default function InMemoryPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-4">
        <SectionHeading
          eyebrow="In memory"
          title="Remembering the animals who called this place home"
          description="Every animal who has passed through our care left a mark on the sanctuary and on us. This page is for them."
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12 pb-24">
        <div className="flex flex-col divide-y divide-border">
          {memorials.map((memorial) => (
            <div
              key={memorial.slug}
              className="grid gap-6 py-10 sm:grid-cols-[160px_1fr] sm:items-start"
            >
              <PlaceholderImage
                label={memorial.name}
                color={memorial.color}
                className="aspect-square w-full max-w-[160px]"
              />
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="font-serif text-2xl">{memorial.name}</h2>
                  <span className="text-sm text-muted-foreground">
                    {memorial.species} · {memorial.years}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {memorial.tribute}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
