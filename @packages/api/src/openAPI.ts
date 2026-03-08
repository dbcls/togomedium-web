import { componentDetailDoc } from "%api/componentDetail/definitions";
import { extendZod } from "%api/extendZod";
import { OpenApiGeneratorV31, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
extendZod();

export const registry = new OpenAPIRegistry();

registry.registerPath(componentDetailDoc);

export const getDocs = () => {
  const generator = new OpenApiGeneratorV31(registry.definitions);
  return generator.generateDocument({
    openapi: "3.1.0",
    info: {
      title: "TogoMedium API",
      version: "0.0.0",
      // description
    },
    servers: [
      {
        url: "https://",
        description: "",
      },
    ],
  });
};
