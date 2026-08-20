"use client";

import { useState } from "react";
import { Check, Copy, Heart, Landmark, Repeat } from "lucide-react";

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
    <div id="donate" className={cn("grid gap-6 md:grid-cols-2", className)}>
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <div className="flex items-center gap-2 text-secondary">
            <Heart className="h-5 w-5" />
            <CardTitle>Give a donation</CardTitle>
          </div>
          <CardDescription>
            Processed with 0% platform fees via Stripe and Zeffy — every
            euro goes to animal care, not transaction costs.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full">
            <a href={donation.stripeOneTimeLink}>Give once</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full">
            <a href={donation.stripeMonthlyLink}>
              <Repeat className="h-4 w-4" />
              Become a monthly sponsor
            </a>
          </Button>
          <a
            href={donation.zeffyLink}
            className="text-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Prefer Zeffy? Donate there instead
          </a>
        </CardContent>
      </Card>

      <Card className="flex flex-col justify-between">
        <CardHeader>
          <div className="flex items-center gap-2 text-secondary">
            <Landmark className="h-5 w-5" />
            <CardTitle>Direct bank transfer</CardTitle>
          </div>
          <CardDescription>
            For donors in Portugal and the EU, a direct SEPA transfer sends
            100% of your gift with no intermediary at all.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
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
