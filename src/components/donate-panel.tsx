"use client";

import { useState } from "react";
import Script from "next/script";
import { Check, Copy, Home, Landmark, PawPrint, Users } from "lucide-react";

import { siteConfig } from "@/lib/data/site-config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

function CopyableField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the value is still selectable/readable.
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-4 py-3">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="truncate font-mono text-sm">{value}</p>
      </div>
      <button
        onClick={handleCopy}
        className="shrink-0 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label={`Copy ${label}`}
        type="button"
      >
        {copied ? (
          <Check className="h-4 w-4 text-primary" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      {/* Announces the copy result to screen reader users — the icon swap
          above is a purely visual cue otherwise (WCAG 2.1 AA 4.1.3). */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${label} copied` : ""}
      </span>
    </div>
  );
}

export function DonatePanel({ className }: { className?: string }) {
  const { donation } = siteConfig;

  return (
    <div id="donate" className={cn("flex flex-col gap-6", className)}>
      {/* Primary: the land fund */}
      <Card className="border-secondary/40 bg-secondary/5">
        <CardHeader>
          <div className="flex items-center gap-2 text-accent-foreground">
            <Home className="h-5 w-5" />
            <CardTitle>Help us buy our forever home</CardTitle>
          </div>
          <CardDescription>
            We&apos;ve outgrown our temporary space and are raising funds for
            the down payment on permanent land in the Greater Lisbon area —
            with room for every animal who needs us. Follow live progress on
            GoFundMe.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={donation.gofundmeLink} target="_blank" rel="noreferrer">
                Give to the land fund on GoFundMe
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={donation.paypalLink} target="_blank" rel="noreferrer">
                Donate via PayPal
              </a>
            </Button>
          </div>

          {/* GoFundMe's own official widget — shows the live progress bar
              and raised amount, pulled straight from GoFundMe's own script
              rather than a number we'd have to keep updating by hand (see
              the comment on donation.gofundmeWidgetUrl in site-config.ts).
              next/script with afterInteractive loads the embed script once,
              after hydration, without blocking the rest of the page. */}
          <div
            className="gfm-embed mx-auto"
            data-url={donation.gofundmeWidgetUrl}
          />
          <Script
            src="https://www.gofundme.com/static/js/embed.js"
            strategy="afterInteractive"
          />
        </CardContent>
      </Card>

      {/* Teaming.net — the lowest-commitment way to give: €1/month,
          charged automatically, cancel anytime. */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-accent-foreground">
            <Users className="h-5 w-5" />
            <CardTitle>Join our Team for €1 a month</CardTitle>
          </div>
          <CardDescription>
            Teaming is the easiest way to help — just €1 a month, charged
            automatically, cancel anytime. Small amounts from many people
            add up fast.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="lg" variant="outline">
            <a href={donation.teamingLink} target="_blank" rel="noreferrer">
              Join on Teaming
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Monthly sponsorship tiers — semantic list markup (ul/li) rather
          than plain divs, so the tier names and amounts read as a proper
          list to search engines, AI crawlers, and assistive tech. */}
      <ul className="grid list-none gap-6 p-0 md:grid-cols-2">
        {donation.sponsorshipTiers.map((tier) => (
          <li key={tier.label}>
            <Card className="flex h-full flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-2 text-accent-foreground">
                  <PawPrint className="h-5 w-5" />
                  <CardTitle>{tier.label}</CardTitle>
                </div>
                <CardDescription>
                  Give monthly toward food, medical care, and daily
                  enrichment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2 list-none p-0">
                  {tier.amounts.map((tierAmount) => (
                    <li key={tierAmount.href}>
                      <Button asChild variant="outline">
                        <a
                          href={tierAmount.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {tierAmount.amount}
                        </a>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      {/* Direct bank transfer */}
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <div className="flex items-center gap-2 text-accent-foreground">
            <Landmark className="h-5 w-5" />
            <CardTitle>Direct bank transfer</CardTitle>
          </div>
          <CardDescription>
            For donors in Portugal and the EU, a direct SEPA transfer sends
            your gift with no intermediary at all.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-3">
          <CopyableField
            label="Account name"
            value={donation.bank.accountName}
          />
          <CopyableField label="IBAN" value={donation.bank.iban} />
          <CopyableField label="BIC / SWIFT" value={donation.bank.bic} />
        </CardContent>
      </Card>
    </div>
  );
}
