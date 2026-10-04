import { describe, expect, it } from "vitest";
import { decodeLabelEntities } from "./decodeLabelEntities";

describe("decodeLabelEntities", () => {
  it.each([
    ["Bacto &trade; Yeast extract", "Bacto ™ Yeast extract"],
    ["A &amp; B &#8482; &#x1F9EA;", "A & B ™ 🧪"],
    ["通常文字 &unknown; 5 < 7", "通常文字 &unknown; 5 < 7"],
    [
      '</textarea><img src=x onerror="alert(1)"> &lt;b&gt;',
      '</textarea><img src=x onerror="alert(1)"> <b>',
    ],
    ["&amp;trade;", "&trade;"],
  ])("decodes %s without interpreting markup", (input, expected) => {
    expect(decodeLabelEntities(input)).toBe(expected);
  });
});
