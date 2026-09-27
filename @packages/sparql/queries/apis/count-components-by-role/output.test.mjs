import assert from "node:assert/strict";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json as counts } from "./output.mjs";

const v = (value) => ({ value });
const result = (...bindings) => ({ results: { bindings } });

await test("counts preserve zero and reject unsafe or absent numeric values", () => {
  const row = { role: v("urn:r"), direct_count: v("0"), inclusive_count: v("42") };
  assert.deepEqual(counts({ result: result(row) }), [
    { id: null, label: null, direct_count: 0, inclusive_count: 42, parent: null },
  ]);
  for (const invalid of [undefined, v(""), v("-1"), v("1.5"), v("9007199254740992")]) {
    assert.throws(
      () => counts({ result: result({ ...row, direct_count: invalid }) }),
      /safe integer/,
    );
  }
});

await test("SPARQList Output runs independently", () => {
  checkStandalone(counts, [
    { result: result({ role: v("urn:r"), direct_count: v("0"), inclusive_count: v("2") }) },
    { result: result() },
  ]);
});

await test("merges repeated parents without adding counts and rejects multiple parents", () => {
  const row = {
    role: v("urn:r"),
    direct_count: v("3"),
    inclusive_count: v("8"),
    parent: v("urn:p1"),
    parent_id: v("P1"),
  };
  const second = { ...row, parent: v("urn:p1"), parent_id: undefined };
  const inputs = { result: result(row, row, second) };
  assert.deepEqual(counts(inputs), [
    { id: null, label: null, direct_count: 3, inclusive_count: 8, parent: "P1" },
  ]);
  checkStandalone(counts, [inputs]);
  assert.throws(
    () =>
      counts({ result: result(row, { ...second, label: v("Other label"), parent: v("urn:p2") }) }),
    /Multiple parents/,
  );
  assert.throws(
    () => counts({ result: result(row, { ...second, direct_count: v("4") }) }),
    /Counts differ/,
  );
});

await test("normalizes the Role root to null after validating the single parent", () => {
  const row = {
    role: v("urn:r"),
    direct_count: v("3"),
    inclusive_count: v("8"),
    parent: v("http://purl.jp/bio/10/gmo/GMO_000037"),
  };
  for (const parent_id of [undefined, v("GMO_000037")]) {
    const inputs = { result: result({ ...row, parent_id }) };
    assert.equal(counts(inputs)[0].parent, null);
    assert.equal(counts(inputs)[0].inclusive_count, 8);
    checkStandalone(counts, [inputs]);
  }
  assert.throws(
    () => counts({ result: result(row, { ...row, parent: v("urn:other") }) }),
    /Multiple parents/,
  );
});

await test("omits URIs and returns null when the parent ID is missing", () => {
  const inputs = {
    result: result({
      role: v("urn:r"),
      id: v("R1"),
      direct_count: v("1"),
      inclusive_count: v("2"),
      parent: v("urn:p"),
    }),
  };
  assert.deepEqual(counts(inputs), [
    { id: "R1", label: null, direct_count: 1, inclusive_count: 2, parent: null },
  ]);
  checkStandalone(counts, [inputs]);
});
