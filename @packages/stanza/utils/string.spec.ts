import { describe, expect, it, test } from "vitest";
import {
  capitalizeFirstLetter,
  makeSpeciesName,
  makeStrainName,
  unescapeJsonString,
} from "./string";
describe("unescapeJsonString", () => {
  it("should work", () => {
    const result = unescapeJsonString('\\"Pediococcus lindneri\\" Henneberg 1926');
    // console.log(result);
    expect(result).toBe('"Pediococcus lindneri" Henneberg 1926');
  });
  it("should not stop even if undefined is passed", () => {
    const result = unescapeJsonString(undefined);
    expect(result).toBe(undefined);
  });
  it("should return empty string if empty string is passed", () => {
    const result = unescapeJsonString("");
    expect(result).toBe("");
  });
});

describe("capitalizeFirstLegger", () => {
  it("should work", () => {
    const result = capitalizeFirstLetter("hoge");
    expect(result).toBe("Hoge");
  });
  it("should capitalize even if only one character is passed", () => {
    const result = capitalizeFirstLetter("h");
    expect(result).toBe("H");
  });
  it("should pass through if none alphabetic character is passed", () => {
    const result = capitalizeFirstLetter("12345");
    expect(result).toBe("12345");
  });
  it("should not stop even if undefined is passed", () => {
    const result = capitalizeFirstLetter(undefined);
    expect(result).toBe(undefined);
  });
  it("should return empty string if empty string is passed", () => {
    const result = capitalizeFirstLetter("");
    expect(result).toBe("");
  });
});

describe("makeSpeciesName", () => {
  it("should change", () => {
    const result = makeSpeciesName("Anoxybacillus flavithermus WK1");
    expect(result).toBe("A. Flavithermus WK1");
  });
  it("should work with brackets", () => {
    const result = makeSpeciesName("[anoxybacillus] flavithermus (WK1)");
    expect(result).toBe("A. Flavithermus (WK1)");
  });
});

describe("makeStrainName", () => {
  it("should change", () => {
    const result = makeStrainName("Anoxybacillus flavithermus WK1");
    expect(result).toBe("A. F. WK1");
  });
});
