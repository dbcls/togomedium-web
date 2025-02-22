import {describe} from "vitest";
import {makeLinkPath} from "%core/network/makeLinkPath";

describe("makeLinkPath", () => {
  const originalHost = window.location.host;
  const originalPort = window.location.port;
  afterEach(() => {
    window.location.host = originalHost;
    window.location.port = originalPort;
  },)
  describe("when the host is live (togomedium.org)", () => {
    beforeEach(() => {
      window.location.host = "togomedium.org";
      window.location.port = "";
    })
    test("When the arg is URI and an external link, it should just return the arg", () => {
      const result = makeLinkPath("https://ncbi.nlm.nih.gov")
      expect(result).toBe("https://ncbi.nlm.nih.gov");
    });

    test("When the arg is URI and an internal link, it should return the URI", () => {
      const result = makeLinkPath("https://togomedium.org/medium/M3013")
      expect(result).toBe("https://togomedium.org/medium/M3013");
    });

    test("When the arg is string, it should treat the arg as path and return the normalized URI", () => {
      const result = makeLinkPath("/medium/M3013")
      console.log(result);
      expect(result).toBe("https://togomedium.org/medium/M3013");
    });
  })

  describe("when host is localhost", () => {
    beforeEach(() => {
      window.location.host = "localhost";
      window.location.port = "5100";
    })
    test("When the arg URI and external link, it should just return the arg", () => {
      const result = makeLinkPath("https://ncbi.nlm.nih.gov")
      expect(result).toBe("https://ncbi.nlm.nih.gov");
    });

    test("When the arg is URI and internal link, it should return the URI with the correct port", () => {
      const result = makeLinkPath("https://togomedium.org/medium/M3013")
      expect(result).toBe("http://localhost:5200/medium/M3013");
    });

    test("When the arg is an absolute path from the server, it should return the URI with the correct port", () => {
      const result = makeLinkPath("/medium/M3013")
      expect(result).toBe("http://localhost:5200/medium/M3013");
    });
  });

  describe("when the host is staging (togomedium.yohak-lab.com)", () => {
    beforeEach(() => {
      window.location.host = "togomedium.yohak-lab.com";
      window.location.port = "";
    })
    test("When the arg is URI and an external link, it should just return the arg", () => {
      const result = makeLinkPath("https://ncbi.nlm.nih.gov")
      expect(result).toBe("https://ncbi.nlm.nih.gov");
    });

    test("When the arg is URI and an internal link, it should return the URI", () => {
      const result = makeLinkPath("https://togomedium.org/medium/M3013")
      expect(result).toBe("https://togomedium.yohak-lab.com/medium/M3013");
    });

    test("When the arg is string, it should treat the arg as path and return the normalized URI", () => {
      const result = makeLinkPath("/medium/M3013")
      console.log(result);
      expect(result).toBe("https://togomedium.yohak-lab.com/medium/M3013");
    });
  })

  describe("when the host is elsewhere", () => {
    beforeEach(() => {
      window.location.host = "www.nite.go.jp";
      window.location.port = "";
    })
    test("When the arg is URI and an external link, it should just return the arg", () => {
      const result = makeLinkPath("https://ncbi.nlm.nih.gov")
      expect(result).toBe("https://ncbi.nlm.nih.gov");
    });

    test("When the arg is URI and an internal link, it should return the URI", () => {
      const result = makeLinkPath("https://togomedium.org/medium/M3013")
      expect(result).toBe("https://togomedium.org/medium/M3013");
    });

    test("When the arg is string, it should treat the arg as path and return the normalized URI", () => {
      const result = makeLinkPath("/medium/M3013")
      console.log(result);
      expect(result).toBe("https://togomedium.org/medium/M3013");
    });
  })
});
