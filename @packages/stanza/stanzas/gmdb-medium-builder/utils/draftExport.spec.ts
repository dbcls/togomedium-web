import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { __TEST__, downloadDraft } from "%stanza/stanzas/gmdb-medium-builder/utils/draftExport";
import { describe, expect, it, vi } from "vitest";

const { createDraftFilename, createDraftJson } = __TEST__;
const exportDate = new Date(2026, 4, 18);

describe("createDraftFilename", () => {
  it("creates a filename from the medium title and local date", () => {
    expect(createDraftFilename("Marine Broth 2216", exportDate)).toBe(
      "Marine-Broth-2216-2026-05-18.json",
    );
  });

  it("sanitizes filename separators from the medium title", () => {
    expect(createDraftFilename("  A/B: test medium?  ", exportDate)).toBe(
      "AB-test-medium-2026-05-18.json",
    );
  });

  it("uses the fallback filename when the medium title is empty", () => {
    expect(createDraftFilename("   ", exportDate)).toBe("medium-builder-draft-2026-05-18.json");
  });
});

describe("createDraftJson", () => {
  it("creates pretty printed draft JSON from the current app state", () => {
    const state = createThunkTestStore().getState();

    expect(createDraftJson(state)).toBe(
      `${JSON.stringify(
        {
          schemaVersion: "2026-05-18",
          title: "Test medium",
          description: "Test medium description",
          provenance: {
            importSourceGmId: "GM_000001",
            originalMediaId: "NBRC 123",
            sourceUrl: "https://example.org/medium/GM_000001",
          },
          solutions: [
            {
              title: "Medium A",
              description: "desc A",
              components: [
                {
                  gmoId: "GMO_000001",
                  component: "Glucose",
                  volume: 10,
                  unit: "g",
                  concentrationValue: 55.5,
                  concentrationUnit: "mM",
                  note: "primary",
                },
                {
                  gmoId: "GMO_000002",
                  component: "NaCl",
                  volume: 5,
                  unit: "mg",
                  concentrationValue: null,
                  concentrationUnit: "",
                  note: "secondary",
                },
              ],
            },
            {
              title: "Medium B",
              description: "desc B",
              components: [
                {
                  gmoId: "",
                  component: "Agar",
                  volume: 15,
                  unit: "g",
                  concentrationValue: 0,
                  concentrationUnit: "x",
                  note: "other block",
                },
              ],
            },
          ],
        },
        null,
        2,
      )}`,
    );
  });
});

describe("downloadDraft", () => {
  it("downloads the pretty printed draft JSON with the generated filename", async () => {
    const state = createThunkTestStore().getState();
    const objectUrl = "blob:medium-builder-draft";
    const createObjectURL = vi.fn((_object: Blob | MediaSource) => objectUrl);
    const revokeObjectURL = vi.fn();
    const click = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    const createElement = vi.spyOn(document, "createElement");

    createElement.mockImplementation((tagName, options) => {
      const element = originalCreateElement(tagName, options);

      if (tagName === "a") {
        vi.spyOn(element as HTMLAnchorElement, "click").mockImplementation(click);
      }

      return element;
    });

    const result = downloadDraft(state, {
      now: exportDate,
      document,
      url: {
        createObjectURL,
        revokeObjectURL,
      },
    });

    expect(result.filename).toBe("Test-medium-2026-05-18.json");
    expect(result.json).toBe(createDraftJson(state));
    expect(createObjectURL).toHaveBeenCalledOnce();
    const blob = createObjectURL.mock.calls[0]![0];
    expect(blob).toBeInstanceOf(Blob);
    if (blob instanceof Blob) {
      expect(await blob.text()).toBe(result.json);
    }
    expect(click).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith(objectUrl);
    expect(document.querySelector(`a[download="${result.filename}"]`)).toBeNull();
  });
});
