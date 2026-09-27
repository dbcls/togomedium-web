import { fileURLToPath } from "node:url";
import { createServer } from "vite";

// Use the same tsconfig path resolution as the Web application, without listening or watching.
export const createValidationRuntime = async () => {
  const server = await createServer({
    configFile: false,
    root: fileURLToPath(new URL("../", import.meta.url)),
    resolve: { tsconfigPaths: true },
    server: { middlewareMode: true, watch: null, ws: false, hmr: false },
    appType: "custom",
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  return {
    importModule: (path) => server.ssrLoadModule(path),
    close: () => server.close(),
  };
};
