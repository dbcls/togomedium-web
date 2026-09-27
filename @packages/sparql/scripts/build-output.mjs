import { mkdir, readFile, writeFile } from "node:fs/promises";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const root = fileURLToPath(new URL("../", import.meta.url));

export async function loadApi(folder) {
  const directory = resolve(root, folder);
  const relativeDirectory = relative(join(root, "queries"), directory);
  if (
    !relativeDirectory ||
    isAbsolute(relativeDirectory) ||
    relativeDirectory === ".." ||
    relativeDirectory.startsWith(`..${sep}`)
  ) {
    throw new Error("API directory must be inside queries/.");
  }
  const config = JSON.parse(await readFile(join(directory, "api.json"), "utf8"));
  if (
    !config.inputs ||
    typeof config.inputs !== "object" ||
    Array.isArray(config.inputs) ||
    !Object.keys(config.inputs).length
  ) {
    throw new Error("api.json must define a non-empty inputs object.");
  }
  for (const [key, file] of Object.entries(config.inputs)) {
    if (
      !/^[A-Za-z_][A-Za-z0-9_]*$/.test(key) ||
      typeof file !== "string" ||
      !/^[A-Za-z0-9_-]+\.rq$/.test(file)
    ) {
      throw new Error("Each input must map a variable name to a local .rq filename.");
    }
  }
  if (
    config.validation !== undefined &&
    (typeof config.validation !== "string" || !/^[A-Za-z0-9_-]+\.mjs$/.test(config.validation))
  ) {
    throw new Error("Validation must be a local .mjs filename.");
  }
  return {
    directory,
    outputDirectory: join(directory, "results"),
    inputs: config.inputs,
    validation: config.validation,
  };
}

// Output functions must be self-contained: no imports or module-scope dependencies.
export function sparqlistSource(json) {
  return `({\n  json: ${json.toString()}\n})\n`;
}

export async function buildOutput(api) {
  const inputs = Object.fromEntries(
    await Promise.all(
      Object.entries(api.inputs).map(async ([key, file]) => [
        key,
        JSON.parse(await readFile(join(api.outputDirectory, `${file.slice(0, -3)}.json`), "utf8")),
      ]),
    ),
  );
  const { json } = await import(pathToFileURL(join(api.directory, "output.mjs")));
  const output = json(inputs);
  if (api.validation) {
    const { validate } = await import(pathToFileURL(join(api.directory, api.validation)));
    await validate(output);
  }
  await mkdir(api.outputDirectory, { recursive: true });
  for (const [file, text] of [
    ["output.json", `${JSON.stringify(output, null, 2)}\n`],
    ["output.sparqlist.js", sparqlistSource(json)],
  ]) {
    const destination = join(api.outputDirectory, file);
    await writeFile(destination, text);
    console.log(`Saved: ${relative(root, destination)}`);
  }
}
