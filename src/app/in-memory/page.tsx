import type { Metadata } from "next";
import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/placeholder-image";
import { getAnimals } from "@/lib/data/get-animals";

export const metadata: Metadata = {
  title: "In Memory",
  description:
    "In loving memory of the animals who lived out their lives at Mukti Sanctuary.",
};

export default async function InMemoryPage() {
  const allAnimals = await getAnimals();
  // Setting an animal's status to "In loving memory" in Studio is what
  // moves it here from the main residents page — see README.md's
  // "Content management" section.
  const memorials = allAnimals.filter((a) => a.status === "in-memory");

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-4">
        <SectionHeading
          level="h1"
          eyebrow="In memory"
          title="Remembering the animals who called this place home"
          description="Every animal who has passed through our care left a mark on the sanctuary and on us. This page is for them."
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12 pb-24">
        {memorials.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/40 px-8 py-16 text-center text-muted-foreground">
            This page is ready for real tributes — in the Studio, set an
            animal&apos;s status to &quot;In loving memory&quot; and it will
            show up here automatically.
          </div>
        ) : null}
        <div className="flex flex-col divide-y divide-border">
          {memorials.map((memorial) => (
            <div
              key={memorial.slug}
              className="grid gap-6 py-10 sm:grid-cols-[160px_1fr] sm:items-start"
            >
              {memorial.photoUrl ? (
                <Image
                  src={memorial.photoUrl}
                  alt={memorial.name}
                  width={160}
                  height={160}
                  className="aspect-square w-full max-w-[160px] rounded-lg object-cover"
                />
              ) : (
                <PlaceholderImage
                  label={memorial.name}
                  color={memorial.color}
                  className="aspect-square w-full max-w-[160px]"
                />
              )}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="font-serif text-2xl">{memorial.name}</h2>
                  <span className="text-sm text-muted-foreground">
                    {memorial.species}
                    {memorial.years ? ` · ${memorial.years}` : ""}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {memorial.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
