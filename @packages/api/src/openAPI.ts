import { componentDetailDoc } from "%api/componentDetail/definitions";
import { componentsWithComponentsDoc } from "%api/componentsWithComponents/definitions";
import { deprecatedAllComponentsDoc } from "%api/deprecated/AllComponents/definitions";
import { deprecatedInfraspecificListByTaxIdDoc } from "%api/deprecated/InfraspecificListByTaxid/definitions";
import { deprecatedListMediaDoc } from "%api/deprecated/ListMedia/definitions";
import { deprecatedListTaxonsByRankDoc } from "%api/deprecated/ListTaxonsByRank/definitions";
import { deprecatedTaxonomicRankByTaxIdDoc } from "%api/deprecated/TaxonomicRankByTaxid/definitions";
import { extendZod } from "%api/extendZod";
import { gmsByKeggTids3Doc } from "%api/gmsByKeggTids3/definitions";
import { gmsKeggCodeTidDoc } from "%api/gmsKeggCodeTid/definitions";
import { gtdbTaxonAncestorsDoc } from "%api/gtdbTaxonAncestors/definitions";
import { gtdbTaxonChildrenDoc } from "%api/gtdbTaxonChildren/definitions";
import { gtdbTaxonSearchByNameDoc } from "%api/gtdbTaxonSearchByName/definitions";
import { listChildrenOfTaxonDoc } from "%api/listChildrenOfTaxon/definitions";
import { listComponentsDoc } from "%api/listComponents/definitions";
import { listComponentsByIdsDoc } from "%api/listComponentsByIds/definitions";
import { listComponentsByKeywordDoc } from "%api/listComponentsByKeyword/definitions";
import { listMediaDoc } from "%api/listMedia/definitions";
import { listMediaByAttributesDoc } from "%api/listMediaByAttributes/definitions";
import { listMediaByCultivableCountDoc } from "%api/listMediaByCultivableCount/definitions";
import { listMediaByIdsDoc } from "%api/listMediaByIds/definitions";
import { listMediaByKeywordDoc } from "%api/listMediaByKeyword/definitions";
import { listMediaOfComponentDoc } from "%api/listMediaOfComponent/definitions";
import { listMediaOfStrainDoc } from "%api/listMediaOfStrain/definitions";
import { listMediaOfTaxonDoc } from "%api/listMediaOfTaxon/definitions";
import { listMediaOfGtdbTaxonsDoc, listMediaOfTaxonsDoc } from "%api/listMediaOfTaxons/definitions";
import { listOrganismByIdsDoc } from "%api/listOrganismByIds/definitions";
import { listOrganismByKeywordDoc } from "%api/listOrganismByKeyword/definitions";
import { listOrganismsDoc } from "%api/listOrganisms/definitions";
import { listOrganismsByPhenotypesDoc } from "%api/listOrganismsByPhenotypes/definitions";
import { listOrganismsOfMediumDoc } from "%api/listOrganismsOfMedium/definitions";
import { listPhenotypeOfStrainDoc } from "%api/listPhenotypeOfStrain/definitions";
import { listSimilarMediaDoc } from "%api/listSimilarMedia/definitions";
import { listStrainsDoc } from "%api/listStrains/definitions";
import { listStrainsOfTaxonDoc } from "%api/listStrainsOfTaxon/definitions";
import { mediaComponentAlignmentTableDoc } from "%api/mediaComponentAlignment/definitions";
import { mediaStrainsAlignmentDoc } from "%api/mediaStrainsAlignment/definitions";
import { mediumDetailDoc } from "%api/mediumDetail/definitions";
import { statsCountCulturableSpeciesDoc } from "%api/statsCountCulturableSpecies/definitions";
import { statsCountMediaByCultivableStrainCountDoc } from "%api/statsCountMediaByCultivableStrainCount/definitions";
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
registry.registerPath(deprecatedListMediaDoc);
registry.registerPath(deprecatedAllComponentsDoc);
registry.registerPath(deprecatedInfraspecificListByTaxIdDoc);
registry.registerPath(deprecatedListTaxonsByRankDoc);
registry.registerPath(deprecatedTaxonomicRankByTaxIdDoc);
registry.registerPath(gmsByKeggTids3Doc);
registry.registerPath(gmsKeggCodeTidDoc);
registry.registerPath(gtdbTaxonAncestorsDoc);
registry.registerPath(gtdbTaxonChildrenDoc);
registry.registerPath(gtdbTaxonSearchByNameDoc);
registry.registerPath(mediaComponentAlignmentTableDoc);
registry.registerPath(mediaStrainsAlignmentDoc);
registry.registerPath(mediumDetailDoc);
registry.registerPath(statsCountMediaByCultivableStrainCountDoc);
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
registry.registerPath(listMediaByCultivableCountDoc);
registry.registerPath(listMediaOfComponentDoc);
registry.registerPath(listMediaOfStrainDoc);
registry.registerPath(listMediaOfTaxonDoc);
registry.registerPath(listMediaOfTaxonsDoc);
registry.registerPath(listMediaOfGtdbTaxonsDoc);
registry.registerPath(listOrganismByIdsDoc);
registry.registerPath(listOrganismByKeywordDoc);
registry.registerPath(listOrganismsByPhenotypesDoc);
registry.registerPath(listOrganismsDoc);
registry.registerPath(listOrganismsOfMediumDoc);
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
        url: "https://togomedium.org/sparqlist/api",
        description: "",
      },
    ],
  });
};
