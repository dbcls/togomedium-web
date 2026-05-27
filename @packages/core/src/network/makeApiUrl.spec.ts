import { makeApiUrl } from "%core/network/makeApiUrl";

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
});
