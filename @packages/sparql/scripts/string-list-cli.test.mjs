import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { join, relative } from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { root } from "./build-output.mjs";

const exec = promisify(execFile);

await test("query, api and export accept string-list configuration through the CLI", async () => {
  const directory = await mkdtemp(join(root, "queries/experimental/string-list-test-"));
  const received = [];
  const server = createServer((request, response) => {
    const query = new URL(request.url, "http://localhost").searchParams.get("query");
    received.push(query);
    response.setHeader("Content-Type", "application/sparql-results+json");
    response.end(JSON.stringify({ results: { bindings: [{ query: { value: query } }] } }));
  });
  try {
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    const config = {
      title: "CLI test",
      description: "CLI test",
      inputs: { result: "result.rq" },
      parameters: {
        gm_ids: {
          type: "string-list",
          default: "M1,M2",
          placeholder: "media_values",
          description: "Medium IDs.",
        },
      },
    };
    await writeFile(join(directory, "api.json"), JSON.stringify(config));
    await writeFile(
      join(directory, "result.rq"),
      "SELECT ?id WHERE { VALUES ?id { {{media_values}} } }",
    );
    await writeFile(
      join(directory, "output.mjs"),
      "export const json = ({ result }) => result.results.bindings[0].query.value;",
    );
    const run = (script, args) =>
      exec(process.execPath, [`scripts/${script}.mjs`, ...args], {
        cwd: root,
        env: {
          ...process.env,
          SPARQL_ENDPOINT: `http://127.0.0.1:${server.address().port}/sparql`,
        },
      });
    const folder = relative(root, directory);
    await run("query", [`${folder}/result.rq`, "--param", "gm_ids= M1 , M2,M1,"]);
    assert.equal(received[0], 'SELECT ?id WHERE { VALUES ?id { "M1" "M2" "M1" "" } }');
    await run("api", [folder, "--param", 'gm_ids=x"y,{{unknown}}']);
    assert.equal(received[1], 'SELECT ?id WHERE { VALUES ?id { "x\\"y" "{{unknown}}" } }');
    const output = JSON.parse(await readFile(join(directory, "results/output.json"), "utf8"));
    assert.equal(output, received[1]);
    await run("api", [folder, "--saved"]);
    // Export must not depend on saved query results or query the endpoint.
    await rm(join(directory, "results"), { recursive: true });
    await run("export", [folder]);
    assert.match(
      await readFile(join(directory, "dist/sparqlist.md"), "utf8"),
      /prepared.lists.media_values/,
    );
    assert.equal(received.length, 2);
    await assert.rejects(run("query", [`${folder}/result.rq`, "--param", "media_values=M1"]));
    assert.equal(received.length, 2);
  } finally {
    try {
      if (server.listening)
        await new Promise((resolve, reject) =>
          server.close((error) => (error ? reject(error) : resolve())),
        );
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }
});
