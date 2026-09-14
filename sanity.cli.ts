import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

// Lets the `sanity` / `npx sanity` CLI commands (e.g. the one-time
// `sanity init` step in README.md) find the right project without asking.
export default defineCliConfig({ api: { projectId, dataset } });
