import assert from "node:assert/strict";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json } from "./output.mjs";

const v = (value, type) => ({
  value,
  ...(type ? { datatype: `http://www.w3.org/2001/XMLSchema#${type}` } : {}),
});
const result = (...bindings) => ({ results: { bindings } });
const empty = { metadata: result(), component_table: result(), comment_list: result() };

await test("empty medium preserves the public API shape", () => {
  assert.deepEqual(json(empty), { meta: null, components: [], comments: [] });
  checkStandalone(json, [empty]);
});

await test("groups paragraphs, deduplicates properties and roles, and converts numeric values", () => {
  const row = {
    paragraph_index: v("1", "integer"),
    subcomponent_name: v("Main solution"),
    component_name: v("Glucose"),
    gmo_id: v("GMO_001010"),
    volume: v("1.5", "decimal"),
    unit: v("g"),
    property_id: v("P1"),
    property: v("urn:p1"),
    property_label: v("Property 1"),
    role_id: v("R1"),
    role: v("urn:r1"),
    role_label: v("Role 1"),
  };
  const inputs = {
    metadata: result({ gm: v("urn:medium"), name: v("Test"), ph: v("6.5") }),
    component_table: result(
      row,
      row,
      {
        ...row,
        property_id: v("P2"),
        property: v("urn:p2"),
        property_label: v("Property 2"),
        role_id: v("R2"),
        role: v("urn:r2"),
        role_label: v("Role 2"),
      },
      { ...row, paragraph_index: v("3", "integer") },
    ),
    comment_list: result({ paragraph_index: v("2", "integer"), comment: v("") }),
  };
  const output = json(inputs);
  assert.deepEqual(output.meta, { gm: "urn:medium", name: "Test", ph: "6.5" });
  assert.equal(output.components.length, 2);
  assert.equal(output.components[0].items.length, 1);
  assert.deepEqual(output.components[0].items[0], {
    component_name: "Glucose",
    gmo_id: "GMO_001010",
    volume: 1.5,
    unit: "g",
    properties: [
      { id: "P1", uri: "urn:p1", label: "Property 1" },
      { id: "P2", uri: "urn:p2", label: "Property 2" },
    ],
    roles: [
      { id: "R1", uri: "urn:r1", label: "Role 1" },
      { id: "R2", uri: "urn:r2", label: "Role 2" },
    ],
  });
  assert.deepEqual(output.comments, [{ paragraph_index: 2, comment: "" }]);
  checkStandalone(json, [inputs]);
});

await test("items without GMO IDs remain separate and optional fields stay absent", () => {
  const row = {
    paragraph_index: v("1", "integer"),
    component_name: v("Mixture"),
    reference_media_id: v("M6"),
  };
  const inputs = { ...empty, component_table: result(row, row) };
  const output = json(inputs);
  assert.equal(output.components[0].items.length, 2);
  assert.deepEqual(output.components[0].items[0], {
    component_name: "Mixture",
    reference_media_id: "M6",
    properties: [],
    roles: [],
  });
  assert.equal(output.components[0].subcomponent_name, undefined);
});
