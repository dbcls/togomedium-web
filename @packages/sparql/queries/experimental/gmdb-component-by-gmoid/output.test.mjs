import assert from "node:assert/strict";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json as originalDetail } from "../../reference/gmdb-component-by-gmoid/output.mjs";
import { json as detail } from "./output.mjs";

const v = (value) => ({ value });
const result = (...bindings) => ({ results: { bindings } });
const base = { id: v("C1"), pref_label: v("Component") };

await test("UNION detail finds Japanese label beyond the first row and matches joined output", () => {
  const fields = {
    label_ja: v("成分"),
    alt_label_en: v("Alias"),
    property: v("urn:p"),
    property_id: v("P1"),
    property_label_en: v("Property"),
  };
  const sparse = result(
    base,
    { ...base, label_ja: fields.label_ja },
    { ...base, alt_label_en: fields.alt_label_en },
    {
      ...base,
      property: fields.property,
      property_id: fields.property_id,
      property_label_en: fields.property_label_en,
    },
  );
  assert.deepEqual(
    detail({ result: sparse }),
    originalDetail({ result: result({ ...base, ...fields }, { ...base, ...fields }) }),
  );
  assert.deepEqual(detail({ result: result() }), []);
});

await test("SPARQList Output runs independently", () => {
  checkStandalone(detail, [
    { result: result(base, { ...base, label_ja: v("成分") }) },
    { result: result() },
  ]);
});
