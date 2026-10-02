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

// Kept self-contained so the exporter can embed the same validation and serialization.
export const prepareParameters = (definitions = {}, supplied = {}) => {
  const reserved = new Set(["prepared", "__proto__", "prototype", "constructor"]);
  const validName = (name) =>
    typeof name === "string" && /^[A-Za-z_][A-Za-z0-9_]*$/.test(name) && !reserved.has(name);
  const values = {};
  const literals = {};
  const lists = {};
  const integers = {};
  const aliases = new Set();
  for (const name of Object.keys(supplied)) {
    if (!Object.hasOwn(definitions, name)) throw new Error(`Unknown parameter: ${name}`);
  }
  for (const [name, definition] of Object.entries(definitions)) {
    if (!validName(name)) throw new Error(`Unsupported parameter name: ${name}`);
    const type = definition.type ?? "string";
    if (!["string", "integer", "string-list"].includes(type)) {
      throw new Error(`Unsupported parameter type: ${name}`);
    }
    if (definition.placeholder !== undefined && type !== "string-list") {
      throw new Error(`placeholder requires string-list type: ${name}`);
    }
    const value = Object.hasOwn(supplied, name) ? supplied[name] : definition.default;
    if (
      typeof value !== "string" ||
      (definition.pattern === undefined && type !== "string-list") ||
      (definition.pattern !== undefined &&
        (typeof definition.pattern !== "string" || !new RegExp(definition.pattern).test(value)))
    ) {
      throw new Error(`Invalid parameter: ${name}`);
    }
    values[name] = value;
    if (type === "string-list") {
      const placeholder = definition.placeholder ?? name;
      if (
        !validName(placeholder) ||
        aliases.has(placeholder) ||
        (placeholder !== name && Object.hasOwn(definitions, placeholder))
      ) {
        throw new Error(`Invalid or conflicting placeholder: ${placeholder}`);
      }
      aliases.add(placeholder);
      // JSON escapes used here are also valid in SPARQL double-quoted string literals.
      lists[placeholder] = value
        .split(",")
        .map((item) => JSON.stringify(item.trim()))
        .join(" ");
    } else {
      literals[name] = JSON.stringify(value);
      if (type === "integer") {
        if (
          !Number.isSafeInteger(Number(value)) ||
          Number(value) < 0 ||
          String(Number(value)) !== value
        ) {
          throw new Error(`Invalid integer parameter: ${name}`);
        }
        integers[name] = value;
      }
    }
  }
  return { values, literals, lists, integers };
};

// Replace tokens in the template once; never interpret braces in supplied values as tokens.
export const mapQueryParameters = (query, prepared, replace) => {
  const token = /"\{\{([A-Za-z_][A-Za-z0-9_]*)\}\}"|\{\{([^{}]*)\}\}/g;
  return query.replace(token, (match, quoted, bare, offset) => {
    if (quoted !== undefined) {
      if (!Object.hasOwn(prepared.literals, quoted)) {
        throw new Error(`Undefined scalar parameter: ${quoted}`);
      }
      return replace("literals", quoted);
    }
    if (Object.hasOwn(prepared.lists, bare)) {
      const before = query.slice(0, offset);
      const after = query.slice(offset + match.length);
      if (
        !/\bVALUES\s+[?$][A-Za-z_][A-Za-z0-9_]*\s*\{\s*$/i.test(before) ||
        !/^\s*\}/.test(after)
      ) {
        throw new Error(
          `List placeholder must occupy a complete single-variable VALUES body: ${bare}`,
        );
      }
      return replace("lists", bare);
    }
    if (Object.hasOwn(prepared.integers, bare)) return replace("integers", bare);
    throw new Error(
      `Undefined or unsupported placeholder: ${bare}. String parameters must occupy a complete double-quoted literal; bare parameters require integer type or a string-list VALUES body.`,
    );
  });
};

export function renderParameters(query, definitions = {}, supplied = {}) {
  const prepared = prepareParameters(definitions, supplied);
  return mapQueryParameters(query, prepared, (kind, name) => prepared[kind][name]);
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
