/// <reference types="vitest/jsdom" />

import { makeLinkPath } from "%core/network/makeLinkPath";
import { describe } from "vitest";

describe("makeLinkPath", () => {
  const originalHref = window.location.href;
  afterEach(() => {
    jsdom.reconfigure({ url: originalHref });
  });
  describe("when the current host is the production site", () => {
    beforeEach(() => {
      jsdom.reconfigure({ url: "https://togomedium.org" });
    });
    test("returns the original URL for an external link", () => {
      const result = makeLinkPath("https://ncbi.nlm.nih.gov");
      expect(result).toBe("https://ncbi.nlm.nih.gov");
    });

    test("keeps an internal URL on the production host", () => {
      const result = makeLinkPath("https://togomedium.org/medium/M3013");
      expect(result).toBe("https://togomedium.org/medium/M3013");
    });

    test("builds a production URL from an internal path", () => {
      const result = makeLinkPath("/medium/M3013");
      console.log(result);
      expect(result).toBe("https://togomedium.org/medium/M3013");
    });
  });

  describe("when the current host is localhost", () => {
    beforeEach(() => {
      jsdom.reconfigure({ url: "http://localhost:5100" });
    });
    test("returns the original URL for an external link", () => {
      const result = makeLinkPath("https://ncbi.nlm.nih.gov");
      expect(result).toBe("https://ncbi.nlm.nih.gov");
    });

    test("rewrites an internal URL to the local web port", () => {
      const result = makeLinkPath("https://togomedium.org/medium/M3013");
      expect(result).toBe("http://localhost:5200/medium/M3013");
    });

    test("builds a local web URL from an internal path", () => {
      const result = makeLinkPath("/medium/M3013");
      expect(result).toBe("http://localhost:5200/medium/M3013");
    });
  });

  describe("when the current host is the staging site", () => {
    beforeEach(() => {
      jsdom.reconfigure({ url: "https://togomedium.yohak-lab.com" });
    });
    test("returns the original URL for an external link", () => {
      const result = makeLinkPath("https://ncbi.nlm.nih.gov");
      expect(result).toBe("https://ncbi.nlm.nih.gov");
    });

    test("rewrites an internal URL to the staging host", () => {
      const result = makeLinkPath("https://togomedium.org/medium/M3013");
      expect(result).toBe("https://togomedium.yohak-lab.com/medium/M3013");
    });

    test("builds a staging URL from an internal path", () => {
      const result = makeLinkPath("/medium/M3013");
      console.log(result);
      expect(result).toBe("https://togomedium.yohak-lab.com/medium/M3013");
    });
  });

  describe("when the current host is neither production, staging, nor localhost", () => {
    beforeEach(() => {
      jsdom.reconfigure({ url: "https://www.nite.go.jp" });
    });
    test("returns the original URL for an external link", () => {
      const result = makeLinkPath("https://ncbi.nlm.nih.gov");
      expect(result).toBe("https://ncbi.nlm.nih.gov");
    });

    test("rewrites an internal URL to the production host", () => {
      const result = makeLinkPath("https://togomedium.org/medium/M3013");
      expect(result).toBe("https://togomedium.org/medium/M3013");
    });

    test("builds a production URL from an internal path", () => {
      const result = makeLinkPath("/medium/M3013");
      console.log(result);
      expect(result).toBe("https://togomedium.org/medium/M3013");
    });
  });
});
