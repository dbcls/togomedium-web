import { componentDetailDoc } from "%api/componentDetail/definitions";
import { componentsWithComponentsDoc } from "%api/componentsWithComponents/definitions";
import { extendZod } from "%api/extendZod";
import { mediaComponentAlignmentTableDoc } from "%api/mediaComponentAlignment/definitions";
import { mediaStrainsAlignmentDoc } from "%api/mediaStrainsAlignment/definitions";
import { mediumDetailDoc } from "%api/mediumDetail/definitions";
import { statsCountCulturableSpeciesDoc } from "%api/statsCountCulturableSpecies/definitions";
import { statsGmCountByPhylumDoc } from "%api/statsGmCountByPhylum/definitions";
import { strainDetailDoc } from "%api/strainDetail/definitions";
import { taxonAncestorsDoc } from "%api/taxonAncestors.ts/definitions";
import { taxonChildrenDoc } from "%api/taxonChildren/definitions";
import { taxonDetailDoc } from "%api/taxonDetail/definitions";
import { taxonSearchByNameDoc } from "%api/taxonSearchByName/definitions";
import { OpenApiGeneratorV31, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
extendZod();

export const registry = new OpenAPIRegistry();

registry.registerPath(componentDetailDoc);
registry.registerPath(componentsWithComponentsDoc);
registry.registerPath(mediaComponentAlignmentTableDoc);
registry.registerPath(mediaStrainsAlignmentDoc);
registry.registerPath(mediumDetailDoc);
registry.registerPath(statsCountCulturableSpeciesDoc);
registry.registerPath(statsGmCountByPhylumDoc);
registry.registerPath(strainDetailDoc);
registry.registerPath(taxonAncestorsDoc);
registry.registerPath(taxonChildrenDoc);
registry.registerPath(taxonDetailDoc);
registry.registerPath(taxonSearchByNameDoc);

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
