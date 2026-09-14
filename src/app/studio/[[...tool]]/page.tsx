import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

// Standard next-sanity App Router setup — this embeds the whole Studio
// (the editor Beth uses) at /studio. See README.md's "Content management"
// section for the one-time Sanity project setup this depends on; until
// that's done, projectId is empty and the Studio will show its own
// "configure a project" screen rather than working content.
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
