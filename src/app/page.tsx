import Link from "next/link";
import { ArrowRight, HandHeart, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/placeholder-image";
import { DonatePanel } from "@/components/donate-panel";
import { siteConfig } from "@/lib/data/site-config";

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

      {/* Mission and Vision — copy sourced from muktisanctuary.com's own
          "Mission and Vision" section, lightly tightened. See issue #8. */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="font-serif text-3xl">Mission and Vision</h2>
        <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            For animals, we provide rescue, shelter, medical care,
            rehabilitation, and the opportunity to live with dignity — from
            dogs and cats to pigeons, farm animals, and other creatures in
            need. We promote responsible adoption, veterinary assistance,
            and TNR (trap-neuter-return) campaigns, while educating and
            supporting caretakers to ensure long-term animal welfare.
          </p>
          <p>
            For people, we believe rescue and healing extend beyond
            animals. Join us as a volunteer, a donor, or simply a visitor —
            there&apos;s a place for you in this work too.
          </p>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading
            eyebrow="Support the sanctuary"
            title="Your donation goes straight to animal care"
            description="Help us secure permanent land, sponsor a resident monthly, or send a direct bank transfer — every option reaches the sanctuary with minimal fees."
            className="mb-10"
          />
          <DonatePanel />
        </div>
      </section>

      {/* Meet the residents teaser */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <SectionHeading
          eyebrow="Every rescue has a name"
          title="Meet the residents"
          description="From dogs and cats to pigeons and farm animals — every resident at Mukti has a story, a name, and ongoing care needs. Get to know them, and the humans who look after them."
          className="mx-auto mb-8 max-w-2xl"
        />
        <Button asChild size="lg">
          <Link href="/team">
            Meet every animal <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
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
