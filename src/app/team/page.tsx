import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { animals, teamMembers } from "@/lib/data/animals";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the animal residents and human caretakers of Mukti Sanctuary.",
};

const statusLabel: Record<string, string> = {
  resident: "Permanent resident",
  sponsorable: "Available for sponsorship",
  adoptable: "Available for adoption",
};

export default function TeamPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-4">
        <SectionHeading
          eyebrow="Meet the team"
          title="The residents and people behind Mukti Sanctuary"
          description="From the animals who call this place home to the humans who care for them every day — this is who makes the sanctuary run."
        />
      </section>

      {/* Animal residents */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 font-serif text-2xl">Animal residents</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {animals.map((animal) => (
            <Card key={animal.slug} className="overflow-hidden">
              <PlaceholderImage
                label={animal.name}
                color={animal.color}
                className="aspect-[4/3] w-full rounded-none"
              />
              <CardContent className="flex flex-col gap-2 pt-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-lg">{animal.name}</h3>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    {animal.species}
                  </span>
                </div>
                <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {statusLabel[animal.status]}
                </span>
                <p className="text-sm text-muted-foreground">{animal.bio}</p>
                {animal.status === "sponsorable" ? (
                  <Button asChild size="sm" variant="secondary" className="mt-1">
                    <Link href="/#donate">
                      <ShieldCheck className="h-4 w-4" />
                      Become their Guardian
                    </Link>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Human team */}
      <section className="mx-auto max-w-6xl px-6 py-12 pb-24">
        <h2 className="mb-8 font-serif text-2xl">Our human team</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((person) => (
            <Card key={person.slug} className="overflow-hidden">
              <PlaceholderImage
                label={person.name}
                color="#5c6b52"
                className="aspect-square w-full rounded-none"
              />
              <CardContent className="flex flex-col gap-1 pt-5">
                <h3 className="font-serif text-lg">{person.name}</h3>
                <span className="text-xs uppercase tracking-wide text-secondary">
                  {person.role}
                </span>
                <p className="mt-1 text-sm text-muted-foreground">
                  {person.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
