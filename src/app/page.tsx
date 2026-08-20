import Link from "next/link";
import { ArrowRight, HandHeart, ShieldCheck, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/placeholder-image";
import { DonatePanel } from "@/components/donate-panel";
import { Card, CardContent } from "@/components/ui/card";
import { animals } from "@/lib/data/animals";
import { siteConfig } from "@/lib/data/site-config";

const guardianAnimals = animals.filter((a) => a.status === "sponsorable");

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full bg-accent/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              {siteConfig.country} · Non-profit sanctuary
            </span>
            <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              {siteConfig.description} Every animal here has a name, a story,
              and a future — thanks to people like you.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg">
                <Link href="#donate">
                  Donate now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/ways-to-help">Other ways to help</Link>
              </Button>
            </div>
          </div>
          <PlaceholderImage
            label={siteConfig.name}
            color="#2f4a3c"
            className="aspect-[4/3] w-full"
          />
        </div>
      </section>

      {/* Donation CTA */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Support the sanctuary"
            title="Your donation goes straight to animal care"
            description="We process donations through Stripe and Zeffy with zero platform fees, and accept direct bank transfers for donors in the EU."
            className="mb-10"
          />
          <DonatePanel />
        </div>
      </section>

      {/* Guardian section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="The Guardian Program"
          title="Become a Guardian for one of our animals"
          description="Guardians provide monthly support for a specific resident's food, medical care, and enrichment — and get regular updates on their progress."
          className="mb-10"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guardianAnimals.map((animal) => (
            <Card key={animal.slug} className="overflow-hidden">
              <PlaceholderImage
                label={animal.name}
                color={animal.color}
                className="aspect-square w-full rounded-none"
              />
              <CardContent className="flex flex-col gap-2 pt-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-lg">{animal.name}</h3>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    {animal.species}
                  </span>
                </div>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {animal.bio}
                </p>
                <Button asChild size="sm" variant="secondary" className="mt-2">
                  <Link href="#donate">
                    <ShieldCheck className="h-4 w-4" />
                    Become their Guardian
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="ghost">
            <Link href="/team">
              Meet every animal <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Other ways to help teaser */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 rounded-2xl bg-primary px-8 py-12 text-primary-foreground sm:grid-cols-3 sm:items-center">
          <div className="sm:col-span-2">
            <div className="mb-3 flex items-center gap-2 text-accent">
              <HandHeart className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Can&apos;t donate right now?
              </span>
            </div>
            <h2 className="font-serif text-2xl leading-tight sm:text-3xl">
              There are just as many ways to help that don&apos;t cost a
              thing.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
              Volunteer on-site, share our animals&apos; stories, or donate
              supplies from our wishlist.
            </p>
          </div>
          <div className="flex sm:justify-end">
            <Button asChild size="lg" variant="secondary">
              <Link href="/ways-to-help">
                <Sprout className="h-4 w-4" />
                See how
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
