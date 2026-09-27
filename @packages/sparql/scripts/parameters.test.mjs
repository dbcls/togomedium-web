import assert from "node:assert/strict";
import { join } from "node:path";
import test from "node:test";
import { parseParameters, renderParameters } from "./parameters.mjs";
const definitions = { filter: { default: "", pattern: "^(?:ITEM_[0-9]+)?$" } };
await test("uses defaults and overrides repeated placeholders", () => {
  assert.equal(
    renderParameters('FILTER("{{filter}}" = "{{filter}}")', definitions),
    'FILTER("" = "")',
  );
  assert.equal(renderParameters('"{{filter}}"', definitions, { filter: "ITEM_12" }), '"ITEM_12"');
});
await test("rejects unknown, invalid, and unsafe substitutions", () => {
  assert.throws(() => renderParameters('"{{filter}}"', definitions, { other: "x" }), /Unknown/);
  assert.throws(
    () => renderParameters('"{{filter}}"', definitions, { filter: '" } UNION {' }),
    /Invalid/,
  );
  assert.throws(() => renderParameters("<{{filter}}>", definitions), /complete/);
  assert.equal(
    renderParameters('"{{text}}"', { text: { default: '"\\\n', pattern: "^[\\s\\S]*$" } }),
    JSON.stringify('"\\\n'),
  );
});
await test("parses assignments and preserves other CLI arguments", () => {
  assert.deepEqual(parseParameters(["folder", "--param", "filter=ITEM_1"]), {
    remaining: ["folder"],
    values: { filter: "ITEM_1" },
  });
  assert.throws(() => parseParameters(["--param"]), /name=value/);
  assert.throws(() => parseParameters(["--param", "x=1", "--param", "x=2"]), /Duplicate/);
});

await test("selects configured local variants after validating parameters", async () => {
  const { mkdtemp, writeFile, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { prepareQuery } = await import("./parameters.mjs");
  const directory = await mkdtemp(join(tmpdir(), "query-variants-"));
  const config = {
    parameters: { mode: { default: "base", pattern: "^(?:base|aggregate)$" } },
    queryVariants: { "main.rq": { parameter: "mode", cases: { aggregate: "aggregate.rq" } } },
  };
  try {
    await writeFile(join(directory, "api.json"), JSON.stringify(config));
    await writeFile(join(directory, "aggregate.rq"), 'SELECT "{{mode}}"');
    assert.equal(await prepareQuery("ASK {}", join(directory, "main.rq"), {}), "ASK {}");
    assert.equal(
      await prepareQuery("ASK {}", join(directory, "main.rq"), { mode: "aggregate" }),
      'SELECT "aggregate"',
    );
    assert.equal(
      await prepareQuery("ASK {}", join(directory, "count.rq"), { mode: "aggregate" }),
      "ASK {}",
    );
    await assert.rejects(
      prepareQuery("ASK {}", join(directory, "main.rq"), { mode: "bad" }),
      /Invalid/,
    );
    config.queryVariants["main.rq"].cases.aggregate = "../outside.rq";
    await writeFile(join(directory, "api.json"), JSON.stringify(config));
    await assert.rejects(
      prepareQuery("ASK {}", join(directory, "main.rq"), { mode: "aggregate" }),
      /local .rq/,
    );
    config.queryVariants["main.rq"].parameter = "unknown";
    await writeFile(join(directory, "api.json"), JSON.stringify(config));
    await assert.rejects(
      prepareQuery("ASK {}", join(directory, "main.rq"), {}),
      /defined parameter/,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

await test("renders validated integers as bare tokens or string-valued metadata", () => {
  const defs = { limit: { type: "integer", default: "20", pattern: "^(?:0|[1-9][0-9]*)$" } };
  assert.equal(
    renderParameters('SELECT ("{{limit}}" AS ?limit) {} LIMIT {{limit}}', defs),
    'SELECT ("20" AS ?limit) {} LIMIT 20',
  );
  assert.equal(renderParameters("LIMIT {{limit}}", defs, { limit: "0" }), "LIMIT 0");
  for (const limit of [
    "-1",
    "1.5",
    "01",
    "+1",
    "1e2",
    "",
    "2\n",
    "9007199254740992",
    "1 OFFSET 0",
  ]) {
    assert.throws(() => renderParameters("LIMIT {{limit}}", defs, { limit }), /Invalid/);
  }
  assert.throws(() => renderParameters("{{filter}}", definitions), /complete/);
  assert.throws(
    () => renderParameters("{{x}}", { x: { type: "raw", default: "1", pattern: ".*" } }),
    /Unsupported/,
  );
});
