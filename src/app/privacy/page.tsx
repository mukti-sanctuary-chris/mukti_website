import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/data/site-config";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What information this website collects, and what happens when you use it.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 pb-24">
      <SectionHeading
        level="h1"
        eyebrow="Privacy"
        title="What this website does with your information"
      />

      <div className="mt-10 flex flex-col gap-8 leading-relaxed text-foreground">
        <p>
          This is a short, plain-language summary of what {siteConfig.name}
          &apos;s website itself does — not a full legal privacy policy. It
          hasn&apos;t been reviewed by a lawyer, and it should be before this
          page is treated as a final policy.
        </p>

        <div>
          <h2 className="font-serif text-xl">This site doesn&apos;t use cookies or trackers</h2>
          <p className="mt-2 text-muted-foreground">
            This website does not set cookies, run analytics, or use any
            advertising or tracking scripts of its own. It also loads its
            fonts from its own server rather than Google&apos;s, so simply
            visiting a page on this site does not share your IP address or
            any other information with a third party.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl">This site doesn&apos;t collect personal data directly</h2>
          <p className="mt-2 text-muted-foreground">
            There are no sign-up forms, newsletters, or contact forms on this
            site. The only ways to reach us are an email link (which opens
            your own email app) and links out to our social media pages.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl">Donations and payments happen off this site</h2>
          <p className="mt-2 text-muted-foreground">
            When you donate, this site links you out to GoFundMe, PayPal, or
            Stripe to complete the transaction on their platform. Those
            services handle and store your payment and contact information
            under their own privacy policies, not ours — we&apos;d recommend
            reading{" "}
            <a
              href="https://www.gofundme.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-accent-foreground"
            >
              GoFundMe&apos;s
            </a>
            ,{" "}
            <a
              href="https://www.paypal.com/us/legalhub/privacy-full"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-accent-foreground"
            >
              PayPal&apos;s
            </a>
            , or{" "}
            <a
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-accent-foreground"
            >
              Stripe&apos;s
            </a>{" "}
            privacy policy before donating through them.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl">Questions</h2>
          <p className="mt-2 text-muted-foreground">
            If you have a question about any of this, email us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline underline-offset-2 hover:text-accent-foreground"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
