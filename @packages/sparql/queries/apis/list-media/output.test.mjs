import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { renderParameters } from "../../../scripts/parameters.mjs";
import { json } from "./output.mjs";

const v = (value) => ({ value });
const bindings = (...rows) => ({ results: { bindings: rows } });
const count = bindings({ total: v("100"), offset: v("20"), limit: v("20") });
const row = {
  media_id: v("M1"),
  original_media_id: v("JCM_M1"),
  label: v("MRS Medium"),
  source_uri: v("https://example.org/medium/1"),
  strain_count: v("3"),
  species_count: v("2"),
  ph: v("6.0-6.5"),
};
const cases = [
  { count, result: bindings(row) },
  { count, result: bindings() },
  { count: bindings(), result: bindings() },
  { count, result: bindings({ media_id: v("M2"), strain_count: v("0"), species_count: v("0") }) },
  { count, result: bindings(row, row, { ...row, source_uri: v("https://example.org/medium/2") }) },
];

await test("returns numeric pagination and plain fields without display metadata", () => {
  assert.deepEqual(json(cases[0]), {
    total: 100,
    offset: 20,
    limit: 20,
    contents: [
      {
        media_id: "M1",
        original_media_id: "JCM_M1",
        label: "MRS Medium",
        source_uri: "https://example.org/medium/1",
        strain_count: 3,
        species_count: 2,
        ph: "6.0-6.5",
      },
    ],
  });
});

await test("preserves empty pages and fills missing optional values with empty strings", () => {
  assert.deepEqual(json(cases[1]), { total: 100, offset: 20, limit: 20, contents: [] });
  assert.deepEqual(json(cases[2]), { total: 0, offset: 0, limit: 0, contents: [] });
  assert.deepEqual(json(cases[3]).contents, [
    {
      media_id: "M2",
      original_media_id: "",
      label: "",
      source_uri: "",
      strain_count: 0,
      species_count: 0,
      ph: "",
    },
  ]);
});

await test("preserves row order, duplicate rows and distinct sources", () => {
  const { contents } = json(cases[4]);
  assert.equal(contents.length, 3);
  assert.deepEqual(contents[0], contents[1]);
  assert.equal(contents[2].source_uri, "https://example.org/medium/2");
});

await test("retains reference total query unchanged", async () => {
  for (const [file, reference] of [["count-media.rq", "count.rq"]]) {
    assert.equal(
      await readFile(new URL(file, import.meta.url), "utf8"),
      await readFile(new URL(`../../reference/list-media/${reference}`, import.meta.url), "utf8"),
    );
  }
});

await test("rejects missing, invalid and unsafe strain counts", () => {
  for (const value of [undefined, "", "-1", "1.5", "abc", "9007199254740992"]) {
    assert.throws(
      () =>
        json({
          count,
          result: bindings({ ...row, strain_count: value === undefined ? undefined : v(value) }),
        }),
      /strain_count/,
    );
  }
});

await test("SPARQList Output runs independently", () => {
  checkStandalone(json, cases);
});

await test("rejects missing, invalid and unsafe species counts", () => {
  for (const value of [undefined, "", "-1", "1.5", "abc", "9007199254740992"]) {
    assert.throws(
      () =>
        json({
          count,
          result: bindings({ ...row, species_count: value === undefined ? undefined : v(value) }),
        }),
      /species_count/,
    );
  }
});

await test("preserves pH text, empty values and separate pH rows", () => {
  const values = ["6.5", "6.0-6.5", "", "7.0 (before sterilization)"];
  const output = json({ count, result: bindings(...values.map((ph) => ({ ...row, ph: v(ph) }))) });
  assert.deepEqual(
    output.contents.map((row) => row.ph),
    values,
  );
  assert.deepEqual(
    output.contents.map((row) => row.species_count),
    [2, 2, 2, 2],
  );
  checkStandalone(json, [
    { count, result: bindings({ ...row, ph: undefined, species_count: v("0") }) },
  ]);
});

await test("accepts strain count sorting in both directions and rejects unsupported values", async () => {
  const config = JSON.parse(await readFile(new URL("./api.json", import.meta.url), "utf8"));
  const query = await readFile(new URL("./list-media.rq", import.meta.url), "utf8");
  for (const sort of ["", "strain_count"]) {
    for (const order of ["asc", "desc"]) {
      assert.doesNotThrow(() => renderParameters(query, config.parameters, { sort, order }));
    }
  }
  assert.doesNotThrow(() => renderParameters(query, config.parameters));
  for (const params of [{ sort: "unknown" }, { order: "DESC" }, { order: "" }]) {
    assert.throws(() => renderParameters(query, config.parameters, params), /Invalid parameter/);
  }
});
