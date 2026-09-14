import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { revalidateSecret } from "@/sanity/env";

/**
 * Sanity calls this the instant Beth saves an animal, so the live site
 * updates within a second or two instead of waiting for the 60s fallback
 * revalidation in src/lib/data/get-animals.ts. See README.md's "Content
 * management" section for the one-time webhook setup this depends on
 * (Sanity's dashboard → API → Webhooks, pointed at this route).
 */
export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      request,
      revalidateSecret,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    // Next.js 16 requires a cache-life profile as the second argument.
    // { expire: 0 } expires the data immediately, which is what we want
    // for a webhook-triggered update (vs. the default stale-while-
    // revalidate behavior of a plain profile name).
    revalidateTag(body._type, { expire: 0 });

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Error revalidating from Sanity webhook:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
