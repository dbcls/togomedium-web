import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { parseParameters, prepareQuery } from "./parameters.mjs";

const usage = "Usage: pnpm query <query.rq> [--output result.json] [--param name=value]";

function defaultOutputPath(queryPath) {
  const file = basename(queryPath, extname(queryPath));
  return join(dirname(queryPath), "results", `${file}.json`);
}

async function main() {
  const { remaining: args, values } = parseParameters(process.argv.slice(2));
  if (args.includes("--help") || args.includes("-h")) {
    console.log(usage);
    return;
  }

  let queryPath;
  let outputPath;
  while (args.length > 0) {
    const arg = args.shift();
    if (arg === "--output") {
      outputPath = args.shift();
      if (!outputPath || outputPath.startsWith("-")) {
        throw new Error(`--output requires a file path. ${usage}`);
      }
    } else if (arg.startsWith("-") || queryPath) {
      throw new Error(`Unexpected argument: ${arg}. ${usage}`);
    } else {
      queryPath = arg;
    }
  }

  if (!queryPath) throw new Error(usage);
  const query = await prepareQuery(await readFile(queryPath, "utf8"), queryPath, values);
  if (!query.trim()) throw new Error(`Query file is empty: ${queryPath}`);

  const endpoint = new URL(process.env.SPARQL_ENDPOINT || "https://togomedium.org/sparql");
  endpoint.searchParams.set("query", query);
  const response = await fetch(endpoint, {
    headers: { Accept: "application/sparql-results+json" },
    signal: AbortSignal.timeout(30_000),
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}\n${body}`);
  }

  const json = `${JSON.stringify(JSON.parse(body), null, 2)}\n`;
  const destination = outputPath ?? defaultOutputPath(queryPath);
  await mkdir(dirname(destination), { recursive: true });
  // Refresh generated results; protect explicitly named files from overwriting.
  await writeFile(destination, json, { flag: outputPath ? "wx" : "w" });
  console.log(`Saved: ${destination}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
