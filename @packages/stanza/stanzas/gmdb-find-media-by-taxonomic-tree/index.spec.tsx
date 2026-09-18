import { describe, expect, it, vi } from "vitest";
import ReactStanza from "./index";

vi.mock("%stanza/components/providers/StanzaReactProvider", () => ({
  TogoMediumReactStanza: class {
    root = document.createElement("div").attachShadow({ mode: "open" });

    get params(): Record<string, unknown> {
      return {};
    }
  },
}));

vi.mock("%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/App", () => ({
  default: () => null,
}));

describe("taxonomic tree Stanza parameters", () => {
  it.each([undefined, "NCBI", "GTDB"])("passes supported value %j to App", (taxonomyType) => {
    const stanza = new ReactStanza();
    vi.spyOn(stanza, "params", "get").mockReturnValue({ taxonomy_type: taxonomyType });
    expect(stanza.makeApp().props.taxonomyType).toBe(taxonomyType);
  });

  it.each(["", "invalid", 1, null])("rejects invalid value %j before rendering", (taxonomyType) => {
    const stanza = new ReactStanza();
    vi.spyOn(stanza, "params", "get").mockReturnValue({ taxonomy_type: taxonomyType });
    expect(() => stanza.makeApp()).toThrow(/taxonomy_type/);
  });
});
