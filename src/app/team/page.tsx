import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAnimals } from "@/lib/data/get-animals";
import { getTeamMembers } from "@/lib/data/get-team";
import { statusLabel, type Animal, type TeamMember } from "@/lib/data/animals";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the animal residents and human caretakers of Mukti Sanctuary.",
};

// Shows an animal's real Sanity photo when it has one, falling back to the
// brand-color placeholder swatch otherwise — see AnimalPhoto usage below.
function AnimalPhoto({ animal }: { animal: Animal }) {
  if (animal.photoUrl) {
    return (
      <Image
        src={animal.photoUrl}
        alt={animal.name}
        width={400}
        height={300}
        className="aspect-[4/3] w-full object-cover"
      />
    );
  }
  return (
    <PlaceholderImage
      label={animal.name}
      color={animal.color}
      className="aspect-[4/3] w-full rounded-none"
    />
  );
}

// Same idea as AnimalPhoto, for the human team: a real Sanity photo when
// one's been uploaded, otherwise the same brand-color placeholder swatch
// every person previously always showed.
function PersonPhoto({ person }: { person: TeamMember }) {
  if (person.photoUrl) {
    return (
      <Image
        src={person.photoUrl}
        alt={person.name}
        width={400}
        height={400}
        className="aspect-square w-full object-cover"
      />
    );
  }
  return (
    <PlaceholderImage
      label={person.name}
      color="#5c6b52"
      className="aspect-square w-full rounded-none"
    />
  );
}

export default async function TeamPage() {
  const [allAnimals, teamMembers] = await Promise.all([
    getAnimals(),
    getTeamMembers(),
  ]);
  // Setting an animal's status to "In loving memory" in Studio is what
  // moves it off this page and onto /in-memory — see README.md's "Content
  // management" section.
  const residents = allAnimals.filter(
    (a) => a.status === "rescued" || a.status === "permanent-resident",
  );
  const adopted = allAnimals.filter((a) => a.status === "adopted");

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-4">
        <SectionHeading
          level="h1"
          eyebrow="Meet the team"
          title="The residents and people behind Mukti Sanctuary"
          description="From the animals who call this place home to the humans who care for them every day — this is who makes the sanctuary run."
        />
      </section>

      {/* Animal residents */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 font-serif text-2xl">Animal residents</h2>
        {residents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/40 px-8 py-16 text-center text-muted-foreground">
            No animals to show yet — add one in the Studio and it&apos;ll
            show up here automatically.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {residents.map((animal) => (
              <Card key={animal.slug} className="overflow-hidden">
                <AnimalPhoto animal={animal} />
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
                  <p className="text-sm text-muted-foreground">
                    {animal.bio}
                  </p>
                  {animal.status === "rescued" ? (
                    <Button
                      asChild
                      size="sm"
                      variant="secondary"
                      className="mt-1"
                    >
                      <Link href="/#donate">
                        <ShieldCheck className="h-4 w-4" />
                        Support monthly
                      </Link>
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Recently adopted — only shown once an animal is actually marked
          "Adopted" in Studio, so this section stays out of the way until
          there's something real to put in it. */}
      {adopted.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-8 font-serif text-2xl">Recently adopted</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adopted.map((animal) => (
              <Card key={animal.slug} className="overflow-hidden">
                <AnimalPhoto animal={animal} />
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
                  <p className="text-sm text-muted-foreground">
                    {animal.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {/* Human team */}
      <section className="mx-auto max-w-6xl px-6 py-12 pb-24">
        <h2 className="mb-8 font-serif text-2xl">Our human team</h2>
        {teamMembers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/40 px-8 py-16 text-center text-muted-foreground">
            No team members to show yet — add one in the Studio and
            it&apos;ll show up here automatically.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((person) => (
              <Card key={person.slug} className="overflow-hidden">
                <PersonPhoto person={person} />
                <CardContent className="flex flex-col gap-1 pt-5">
                  <h3 className="font-serif text-lg">{person.name}</h3>
                  <span className="text-xs uppercase tracking-wide text-accent-foreground">
                    {person.role}
                  </span>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {person.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
