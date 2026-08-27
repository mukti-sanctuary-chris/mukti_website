"use client";

import { useState } from "react";
import { Check, Copy, Home, Landmark, PawPrint } from "lucide-react";

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
          <div className="flex items-center gap-2 text-secondary">
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
        <CardContent>
          <Button asChild size="lg">
            <a href={donation.gofundmeLink} target="_blank" rel="noreferrer">
              Give to the land fund on GoFundMe
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Monthly sponsorship tiers */}
      <div className="grid gap-6 md:grid-cols-2">
        {donation.sponsorshipTiers.map((tier) => (
          <Card key={tier.label} className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center gap-2 text-secondary">
                <PawPrint className="h-5 w-5" />
                <CardTitle>{tier.label}</CardTitle>
              </div>
              <CardDescription>
                Give monthly toward food, medical care, and daily
                enrichment.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {tier.amounts.map((tierAmount) => (
                <Button key={tierAmount.href} asChild variant="outline">
                  <a
                    href={tierAmount.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {tierAmount.amount}
                  </a>
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Direct bank transfer */}
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <div className="flex items-center gap-2 text-secondary">
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
