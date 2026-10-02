import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import vm from "node:vm";
import { root } from "./build-output.mjs";
import { generateMarkdown } from "./export-markdown.mjs";

const blocks = (markdown, language) =>
  [...markdown.matchAll(new RegExp("^(`{3,})" + language + "\\n([\\s\\S]*?)^\\1$", "gm"))].map(
    (match) => match[2],
  );
const fixture = {
  title: "Test API",
  description: "Test description",
  inputs: { result: "base.rq" },
  parameters: {
    sort: { default: "name", pattern: "^(name|count)$", description: "Order", examples: ["count"] },
    limit: {
      default: "20",
      type: "integer",
      pattern: "^(?:0|[1-9][0-9]*)$",
      description: "Page size",
    },
    text: { default: "", pattern: "^[\\s\\S]*$", description: "Text" },
  },
  queryVariants: { "base.rq": { parameter: "sort", cases: { count: "count.rq" } } },
};
const sources = {
  "base.rq": 'SELECT * WHERE { BIND("{{text}}" AS ?text) } LIMIT {{limit}}',
  "count.rq": "SELECT (COUNT(*) AS ?count) WHERE { ?s ?p ?o } LIMIT {{limit}}",
};
const json = ({ result }) => result;

await test("Markdown binds prepared parameters, conditional SPARQL and a standalone Output", () => {
  const markdown = generateMarkdown(fixture, sources, json);
  const [prepareSource, outputSource] = blocks(markdown, "javascript");
  const prepare = vm.runInNewContext(prepareSource);
  const original = {
    sort: "count",
    limit: "0",
    text: 'a"\\\n<&',
    SPARQLIST_TOGOMEDIUM_ENDPOINT: "https://example.org/sparql",
  };
  const prepared = prepare(original);
  assert.equal(prepared.values.limit, "0");
  assert.equal(prepared.literals.text, JSON.stringify(original.text));
  assert.equal(prepared.variants.result.case0, true);
  assert.equal(prepare({}).variants.result.case0, false);
  assert.equal(prepare({}).values.text, "");
  assert.equal(Object.hasOwn(original, "prepared"), false);
  const [query] = blocks(markdown, "sparql");
  assert.match(query, /\{\{#if prepared.variants.result.case0\}\}/);
  assert.match(query, /BIND\(\{\{\{prepared.literals.text\}\}\} AS/);
  assert.match(query, /LIMIT \{\{\{prepared.values.limit\}\}\}/);
  assert.deepEqual(vm.runInNewContext(outputSource).json({ result: original }), original);
  assert.match(markdown, /## Endpoint\n\n\{\{SPARQLIST_TOGOMEDIUM_ENDPOINT\}\}/);
  assert.doesNotMatch(markdown, /import |validate\.mjs/);
});

await test("generated validation rejects unsafe and malformed parameters before queries", () => {
  const prepare = vm.runInNewContext(
    blocks(generateMarkdown(fixture, sources, json), "javascript")[0],
  );
  for (const supplied of [
    { limit: "-1" },
    { limit: "9007199254740992" },
    { limit: "01" },
    { limit: "" },
    { limit: 20 },
    { sort: "invalid" },
  ]) {
    assert.throws(() => prepare(supplied), /Invalid/);
  }
});

await test("export rejects incomplete metadata and unsupported placeholders", () => {
  assert.throws(() => generateMarkdown({ ...fixture, title: undefined }, sources, json), /title/);
  assert.throws(
    () =>
      generateMarkdown(
        { ...fixture, parameters: { missing: { default: "", pattern: ".*" } } },
        sources,
        json,
      ),
    /description/,
  );
  assert.throws(
    () => generateMarkdown(fixture, { ...sources, "base.rq": "SELECT {{text}}" }, json),
    /String parameters/,
  );
  assert.throws(
    () => generateMarkdown({ ...fixture, inputs: { prepared: "base.rq" } }, sources, json),
    /context name/,
  );
  assert.throws(
    () =>
      generateMarkdown(
        {
          ...fixture,
          parameters: { text: { default: " spaced ", pattern: ".*", description: "Text" } },
        },
        sources,
        json,
      ),
    /Default/,
  );
});

await test("all adopted API definitions export without saved results or network access", async () => {
  for (const folder of [
    "search-components",
    "list-component-roles",
    "count-components-by-role",
    "count-components-by-property",
  ]) {
    const directory = join(root, "queries/apis", folder);
    const config = JSON.parse(await readFile(join(directory, "api.json"), "utf8"));
    const files = new Set([
      ...Object.values(config.inputs),
      ...Object.values(config.queryVariants ?? {}).flatMap((variant) =>
        Object.values(variant.cases),
      ),
    ]);
    const queries = Object.fromEntries(
      await Promise.all(
        [...files].map(async (file) => [file, await readFile(join(directory, file), "utf8")]),
      ),
    );
    const { json } = await import(pathToFileURL(join(directory, "output.mjs")));
    const markdown = generateMarkdown(config, queries, json);
    assert.equal(blocks(markdown, "sparql").length, Object.keys(config.inputs).length);
    const prepare = vm.runInNewContext(blocks(markdown, "javascript")[0]);
    assert.doesNotThrow(() => prepare({}));
  }
});

await test("export CLI requires one folder and supports help without fetching", () => {
  const missing = spawnSync(process.execPath, ["scripts/export.mjs"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /Usage: pnpm export/);
  const help = spawnSync(process.execPath, ["scripts/export.mjs", "--help"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(help.status, 0);
  assert.match(help.stdout, /Usage: pnpm export/);
});

await test("exported string-list preparation matches local rendering and escapes literal content", async () => {
  const { renderParameters } = await import("./parameters.mjs");
  const config = {
    title: "List test",
    description: "List test",
    inputs: { result: "result.rq" },
    parameters: {
      gm_ids: {
        type: "string-list",
        placeholder: "media_values",
        default: "M2794,M941",
        description: "Comma-separated medium IDs.",
      },
    },
  };
  const query = "SELECT ?id WHERE { VALUES ?id { {{media_values}} } }";
  const markdown = generateMarkdown(config, { "result.rq": query }, json);
  const prepare = vm.runInNewContext(blocks(markdown, "javascript")[0]);
  const [template] = blocks(markdown, "sparql");
  assert.match(template, /\{\{\{prepared.lists.media_values\}\}\}/);
  for (const gm_ids of [
    undefined,
    "M1,M2",
    " M1 , M2 ",
    "",
    ",",
    "M1,M1,",
    'a" } UNION { ?s ?p ?o } #,x\\y,z\nq,{{other}}',
  ]) {
    const supplied = gm_ids === undefined ? {} : { gm_ids };
    const prepared = prepare(supplied);
    // This template has one raw Handlebars substitution; its value is inserted once.
    const expanded = template
      .replace("{{{prepared.lists.media_values}}}", () => prepared.lists.media_values)
      .trim();
    assert.equal(expanded, renderParameters(query, config.parameters, supplied));
  }
  assert.throws(() => prepare({ gm_ids: 10 }), /Invalid/);
});
