import { describe } from "vitest";
import { getLinkTarget } from "%core/network/getLinkTarget";

describe("getLinkTarget", () => {
  const originalHost = window.location.host;
  const originalPort = window.location.port;
  afterEach(() => {
    window.location.host = originalHost;
    window.location.port = originalPort;
  });
  describe("then the host is localhost", () => {
    beforeEach(() => {
      window.location.host = "localhost";
      window.location.port = "5100";
    });
    it("should return the correct target for a link", () => {
      const ebi = "https://www.ebi.ac.uk/pathways/webservices/rest/1.0/pathway/12345";
      const togomedium = "https://togomedium.org/medium/M3013";
      expect(getLinkTarget(ebi)).toBe("_blank");
      expect(getLinkTarget(togomedium)).toBeUndefined();
    });
  });
});
