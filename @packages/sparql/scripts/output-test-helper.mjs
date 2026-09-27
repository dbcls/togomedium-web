import assert from "node:assert/strict";
import vm from "node:vm";
import { sparqlistSource } from "./build-output.mjs";

export function checkStandalone(json, cases) {
  for (const inputs of cases) {
    const actual = vm.runInNewContext(`(${sparqlistSource(json)}).json(inputs)`, { inputs });
    assert.deepEqual(JSON.parse(JSON.stringify(actual)), json(inputs));
  }
}
