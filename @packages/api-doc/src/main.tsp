import "./models/variables.tsp";

import "./paths/_list_media.tsp";
import "./paths/all_components.tsp";
import "./paths/component_by_gmoid.tsp";
import "./paths/components_with_components.tsp";
import "./paths/gms_by_kegg_tids_3.tsp";
import "./paths/gms_kegg_code_tid.tsp";
import "./paths/infraspecific_list_by_taxid.tsp";
import "./paths/list_media_by_taxon.tsp";
import "./paths/list_components.tsp";
import "./paths/list_components_by_gmoids.tsp";
import "./paths/list_components_by_keyword.tsp";
import "./paths/list_media.tsp";
import "./paths/list_media_by_gmids.tsp";
import "./paths/list_media_by_keyword.tsp";
import "./paths/list_media_by_cultivable_count.tsp";
import "./paths/list_organisms.tsp";
import "./paths/list_organisms_by_keyword.tsp";
import "./paths/list_organisms_by_taxids.tsp";
import "./paths/list_similar_media_by_gmid.tsp";
import "./paths/list_taxons_by_rank.tsp";
import "./paths/list_media_by_attributes.tsp";
import "./paths/list_organisms_by_phenotypes.tsp";
import "./paths/media_by_gmoid.tsp";
import "./paths/media_by_taxid.tsp";
import "./paths/media_component_alignment.tsp";
import "./paths/media_strains_alignment.tsp";
import "./paths/medium_by_gmid.tsp";
import "./paths/organism_by_taxid.tsp";
import "./paths/organisms_by_gmid.tsp";
import "./paths/stat_phylum_gm.tsp";
import "./paths/stat_count_media_by_cultivable_strain_count.tsp";
import "./paths/taxonomic_rank_by_taxid.tsp";
import "./paths/taxonomy_children.tsp";
import "./paths/taxonomy_ancestors.tsp";
import "./paths/taxonomy_search_by_name.tsp";

import "@typespec/http";
import "@typespec/rest";
import "@typespec/json-schema";
import "@typespec/openapi";

using TypeSpec.JsonSchema;
using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.OpenAPI;

@service({
  title: "TogoMedium API",
})
@doc("TogoMedium API is a RESTful API for TogoMedium, a database of growth media for microorganisms.")
@tagMetadata(
  Tags.ListStanza,
  #{
    description: "These endpoints return a list of data which is used by TogoMedium's List Stanza.",
  }
)
@tagMetadata(Tags.Detail, #{ description: "These endpoints return detailed information." })
@tagMetadata(
  Tags.Stanza,
  #{ description: "These endpoints return is used by TogoMedium's Stanza." }
)
@tagMetadata(
  Tags.MediaFinder,
  #{ description: "These endpoints are related to the media finder Stanzas" }
)
@tagMetadata(Tags.Deprecated, #{ description: "These endpoints have been deprecated." })
@server("https://togomedium.org/sparqlist/api")
namespace Root;

//namespace List{}
interface _ListMediaByTaxon extends ListMediaByTaxon {}
interface _ListMediaByAttributes extends ListMediaByAttributes {}
interface _ListComponentsByGmoIds extends ListComponentsByGmoIds {}
interface _ListComponentsByKeyword extends ListComponentsByKeyword {}
interface _ListMediaByGmIds extends ListMediaByGmIds {}
interface _ListMediaByKeyword extends ListMediaByKeyword {}
interface _ListOrganismsByPhenotypes extends ListOrganismsByPhenotypes {}
interface _ListOrganismsByKeyword extends ListOrganismsByKeyword {}
interface _ListOrganismsByTaxIds extends ListOrganismsByTaxIds {}
interface _ListSimilarMediaByGmId extends ListSimilarMediaByGmId {}
interface _ListMediaByCultivableCount extends ListMediaByCultivableCount {}
interface _MediaByGmoId extends MediaByGmoId {}
interface _MediaByTaxId extends MediaByTaxId {}
interface _OrganismsByGmId extends OrganismsByGmId {}
interface _ListComponents extends ListComponents {}
interface _ListMedia extends ListMedia {}
interface _ListOrganisms extends ListOrganisms {}
//
interface _ComponentByGmoid extends ComponentByGmoid {}
interface _MediumByGmId extends MediumByGmId {}
interface _OrganismByTaxId extends OrganismByTaxId {}
interface _TaxonomicRankByTaxId extends TaxonomicRankByTaxId {}
interface _TaxonomyAncestors extends TaxonomyAncestors {}
interface _TaxonomySearchByName extends TaxonomySearchByName {}
//
interface _MediaStrainsAlignment extends MediaStrainsAlignment {}
interface _MediaComponentAlignment extends MediaComponentAlignment {}
//
interface _gmsByKeggTids3 extends GmsByKeggTids3 {}
interface _gmsKeggCodeTid extends GmsKeggCodeTid {}
//
interface _componentWithComponents extends ComponentsWithComponents {}
interface _taxonomyChildren extends TaxonomyChildren {}
//
//
interface _StatPhylumGm extends StatPhylumGm {}
interface _CountMediaByCultivableStrainCount extends CountMediaByCultivableStrainCount {}
//
interface _allComponents extends AllComponents {}
interface _ListMediaDeprecated extends ListMediaDeprecated {}
interface _InfraspecificListByTaxId extends InfraspecificListByTaxId {}
interface _ListTaxonsByRank extends ListTaxonsByRank {}
