import type { Metadata } from "next";
import Link from "next/link";
import { Backpack, HandHeart, Megaphone, Sprout } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/data/site-config";

const options = [
  {
    icon: Sprout,
    title: "Volunteer on-site",
    description:
      "Join our regular volunteer days for feeding, grooming, fencing repairs, and general sanctuary upkeep. No experience necessary — just a willingness to get a little muddy.",
    action: { label: "Ask about volunteering", href: `mailto:${siteConfig.email}` },
  },
  {
    icon: Megaphone,
    title: "Share our animals' stories",
    description:
      "Follow us and share a rescue story with your network. Every share introduces new people to the sanctuary and its residents.",
    action: { label: "Follow on Instagram", href: siteConfig.social.instagram },
  },
  {
    icon: Backpack,
    title: "Donate supplies from our wishlist",
    description:
      "Hay, feed, bedding, and veterinary supplies are always needed. Reach out for our current wishlist and drop-off details.",
    action: { label: "Request the wishlist", href: `mailto:${siteConfig.email}` },
  },
  // Merch card removed for now — re-add once there's a real shop link to
  // point it at (see GitHub issue #5).
];

export const metadata: Metadata = {
  title: "Ways to Help",
  description:
    "Can't donate right now? There are plenty of ways to support Mukti Sanctuary that don't cost a thing.",
};

export default function WaysToHelpPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-4">
        <SectionHeading
          eyebrow="Can't donate right now?"
          title="There are just as many ways to help that cost nothing but time"
          description="Money isn't the only way to support the sanctuary. Here's how else you can make a difference for our animals."
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {options.map((option) => (
            <Card key={option.title}>
              <CardContent className="flex flex-col gap-3 pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/20 text-secondary">
                  <option.icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl">{option.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="mt-2 w-fit"
                >
                  <a href={option.action.href}>{option.action.label}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-muted/60 px-8 py-12 text-center">
          <HandHeart className="h-8 w-8 text-secondary" />
          <h2 className="max-w-xl font-serif text-2xl">
            Ready to give financially instead?
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Every donation — big or small — goes directly to food, medical
            care, and shelter for our animals.
          </p>
          <Button asChild size="lg">
            <Link href="/#donate">Make a donation</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
