import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json } from "./output.mjs";

const v = (value) => ({ value });
const bindings = (...rows) => ({ results: { bindings: rows } });
const count = bindings({ total: v("100"), offset: v("20"), limit: v("20") });
const row = { media_id: v("M1"), label: v("Medium"), original_media_id: v("DSMZ 1") };
const cases = [
  { count, result: bindings(row) },
  { count, result: bindings() },
  { count: bindings(), result: bindings() },
  { count, result: bindings({ media_id: v("M2") }) },
  { count, result: bindings({ ...row, label: v("") }) },
  {
    count,
    result: bindings(
      { ...row, source_uri: v("https://example.org/a") },
      { ...row, source_uri: v("https://example.org/b") },
      { ...row, original_media_id: v("Alias") },
    ),
  },
];

await test("preserves columns, numeric pagination, links and optional fields", () => {
  assert.deepEqual(json(cases[0]), {
    total: 100,
    offset: 20,
    limit: 20,
    columns: [
      { key: "media_id", label: "Medium" },
      { key: "original_media_id", label: "Information source" },
      { key: "label", label: "Name" },
    ],
    contents: [
      {
        label: "Medium",
        original_media_id: "DSMZ 1",
        media_id: { label: "M1", href: "/medium/M1" },
      },
    ],
  });
  assert.deepEqual(json(cases[3]).contents, [
    { label: "", original_media_id: "", media_id: { label: "M2", href: "/medium/M2" } },
  ]);
  assert.equal(json(cases[4]).contents[0].label, "");
});

await test("empty pages retain metadata and missing count falls back to zero", () => {
  assert.deepEqual(json(cases[1]), { ...json(cases[0]), contents: [] });
  assert.deepEqual(json(cases[2]), { ...json(cases[1]), total: 0, offset: 0, limit: 0 });
});

await test("preserves repeated media and omits source_uri without deduplicating", () => {
  const { contents } = json(cases[5]);
  assert.equal(contents.length, 3);
  assert.deepEqual(contents[0], contents[1]);
  assert.equal(contents[2].original_media_id, "Alias");
  assert.equal(Object.hasOwn(contents[0], "source_uri"), false);
});

await test("queries match the supplied source and Output remains equivalent", async () => {
  const source = await readFile(new URL("./source.md", import.meta.url), "utf8");
  const queries = [...source.matchAll(/```sparql\n([\s\S]*?)```/g)];
  for (const [index, name] of ["count", "result"].entries()) {
    assert.equal(
      await readFile(new URL(`./${name}.rq`, import.meta.url), "utf8"),
      queries[index][1],
    );
  }
  const original = source.match(/```javascript\n([\s\S]*?)```/)[1];
  for (const inputs of cases) {
    const expected = vm.runInNewContext(original).json(inputs);
    assert.deepEqual(json(inputs), JSON.parse(JSON.stringify(expected)));
  }
  checkStandalone(json, cases);
});
