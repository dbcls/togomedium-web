import { loadEnv } from "vite";
import { beforeEach, describe, expect, it, vi } from "vitest";
import createConfig from "./togostanza.config";

vi.mock("vite", () => ({ loadEnv: vi.fn() }));

describe("Stanza API environment migration", () => {
  beforeEach(() => {
    vi.mocked(loadEnv).mockReset();
  });

  it("maps the legacy API variable to the shared Vite variable", () => {
    vi.mocked(loadEnv).mockReturnValue({ URL_API: "https://legacy.example/api/" });
    const config = createConfig({ command: "build", mode: "production" });
    expect(config.vite?.define).toEqual({
      "import.meta.env.VITE_URL_API": JSON.stringify("https://legacy.example/api/"),
    });
    expect(loadEnv).toHaveBeenCalledWith("production", config.vite?.envDir, [
      "VITE_URL_API",
      "URL_API",
    ]);
  });

  it("prefers VITE_URL_API and does not embed unrelated variables", () => {
    vi.mocked(loadEnv).mockReturnValue({
      URL_API: "https://legacy.example/api/",
      VITE_URL_API: "https://current.example/api/",
      URL_API_PRIVATE_TOKEN: "not-for-the-browser",
    });
    expect(createConfig({ command: "build", mode: "production" }).vite?.define).toEqual({
      "import.meta.env.VITE_URL_API": JSON.stringify("https://current.example/api/"),
    });
  });

  it("leaves the shared default in place when no API variable is specified", () => {
    vi.mocked(loadEnv).mockReturnValue({});
    expect(createConfig({ command: "build", mode: "production" }).vite?.define).toEqual({});
  });
});
