import { readFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";

export function parseParameters(args) {
  const values = {};
  const remaining = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== "--param") {
      remaining.push(args[i]);
      continue;
    }
    const assignment = args[++i];
    const match = assignment?.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/s);
    if (!match) throw new Error("--param requires name=value.");
    if (Object.hasOwn(values, match[1])) throw new Error(`Duplicate parameter: ${match[1]}`);
    values[match[1]] = match[2];
  }
  return { values, remaining };
}

// Strings require complete quoted literals; validated integers also support bare placeholders.
export function renderParameters(query, definitions = {}, supplied = {}) {
  for (const name of Object.keys(supplied)) {
    if (!Object.hasOwn(definitions, name)) throw new Error(`Unknown parameter: ${name}`);
  }
  const values = {};
  for (const [name, definition] of Object.entries(definitions)) {
    const value = Object.hasOwn(supplied, name) ? supplied[name] : definition.default;
    if (
      typeof value !== "string" ||
      typeof definition.pattern !== "string" ||
      !new RegExp(definition.pattern).test(value)
    ) {
      throw new Error(`Invalid parameter: ${name}`);
    }
    if (
      definition.type !== undefined &&
      definition.type !== "string" &&
      definition.type !== "integer"
    ) {
      throw new Error(`Unsupported parameter type: ${name}`);
    }
    if (
      definition.type === "integer" &&
      (!Number.isSafeInteger(Number(value)) || Number(value) < 0 || String(Number(value)) !== value)
    ) {
      throw new Error(`Invalid integer parameter: ${name}`);
    }
    values[name] = value;
  }
  // The whole literal is a placeholder, preventing raw SPARQL interpolation.
  let rendered = query.replace(/"\{\{([A-Za-z_][A-Za-z0-9_]*)\}\}"/g, (_, name) => {
    if (!Object.hasOwn(values, name)) throw new Error(`Undefined parameter: ${name}`);
    return JSON.stringify(values[name]);
  });
  rendered = rendered.replace(/\{\{([A-Za-z_][A-Za-z0-9_]*)\}\}/g, (placeholder, name) => {
    if (definitions[name]?.type !== "integer") return placeholder;
    return values[name];
  });
  if (/\{\{[^}]+\}\}/.test(rendered))
    throw new Error(
      "String parameters must occupy a complete double-quoted literal; bare parameters require integer type.",
    );
  return rendered;
}

export const selectQueryFile = (file, config = {}, supplied = {}) => {
  const variant = config.queryVariants?.[file];
  if (!variant) return file;
  if (!Object.hasOwn(config.parameters ?? {}, variant.parameter)) {
    throw new Error("Query variant must reference a defined parameter.");
  }
  const selected = supplied[variant.parameter] ?? config.parameters[variant.parameter].default;
  if (!Object.hasOwn(variant.cases ?? {}, selected)) return file;
  const selectedFile = variant.cases[selected];
  if (typeof selectedFile !== "string" || !/^[A-Za-z0-9_-]+\.rq$/.test(selectedFile)) {
    throw new Error("Query variant must be a local .rq filename.");
  }
  return selectedFile;
};

export async function prepareQuery(query, path, supplied) {
  let config;
  try {
    config = JSON.parse(await readFile(join(dirname(path), "api.json"), "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  // Validate all supplied values before selecting a configured query variant.
  const rendered = renderParameters(query, config?.parameters, supplied);
  const file = selectQueryFile(basename(path), config, supplied);
  if (file === basename(path)) return rendered;
  return renderParameters(
    await readFile(join(dirname(path), file), "utf8"),
    config.parameters,
    supplied,
  );
}
