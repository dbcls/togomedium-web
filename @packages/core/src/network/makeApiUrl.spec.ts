import { makeApiUrl } from "%core/network/makeApiUrl";
import { afterEach, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("makeApiUrl", () => {
  test("builds the same URL with or without a leading slash", () => {
    expect(makeApiUrl("list_media")).toBe(makeApiUrl("/list_media"));
  });

  test("appends query parameters after normalizing the path", () => {
    const params = new URLSearchParams({ gm_ids: "M1,M2" });
    const expectedBaseUrl = makeApiUrl("gmdb_list_media_by_gmids");

    expect(makeApiUrl("/gmdb_list_media_by_gmids", params)).toBe(
      `${expectedBaseUrl}?gm_ids=M1%2CM2`,
    );
  });

  test("uses the configured Vite API base instead of the production default", async () => {
    vi.stubEnv("VITE_URL_API", "http://localhost:3000/sparqlist/api");
    vi.resetModules();
    const { makeApiUrl: configuredUrl } = await import("./makeApiUrl");
    expect(configuredUrl("/gmdb_search_components_list")).toBe(
      "http://localhost:3000/sparqlist/api/gmdb_search_components_list",
    );
  });

  test("retains the production default when no Vite API base is configured", async () => {
    vi.stubEnv("VITE_URL_API", undefined);
    vi.resetModules();
    const { makeApiUrl: configuredUrl } = await import("./makeApiUrl");
    expect(configuredUrl("/gmdb_search_components_list")).toBe(
      "https://togomedium.org/sparqlist/api/gmdb_search_components_list",
    );
  });
});
