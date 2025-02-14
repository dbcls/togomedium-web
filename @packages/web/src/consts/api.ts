const defaultAPI = "https://togomedium.org/sparqlist/api";
const defaultStanza = "https://dbcls.github.io/togomedium-stanza";

const URL_API_ENV = import.meta.env.VITE_URL_API ?? defaultAPI;
const URL_STANZA_ENV = import.meta.env.VITE_URL_STANZA ?? defaultStanza;

export const URL_API = URL_API_ENV;
export const URL_STANZA = URL_STANZA_ENV;

/**
 * @deprecated
 */
export const API_MEDIA_LIST = `${URL_API}/list_media`;
/**
 * @deprecated
 */
export const API_STRAIN_LIST = `${URL_API}/list_strains`;
/**
 * @deprecated
 */
export const API_COMPONENT_LIST = `${URL_API}/list_components`;
/**
 * @deprecated
 */
export const API_MEDIUM_DETAIL = `${URL_API}/gmdb_medium_by_gmid`;
/**
 * @deprecated
 */
export const API_STRAIN_DETAIL = `${URL_API}/gmdb_strain_by_strainid`;
/**
 * @deprecated
 */
export const API_TAX_DETAIL = `${URL_API}/gmdb_taxonomic_rank_by_taxid`;
/**
 * @deprecated
 */
export const API_COMPONENT_DETAIL = `${URL_API}/gmdb_component_by_gmoid`;
/**
 * @deprecated
 */
export const API_STRAIN_PHENOTYPES = `${URL_API}/gmdb_phenotype_by_strainid`;
/**
 * @deprecated
 */
export const API_MEDIA_OF_STRAIN = `${URL_API}/gmdb_media_by_strainid`;
/**
 * @deprecated
 */
export const API_SIMILAR_MEDIA = `${URL_API}/gmdb_list_similar_media_by_gmid`;
/**
 * @deprecated
 */
export const API_MEDIA_OF_COMPONENT = `${URL_API}/gmdb_media_by_gmoid`;
/**
 * @deprecated
 */
export const API_PHYLUM_STATS = `${URL_API}/gmdb_stat_phylum_gm`;
/**
 * @deprecated
 */
export const API_CHILDREN_OF_TAXON = `${URL_API}/gmdb_organism_under_rank_by_taxid`;
/**
 * @deprecated
 */
export const API_STRAINS_OF_TAXON = `${URL_API}/gmdb_strain_list_by_taxid`;
/**
 * @deprecated
 */
export const API_MEDIA_OF_TAXON = `${URL_API}/gmdb_media_by_taxid`;
/**
 * @deprecated
 */
export const API_MEDIA_BY_GM_IDS = `${URL_API}/gmdb_list_media_by_gmids`;
/**
 * @deprecated
 */
export const API_MEDIA_BY_KEYWORD = `${URL_API}/gmdb_list_media_by_keyword`;
/**
 * @deprecated
 */
export const API_COMPONENTS_BY_GMO_IDS = `${URL_API}/gmdb_list_components_by_gmoids`;
/**
 * @deprecated
 */
export const API_COMPONENTS_BY_KEYWORD = `${URL_API}/gmdb_list_components_by_keyword`;
/**
 * @deprecated
 */
export const API_ORGANISMS_BY_TAX_IDS = `${URL_API}/gmdb_list_organisms_by_taxids`;
/**
 * @deprecated
 */
export const API_ORGANISMS_BY_KEYWORD = `${URL_API}/gmdb_list_organisms_by_keyword`;

export const URL_CONTACT = "https://dbcls.rois.ac.jp/contact-en.html";
