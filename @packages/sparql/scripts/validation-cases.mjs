import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  listComponents2ParamsSchema,
  listComponents2ResponseSchema,
} from "%api/listComponents2/definitions";
import { json } from "../queries/apis/list-components2/output.mjs";
import { validate } from "../queries/apis/list-components2/validate.mjs";
import { renderParameters } from "./parameters.mjs";

await test("list-components2 output satisfies the shared Zod contract without changing JSON", () => {
  const value = (value) => ({ value });
  const count = {
    results: { bindings: [{ total: value("1"), limit: value("20"), offset: value("0") }] },
  };
  const result = {
    results: {
      bindings: [
        {
          gmo_id: value("GMO_001010"),
          label: value("D-Glucose"),
          medium_count: value("12"),
          property_id: value("GMO_000050"),
          property_label_en: value("Complex component"),
          role_id: value("GMO_000042"),
          role_label_en: value("Nutrient source"),
          role_parent: value("http://purl.jp/bio/10/gmo/GMO_000037"),
          role_parent_id: value("GMO_000037"),
        },
      ],
    },
  };
  const output = json({ result, count });
  assert.deepEqual(validate(output), output);
  assert.equal(listComponents2ResponseSchema.safeParse({ ...output, columns: [] }).success, false);
  assert.equal(listComponents2ResponseSchema.safeParse({ ...output, total: 1 }).success, false);
  assert.throws(() =>
    validate({ ...output, contents: [{ ...output.contents[0], medium_count: -1 }] }),
  );
  assert.throws(() =>
    validate({ ...output, contents: [{ ...output.contents[0], id: "invalid" }] }),
  );
  assert.deepEqual(validate(json({ result: { results: { bindings: [] } }, count })).contents, []);
});

await test("CLI parameter validation and Zod input contract agree", async () => {
  const { parameters } = JSON.parse(
    await readFile(new URL("../queries/apis/list-components2/api.json", import.meta.url), "utf8"),
  );
  const defaults = Object.fromEntries(
    Object.entries(parameters).map(([key, definition]) => [key, definition.default]),
  );
  assert.deepEqual(listComponents2ParamsSchema.parse({}), defaults);
  const cases = [
    {},
    { role_id: "GMO_000042", property_id: "GMO_000050" },
    { limit: "0", offset: "100" },
    { limit: "9007199254740991" },
    { limit: "-1" },
    { limit: "01" },
    { limit: "9007199254740992" },
    { offset: "1.5" },
    { offset: "" },
    { role_id: "invalid" },
    { order: "DESC" },
    { other: "1" },
    ...["name", "id", "medium_count"].flatMap((sort) =>
      ["asc", "desc"].map((order) => ({ sort, order })),
    ),
  ];
  for (const supplied of cases) {
    let accepted = true;
    try {
      renderParameters("ASK {}", parameters, supplied);
    } catch {
      accepted = false;
    }
    assert.equal(
      listComponents2ParamsSchema.safeParse(supplied).success,
      accepted,
      JSON.stringify(supplied),
    );
  }
});
