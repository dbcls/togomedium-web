import { defaultParseSearch } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_COMPONENT_LIST_SEARCH,
  canonicalComponentListSearch,
  componentFacetsSearchParams,
  componentListPageWithinTotal,
  componentListSearchParams,
  validateComponentListSearch,
} from "./componentListSearch";

describe("component list URL contract", () => {
  it("defaults and normalizes unsupported values and unsafe offsets", () => {
    expect(validateComponentListSearch({})).toEqual(DEFAULT_COMPONENT_LIST_SEARCH);
    expect(
      validateComponentListSearch({
        name: [],
        role: "bad",
        property: "GMO_000001",
        sort: "bad",
        order: "bad",
        page: -4,
        pageSize: 30,
      }),
    ).toEqual({ ...DEFAULT_COMPONENT_LIST_SEARCH, property: "GMO_000001" });
    expect(validateComponentListSearch({ page: Number.MAX_SAFE_INTEGER, pageSize: 100 }).page).toBe(
      1,
    );
    expect(validateComponentListSearch({ page: "1.5", pageSize: "50" })).toMatchObject({
      page: 1,
      pageSize: 50,
    });
  });
  it.each(['グルコース & "quoted" + /?', "123", "true", '["x"]', "  a  "])(
    "preserves search text %s in shared URLs and API parameters",
    (name) => {
      const state = { ...DEFAULT_COMPONENT_LIST_SEARCH, name, page: 3, pageSize: 50 as const };
      expect(
        validateComponentListSearch(defaultParseSearch(canonicalComponentListSearch(state))),
      ).toEqual(state);
      expect(componentListSearchParams(state)).toMatchObject({
        name,
        limit: "50",
        offset: "100",
        sort: "medium_count",
        order: "desc",
      });
      expect(componentFacetsSearchParams(state)).toEqual({ name, role_id: "", property_id: "" });
    },
  );
  it("clamps pages including empty results", () => {
    expect(componentListPageWithinTotal({ ...DEFAULT_COMPONENT_LIST_SEARCH, page: 8 }, 41)).toBe(3);
    expect(componentListPageWithinTotal({ ...DEFAULT_COMPONENT_LIST_SEARCH, page: 8 }, 0)).toBe(1);
  });
});
