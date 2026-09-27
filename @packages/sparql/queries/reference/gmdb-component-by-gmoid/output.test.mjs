import assert from "node:assert/strict";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json } from "./output.mjs";

const v = (value) => ({ value });
const result = (...bindings) => ({ results: { bindings } });
const base = { id: v("C1"), pref_label: v("Component") };

await test("deduplicates aliases and preserves original empty response", () => {
  const row = { ...base, alt_label_en: v("Alias") };
  assert.deepEqual(json({ result: result(row, row) }).alt_labels_en, ["Alias"]);
  assert.deepEqual(json({ result: result() }), []);
});

await test("SPARQList Output runs independently", () => {
  checkStandalone(json, [
    { result: result({ ...base, label_ja: v("成分"), alt_label_en: v("Alias") }) },
    { result: result() },
  ]);
});
