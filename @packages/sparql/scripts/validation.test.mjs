import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { buildOutput, loadApi } from "./build-output.mjs";
import { createValidationRuntime } from "./validation-runtime.mjs";

const runtime = await createValidationRuntime();
try {
  await runtime.importModule(fileURLToPath(new URL("./validation-cases.mjs", import.meta.url)));
} finally {
  await runtime.close();
}

await test("migrated APIs resolve in all three categories", async () => {
  for (const folder of [
    "reference/list-components",
    "experimental/components",
    "apis/list-components2",
  ]) {
    const api = await loadApi(`queries/${folder}`);
    for (const file of Object.values(api.inputs)) {
      assert.ok((await readFile(join(api.directory, file), "utf8")).includes("SELECT"));
    }
  }
  await assert.rejects(loadApi("../api"), /inside queries/);
});

await test("output validation runs before either generated output is replaced", async () => {
  const directory = await mkdtemp(join(tmpdir(), "sparql-validation-"));
  try {
    const outputDirectory = join(directory, "results");
    await mkdir(outputDirectory);
    await writeFile(join(directory, "output.mjs"), "export const json = ({result}) => result;");
    await writeFile(
      join(directory, "validate.mjs"),
      "export const validate = output => { if (!output.ok) throw new Error('contract rejected'); };",
    );
    const api = {
      directory,
      outputDirectory,
      inputs: { result: "result.rq" },
      validation: "validate.mjs",
    };
    await writeFile(join(outputDirectory, "result.json"), '{"ok":false}');
    for (const name of ["output.json", "output.sparqlist.js"])
      await writeFile(join(outputDirectory, name), "previous");
    await assert.rejects(buildOutput(api), /contract rejected/);
    for (const name of ["output.json", "output.sparqlist.js"])
      assert.equal(await readFile(join(outputDirectory, name), "utf8"), "previous");
    await writeFile(join(outputDirectory, "result.json"), '{"ok":true}');
    await buildOutput(api);
    assert.deepEqual(JSON.parse(await readFile(join(outputDirectory, "output.json"), "utf8")), {
      ok: true,
    });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
