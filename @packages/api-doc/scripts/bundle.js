import { consola } from "consola";
import { copyFileSync, existsSync } from "fs";
import { join, resolve } from "path";

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
    throw e;
  }
};
