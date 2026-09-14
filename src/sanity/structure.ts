import type { StructureResolver } from "sanity/structure";

// Restricts the Studio's sidebar to a single "Animals" list — there's only
// one content type, so the default auto-generated structure would already
// look almost like this, but being explicit means it stays this simple if
// more document types ever get added later, instead of Beth suddenly
// seeing a second unrelated list appear in her sidebar.
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
    ]);
