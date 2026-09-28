import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { renderParameters } from "../../../scripts/parameters.mjs";
import { json } from "./output.mjs";

const v = (value) => ({ value });
const row = {
  medium_id: v("M1"),
  medium_name: v("Medium"),
  strain_id: v("S1"),
  strain_name: v("Strain"),
  rank: v("http://ddbj.nig.ac.jp/ontologies/taxonomy/Genus"),
  ancestor_tax: v("http://identifiers.org/taxonomy/10"),
  ancestor_tax_name: v("Genus"),
};
const inputs = (...rows) => ({ result: { results: { bindings: rows } } });
const multiple = inputs(
  row,
  row,
  {
    ...row,
    rank: v("http://ddbj.nig.ac.jp/ontologies/taxonomy/Species"),
    ancestor_tax: v("http://identifiers.org/taxonomy/11"),
  },
  { ...row, strain_id: v("S2") },
  { ...row, medium_id: v("M2"), original_media_id: v("JCM_M900") },
  { ...row, medium_id: v("M2"), original_media_id: v("Another alias") },
);
const cases = [inputs(), inputs(row), multiple];

await test("groups media and strains, merges ranks and preserves missing values", () => {
  assert.deepEqual(json(inputs()), []);
  assert.deepEqual(json(inputs(row)), [
    {
      gm_id: "M1",
      label: "Medium",
      original_media_id: "",
      organisms: [
        {
          domain: null,
          phylum: null,
          class: null,
          order: null,
          family: null,
          genus: { id: "10", label: "Genus" },
          species: null,
          strain: { id: "S1", label: "Strain" },
        },
      ],
    },
  ]);
  const result = json(multiple);
  assert.deepEqual(
    result.map((medium) => medium.gm_id),
    ["M1", "M2"],
  );
  assert.deepEqual(
    result[0].organisms.map((organism) => organism.strain.id),
    ["S1", "S2"],
  );
  assert.equal(result[0].organisms[0].species.id, "11");
  assert.equal(result[1].original_media_id, "JCM_M900");
  assert.equal(result[1].organisms.length, 1);
});

await test("query is unchanged and Output matches original and standalone execution", async () => {
  const source = await readFile(new URL("./source.md", import.meta.url), "utf8");
  assert.equal(
    await readFile(new URL("./gmdb_media_strains_alignment_by_gm_ids.rq", import.meta.url), "utf8"),
    source.match(/```sparql\n([\s\S]*?)```/)[1],
  );
  const original = [...source.matchAll(/```javascript\n([\s\S]*?)```/g)][1][1];
  for (const value of cases) {
    assert.deepEqual(
      json(value),
      JSON.parse(JSON.stringify(vm.runInNewContext(original).json(value))),
    );
  }
  checkStandalone(json, cases);
});

await test("list parameters preserve original ordinary inputs and escape special characters", async () => {
  const source = await readFile(new URL("./source.md", import.meta.url), "utf8");
  const original = vm.runInNewContext([...source.matchAll(/```javascript\n([\s\S]*?)```/g)][0][1]);
  const config = JSON.parse(await readFile(new URL("./api.json", import.meta.url), "utf8"));
  const template = "VALUES ?medium_no { {{media_values}} }";
  for (const value of [
    "M2794,M941",
    "SY4047,JCM_M900",
    " M2794 , M941 ",
    "",
    "M2794,",
    "M2794,M2794",
  ]) {
    assert.equal(
      renderParameters(template, config.parameters, { gm_ids: value }),
      `VALUES ?medium_no { ${original.json({ gm_ids: value })} }`,
    );
  }
  assert.equal(
    renderParameters(template, config.parameters),
    'VALUES ?medium_no { "M2794" "M941" }',
  );
  const special = 'A"B\\C';
  assert.equal(
    renderParameters(template, config.parameters, { gm_ids: special }),
    `VALUES ?medium_no { ${JSON.stringify(special)} }`,
  );
  assert.notEqual(JSON.stringify(special), original.json({ gm_ids: special }));
});
