"use client";

/**
 * This config is used to configure your Sanity Studio, embedded into this
 * Next.js app at /studio — see README.md's "Content management" section
 * for the one-time setup Beth (or whoever manages animal content) needs
 * before this does anything.
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // Vision lets a developer run raw GROQ queries against the dataset —
    // useful for debugging, not something Beth needs day-to-day, but
    // harmless to leave in.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
