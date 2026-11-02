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
  alternates: {
    canonical: `${siteConfig.url}/ways-to-help`,
  },
};

// Frequently asked questions — every answer below is a plain restatement of
// facts already on the site (site-config.ts, the homepage, and the donate
// panel). Nothing here is invented, so it's safe to also expose as
// FAQPage structured data (see faqJsonLd below).
const faqs = [
  {
    question: "Is Mukti Sanctuary a registered nonprofit?",
    answer: `Yes. ${siteConfig.legalName} is a registered nonprofit association ("Associação") based in ${siteConfig.country}.`,
  },
  {
    question: "Where is the sanctuary located?",
    answer: `${siteConfig.name} currently operates out of a temporary facility in ${siteConfig.location}, while raising funds to buy permanent land in the Greater Lisbon area.`,
  },
  {
    question: "What animals does Mukti Sanctuary care for?",
    answer:
      "The sanctuary rescues and rehabilitates dogs, cats, pigeons, and farm animals, alongside other animals in need.",
  },
  {
    question: "What are the ways to donate?",
    answer:
      "You can give to the land fund on GoFundMe, donate via PayPal, join for €1/month on Teaming, sponsor an animal monthly, or send a direct SEPA bank transfer — see the donate section on the homepage for every option.",
  },
  {
    question: "How can I help if I can't donate right now?",
    answer:
      "You can volunteer on-site, share the sanctuary's animal stories on social media, or donate supplies from the current wishlist — reach out by email to get involved.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function WaysToHelpPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-4">
        <SectionHeading
          level="h1"
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
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                  <option.icon className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-xl">{option.title}</h2>
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

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-8 text-center font-serif text-2xl">
          Frequently asked questions
        </h2>
        <dl className="flex flex-col divide-y divide-border">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-5">
              <dt className="font-serif text-lg">{faq.question}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-muted/60 px-8 py-12 text-center">
          <HandHeart className="h-8 w-8 text-accent-foreground" />
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

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- static, trusted JSON built above from site-config facts, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
