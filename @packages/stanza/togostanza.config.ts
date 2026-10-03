import { resolve } from "node:path";
import { defineTogoStanzaConfig } from "togostanza/config";
import { loadEnv, type ConfigEnv } from "vite";

export default ({ mode }: ConfigEnv) => {
  const envDir = import.meta.dirname;
  const env = loadEnv(mode, envDir, ["VITE_URL_API", "URL_API"]);
  // Keep existing Stanza .env files working while preferring the shared Vite name.
  const apiUrl = env.VITE_URL_API ?? env.URL_API;

  return defineTogoStanzaConfig({
    vite: {
      envDir,
      define:
        apiUrl === undefined ? {} : { "import.meta.env.VITE_URL_API": JSON.stringify(apiUrl) },
      resolve: {
        alias: {
          "%stanza": envDir,
          "%core": resolve(envDir, "../core/src"),
          "%api": resolve(envDir, "../api/src"),
        },
      },
    },
  });
};
