import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const builder =
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Resolves a Sanity image reference to a URL, or undefined if Sanity
 * isn't configured or the animal has no photo — callers fall back to
 * PlaceholderImage in that case. */
export function urlForImage(source?: Image | null) {
  if (!builder || !source) return undefined;
  return builder.image(source).auto("format").url();
}
