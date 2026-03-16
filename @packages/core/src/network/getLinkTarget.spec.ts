/// <reference types="vitest/jsdom" />

import { getLinkTarget } from "%core/network/getLinkTarget";
import { describe } from "vitest";

describe("getLinkTarget", () => {
  const originalHref = window.location.href;
  afterEach(() => {
    jsdom.reconfigure({ url: originalHref });
  });
  describe("then the host is localhost", () => {
    beforeEach(() => {
      jsdom.reconfigure({ url: "http://localhost:5100" });
    });
    it("should return the correct target for a link", () => {
      const ebi = "https://www.ebi.ac.uk/pathways/webservices/rest/1.0/pathway/12345";
      const togomedium = "https://togomedium.org/medium/M3013";
      expect(getLinkTarget(ebi)).toBe("_blank");
      expect(getLinkTarget(togomedium)).toBeUndefined();
    });
  });
});
