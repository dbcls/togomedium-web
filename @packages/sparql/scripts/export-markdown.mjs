import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { loadApi, root, sparqlistSource } from "./build-output.mjs";
import {
  renderParameters,
  selectQueryFile,
  prepareParameters,
  mapQueryParameters,
} from "./parameters.mjs";

const contextKey = "prepared";
const endpoint = "{{SPARQLIST_TOGOMEDIUM_ENDPOINT}}";

const markdownText = (value, field) => {
  if (typeof value !== "string" || !value.trim() || /[\r\n]/.test(value)) {
    throw new Error(`${field} must be a non-empty single-line string.`);
  }
  return value.replace(/&/g, "&amp;").replace(/[\\`*_[\]<>#]/g, "\\$&");
};

const codeBlock = (language, source) => {
  const runs = source.match(/`+/g) ?? [];
  const fence = "`".repeat(Math.max(3, ...runs.map((run) => run.length + 1)));
  return `${fence}${language}\n${source.trimEnd()}\n${fence}`;
};

// Embedded in the exported Markdown; dependencies are supplied as standalone functions.
const prepareContext = (context, config, prepare, select) => {
  const supplied = Object.fromEntries(
    Object.keys(config.parameters ?? {})
      .filter((name) => Object.hasOwn(context, name))
      .map((name) => [name, context[name]]),
  );
  const prepared = prepare(config.parameters, supplied);
  const variants = Object.fromEntries(
    Object.entries(config.inputs).map(([name, file]) => {
      const selected = select(file, config, supplied);
      return [
        name,
        Object.fromEntries(
          Object.values(config.queryVariants?.[file]?.cases ?? {}).map((candidate, index) => [
            `case${index}`,
            candidate === selected,
          ]),
        ),
      ];
    }),
  );
  return { ...prepared, variants };
};

const templateQuery = (query, parameters) =>
  mapQueryParameters(
    query,
    prepareParameters(parameters),
    (kind, name) => `{{{${contextKey}.${kind === "integers" ? "values" : kind}.${name}}}}`,
  );

export const generateMarkdown = (config, sources, json) => {
  const title = markdownText(config.title, "title");
  const description = markdownText(config.description, "description");
  const definitions = config.parameters ?? {};
  const reserved = new Set([contextKey, "__proto__", "prototype", "constructor"]);
  for (const name of [...Object.keys(definitions), ...Object.keys(config.inputs)]) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name) || reserved.has(name)) {
      throw new Error(`Unsupported context name: ${name}`);
    }
  }
  renderParameters("", definitions);
  const parameterLines = Object.entries(definitions).map(([name, definition]) => {
    const explanation = markdownText(definition.description, `parameters.${name}.description`);
    if (definition.default.trim() !== definition.default || /[\r\n]/.test(definition.default)) {
      throw new Error(`Default cannot be represented in SPARQList Parameters: ${name}`);
    }
    const defaultValue =
      definition.default === "" ? "" : markdownText(definition.default, `default: ${name}`);
    const lines = [`- \`${name}\` ${explanation}`, `  - default: ${defaultValue}`];
    if (definition.examples !== undefined) {
      if (!Array.isArray(definition.examples))
        throw new Error(`examples must be an array: ${name}`);
      const examples = definition.examples.map((value) => {
        renderParameters("", definitions, { [name]: value });
        return markdownText(value, `example: ${name}`);
      });
      if (examples.length) lines.push(`  - example: ${examples.join(", ")}`);
    }
    return lines.join("\n");
  });
  const runtimeConfig = {
    inputs: config.inputs,
    parameters: definitions,
    queryVariants: config.queryVariants,
  };
  const prepareSource = `(context) => {\n  const prepare = ${prepareParameters.toString()};\n  const select = ${selectQueryFile.toString()};\n  return (${prepareContext.toString()})(context, ${JSON.stringify(runtimeConfig, null, 2)}, prepare, select);\n}`;
  const blocks = [`# ${title}`, description];
  if (parameterLines.length) blocks.push("## Parameters", parameterLines.join("\n"));
  blocks.push(
    "## Endpoint",
    endpoint,
    `## \`${contextKey}\` Validate parameters and select queries`,
    codeBlock("javascript", prepareSource),
  );
  for (const [name, file] of Object.entries(config.inputs)) {
    let query = templateQuery(sources[file], definitions);
    const variants = Object.values(config.queryVariants?.[file]?.cases ?? {});
    for (let index = variants.length - 1; index >= 0; index--) {
      const alternative = templateQuery(sources[variants[index]], definitions);
      query = `{{#if ${contextKey}.variants.${name}.case${index}}}\n${alternative}\n{{else}}\n${query}\n{{/if}}`;
    }
    blocks.push(`## \`${name}\``, codeBlock("sparql", query));
  }
  blocks.push("## Output", codeBlock("javascript", sparqlistSource(json)));
  return `${blocks.join("\n\n")}\n`;
};

export const exportMarkdown = async (folder) => {
  const api = await loadApi(folder);
  const config = JSON.parse(await readFile(join(api.directory, "api.json"), "utf8"));
  const files = new Set(Object.values(api.inputs));
  for (const [file, variant] of Object.entries(config.queryVariants ?? {})) {
    if (!files.has(file)) throw new Error(`Variant must refer to an input query: ${file}`);
    if (!Object.hasOwn(config.parameters ?? {}, variant.parameter)) {
      throw new Error("Query variant must reference a defined parameter.");
    }
    for (const [value, candidate] of Object.entries(variant.cases ?? {})) {
      renderParameters("", config.parameters, { [variant.parameter]: value });
      files.add(selectQueryFile(file, config, { [variant.parameter]: value }));
      if (!files.has(candidate)) throw new Error(`Invalid query variant: ${candidate}`);
    }
  }
  const sources = Object.fromEntries(
    await Promise.all(
      [...files].map(async (file) => [file, await readFile(join(api.directory, file), "utf8")]),
    ),
  );
  const { json } = await import(pathToFileURL(join(api.directory, "output.mjs")));
  const markdown = generateMarkdown(config, sources, json);
  const destination = join(api.directory, "dist", "sparqlist.md");
  await mkdir(join(api.directory, "dist"), { recursive: true });
  await writeFile(destination, markdown);
  console.log(`Saved: ${relative(root, destination)}`);
  return markdown;
};
