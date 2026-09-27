import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadApi, buildOutput, root } from "./build-output.mjs";
import { parseParameters, prepareQuery } from "./parameters.mjs";

const usage = "Usage: pnpm api <queries/path/to/feature> [--saved] [--param name=value]";
try {
  const { remaining, values } = parseParameters(process.argv.slice(2));
  const [folder, ...options] = remaining;
  if (folder === "--help" || folder === "-h") {
    console.log(usage);
  } else {
    if (
      !folder ||
      folder.startsWith("-") ||
      options.length > 1 ||
      (options.length && options[0] !== "--saved")
    ) {
      throw new Error(usage);
    }
    const api = await loadApi(folder);
    if (options.includes("--saved") && Object.keys(values).length) {
      throw new Error(
        "--saved cannot be combined with --param; saved results are not filtered again.",
      );
    }
    const parameterArgs = Object.entries(values).flatMap(([name, value]) => [
      "--param",
      `${name}=${value}`,
    ]);
    if (!options.includes("--saved")) {
      for (const file of new Set(Object.values(api.inputs))) {
        const path = join(api.directory, file);
        await prepareQuery(await readFile(path, "utf8"), path, values);
      }
    }
    if (!options.includes("--saved")) {
      for (const file of new Set(Object.values(api.inputs))) {
        const run = spawnSync(
          process.execPath,
          [
            "--env-file-if-exists=.env",
            "scripts/query.mjs",
            join(api.directory, file),
            ...parameterArgs,
          ],
          { cwd: root, stdio: "inherit" },
        );
        if (run.error) throw run.error;
        if (run.status !== 0) throw new Error(`Query failed: ${file}; output was not regenerated.`);
      }
    }
    await buildOutput(api);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
