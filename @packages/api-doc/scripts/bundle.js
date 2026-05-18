import { copyFileSync, existsSync } from "fs";
import { join, resolve } from "path";
import { consola } from "consola";

export const bundle = () => {
  const cwd = process.cwd();
  const dist = resolve(cwd, "../web/public/assets");
  if (!existsSync(dist)) {
    consola.error("dist does not exist");
  }
  const openApiFile = join(cwd, "dist", "openapi3", "openapi.yaml");
  if (!existsSync(openApiFile)) {
    consola.error("openApiFile does not exist");
  }
  try {
    copyFileSync(openApiFile, join(dist, "togomedium-api.yaml"));
  } catch (e) {
    console.error(e);
  }
};
