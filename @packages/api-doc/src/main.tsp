import "./models/variables.tsp";
//
import "./paths/component_detail.tsp";
import "./paths/medium_detail.tsp";
import "./paths/taxon_detail.tsp";
import "./paths/strain_detail.tsp";
import "./paths/components_with_components.tsp";
import "./paths/gms_by_kegg_tids_3.tsp";
import "./paths/gms_kegg_code_tid.tsp";
import "./paths/list_children_of_taxon.tsp";
import "./paths/list_components.tsp";
import "./paths/list_components_by_gmoids.tsp";
import "./paths/list_components_by_keyword.tsp";
import "./paths/list_media.tsp";
import "./paths/list_media_by_gmids.tsp";
import "./paths/list_media_of_strain.tsp";
import "./paths/list_media_by_keyword.tsp";
import "./paths/list_media_by_cultivable_count.tsp";
import "./paths/list_media_by_attributes.tsp";
import "./paths/list_media_of_taxons.tsp";
import "./paths/list_media_of_taxon.tsp";
import "./paths/list_media_of_component.tsp";
import "./paths/list_organisms.tsp";
import "./paths/list_organisms_by_keyword.tsp";
import "./paths/list_organisms_by_taxids.tsp";
import "./paths/list_similar_media_by_gmid.tsp";
import "./paths/list_organisms_by_phenotypes.tsp";
import "./paths/list_phenotype_of_strain.tsp";
import "./paths/list_strains_of_taxon.tsp";
import "./paths/list_organisms_of_medium.tsp";

import "./paths/media_component_alignment.tsp";
import "./paths/media_strains_alignment.tsp";
import "./paths/stat_phylum_gm.tsp";
import "./paths/stat_count_media_by_cultivable_strain_count.tsp";
import "./paths/taxon_children.tsp";
import "./paths/taxon_ancestors.tsp";
import "./paths/taxon_search_by_name.tsp";
//
import "./paths/list_media_of_gtdb_taxons.tsp";
import "./paths/gtdb_taxon_children.tsp";
import "./paths/gtdb_taxon_ancestors.tsp";
import "./paths/gtdb_taxon_search_by_name.tsp";
//
import "./paths/deprecated/_list_media.tsp";
import "./paths/deprecated/all_components.tsp";
import "./paths/deprecated/infraspecific_list_by_taxid.tsp";
import "./paths/deprecated/list_taxons_by_rank.tsp";
import "./paths/deprecated/taxonomic_rank_by_taxid.tsp";

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
interface _ListMediaOfTaxons extends ListMediaOfTaxons {}
interface _ListMediaOfTaxon extends ListMediaOfTaxon {}
interface _ListMediaByAttributes extends ListMediaByAttributes {}
interface _ListComponentsByGmoIds extends ListComponentsByGmoIds {}
interface _ListComponentsByKeyword extends ListComponentsByKeyword {}
interface _ListMediaByGmIds extends ListMediaByGmIds {}
interface _ListMediaByKeyword extends ListMediaByKeyword {}
interface _ListMediaOfStrain extends ListMediaOfStrain {}
interface _ListOrganismsByPhenotypes extends ListOrganismsByPhenotypes {}
interface _ListOrganismsByKeyword extends ListOrganismsByKeyword {}
interface _ListOrganismsByTaxIds extends ListOrganismsByTaxIds {}
interface _ListSimilarMediaByGmId extends ListSimilarMediaByGmId {}
interface _ListMediaByCultivableCount extends ListMediaByCultivableCount {}
interface _ListPhenotypeOfStrain extends ListPhenotypeOfStrain {}
interface _ListMediaOfComponent extends ListMediaOfComponent {}
interface _ListComponents extends ListComponents {}
interface _ListMedia extends ListMedia {}
interface _ListOrganisms extends ListOrganisms {}
interface _ListChildrenOfTaxon extends ListChildrenOfTaxon {}
interface _ListStrainsOfTaxon extends ListStrainsOfTaxon {}
interface _ListOrganismsOfMedium extends ListOrganismsOfMedium {}
//
interface _StrainDetail extends StrainDetail {}
interface _TaxonDetail extends TaxonDetail {}
interface _ComponentDetail extends ComponentDetail {}
interface _MediumDetail extends MediumDetail {}
//
interface _TaxonAncestors extends TaxonAncestors {}
interface _TaxonSearchByName extends TaxonSearchByName {}
interface _TaxonChildren extends TaxonChildren {}
interface _componentWithComponents extends ComponentsWithComponents {}
//
interface _GTDBListMediaOfTaxons extends GTDBListMediaOfTaxons {}
interface _GTDBTaxonSearchByName extends GTDBTaxonSearchByName {}
interface _GTDBTaxonAncestors extends GTDBTaxonAncestors {}
interface _GTDBTaxonChildren extends GTDBTaxonChildren {}
//
interface _MediaStrainsAlignment extends MediaStrainsAlignment {}
interface _MediaComponentAlignment extends MediaComponentAlignment {}
//
interface _StatPhylumGm extends StatPhylumGm {}
interface _CountMediaByCultivableStrainCount extends CountMediaByCultivableStrainCount {}
//
interface _gmsByKeggTids3 extends GmsByKeggTids3 {}
interface _gmsKeggCodeTid extends GmsKeggCodeTid {}
// deprecated
interface _TaxonomicRankByTaxId extends TaxonomicRankByTaxId {}
interface _AllComponents extends AllComponents {}
interface _ListMediaDeprecated extends ListMediaDeprecated {}
interface _InfraspecificListByTaxId extends InfraspecificListByTaxId {}
interface _ListTaxonsByRank extends ListTaxonsByRank {}
