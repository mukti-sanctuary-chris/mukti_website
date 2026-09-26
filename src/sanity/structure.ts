import type { StructureResolver } from "sanity/structure";

// Explicit two-item sidebar: Animals and Our Team. Being explicit (rather
// than relying on Studio's auto-generated structure) keeps the sidebar
// exactly this simple even if more document types get added later —
// Beth always sees the same two, clearly-labeled lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Mukti Sanctuary")
    .items([
      S.listItem()
        .title("Animals")
        .child(
          S.documentTypeList("animal")
            .title("Animals")
            .defaultOrdering([{ field: "name", direction: "asc" }]),
        ),
      S.listItem()
        .title("Our Team")
        .child(
          S.documentTypeList("person")
            .title("Our Team")
            .defaultOrdering([{ field: "name", direction: "asc" }]),
        ),
    ]);
