import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { sparqlistSource } from "./build-output.mjs";

await test("generates an Output object callable without module dependencies", () => {
  function json({ input }) {
    return { values: input.values.filter((value) => value !== null) };
  }
  const actual = vm.runInNewContext(
    `(${sparqlistSource(json)}).json({ input: { values: [0, null, 2] } })`,
  );
  assert.deepEqual(JSON.parse(JSON.stringify(actual)), { values: [0, 2] });
});
