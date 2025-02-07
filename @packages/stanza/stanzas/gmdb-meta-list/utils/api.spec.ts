import { __TEST__ } from "./api";
const { separateURL, filterQuery } = __TEST__;
import { describe, expect, it, test } from "vitest";

describe("separateURL", () => {
  test("it should work", () => {
    const result = separateURL(
      "http://growthmedium.org/sparqlist/api/gmdb_list_media_by_keyword?keyword=AGAR"
    );
    expect(result).toEqual([
      "http://growthmedium.org/sparqlist/api/gmdb_list_media_by_keyword",
      "keyword=AGAR",
    ]);
  });
  test("it should work even if no query found", () => {
    const result = separateURL("http://growthmedium.org/sparqlist/api/gmdb_list_media_by_keyword");
    expect(result).toEqual([
      "http://growthmedium.org/sparqlist/api/gmdb_list_media_by_keyword",
      "",
    ]);
  });
});

describe("filterQuery", () => {
  test("it should filter limit and offset parameter", () => {
    const result = filterQuery("keyword=AGAR&limit=10&offset=8");
    expect(result).toBe("keyword=AGAR");
  });
  test("it just pass the parameters", () => {
    const result = filterQuery("keyword=AGAR&taxon=foo");
    expect(result).toBe("keyword=AGAR&taxon=foo");
  });
  test("it return empty text if query is null", () => {
    const result = filterQuery(null);
    expect(result).toBe("");
  });
});
