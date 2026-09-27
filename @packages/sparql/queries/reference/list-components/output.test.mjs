import assert from "node:assert/strict";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json as originalList } from "./output.mjs";

const v = (value) => ({ value });
const result = (...bindings) => ({ results: { bindings } });
const count = result({ total: v("100"), limit: v("20"), offset: v("0") });

await test("reference list preserves original pagination and empty-page behavior", () => {
  assert.deepEqual(originalList({ result: result(), count }), {
    contents: [],
    total: 0,
    limit: 0,
    offset: 0,
  });
  const output = originalList({
    result: result({ gmo_id: v("C1"), label: v("Name"), alt_labels: v("Alias") }),
    count,
  });
  assert.equal(output.contents[0].name, "Name; Alias");
  assert.equal(output.total, "100");
});

await test("SPARQList Output runs independently", () => {
  checkStandalone(originalList, [
    { result: result({ gmo_id: v("C1"), label: v("Name"), alt_labels: v("Alias") }), count },
    { result: result(), count },
  ]);
});
