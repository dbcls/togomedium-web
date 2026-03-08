import { componentDetailDoc } from "%api/componentDetail/definitions";
import { componentsWithComponentsDoc } from "%api/componentsWithComponents/definitions";
import { extendZod } from "%api/extendZod";
import { listChildrenOfTaxonDoc } from "%api/listChildrenOfTaxon/definitions";
import { listComponentsDoc } from "%api/listComponents/definitions";
import { listComponentsByIdsDoc } from "%api/listComponentsByIds/definitions";
import { listComponentsByKeywordDoc } from "%api/listComponentsByKeyword/definitions";
import { listMediaDoc } from "%api/listMedia/definitions";
import { listMediaByAttributesDoc } from "%api/listMediaByAttributes/definitions";
import { listMediaByIdsDoc } from "%api/listMediaByIds/definitions";
import { listMediaByKeywordDoc } from "%api/listMediaByKeyword/definitions";
import { listMediaOfComponentDoc } from "%api/listMediaOfComponent/definitions";
import { listMediaOfStrainDoc } from "%api/listMediaOfStrain/definitions";
import { listMediaOfTaxonDoc } from "%api/listMediaOfTaxon/definitions";
import { listMediaOfGtdbTaxonsDoc, listMediaOfTaxonsDoc } from "%api/listMediaOfTaxons/definitions";
import { listOrganismByIdsDoc } from "%api/listOrganismByIds/definitions";
import { listOrganismByKeywordDoc } from "%api/listOrganismByKeyword/definitions";
import { listOrganismsByPhenotypesDoc } from "%api/listOrganismsByPhenotypes/definitions";
import { listPhenotypeOfStrainDoc } from "%api/listPhenotypeOfStrain/definitions";
import { listSimilarMediaDoc } from "%api/listSimilarMedia/definitions";
import { listStrainsDoc } from "%api/listStrains/definitions";
import { listStrainsOfTaxonDoc } from "%api/listStrainsOfTaxon/definitions";
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
registry.registerPath(listChildrenOfTaxonDoc);
registry.registerPath(listComponentsDoc);
registry.registerPath(listComponentsByIdsDoc);
registry.registerPath(listComponentsByKeywordDoc);
registry.registerPath(listMediaDoc);
registry.registerPath(listMediaByAttributesDoc);
registry.registerPath(listMediaByIdsDoc);
registry.registerPath(listMediaByKeywordDoc);
registry.registerPath(listMediaOfComponentDoc);
registry.registerPath(listMediaOfStrainDoc);
registry.registerPath(listMediaOfTaxonDoc);
registry.registerPath(listMediaOfTaxonsDoc);
registry.registerPath(listMediaOfGtdbTaxonsDoc);
registry.registerPath(listOrganismByIdsDoc);
registry.registerPath(listOrganismByKeywordDoc);
registry.registerPath(listOrganismsByPhenotypesDoc);
registry.registerPath(listPhenotypeOfStrainDoc);
registry.registerPath(listSimilarMediaDoc);
registry.registerPath(listStrainsDoc);
registry.registerPath(listStrainsOfTaxonDoc);

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
