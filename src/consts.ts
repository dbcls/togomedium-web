// const URL_API_ENV = process.env.URL_API ?? "https://togomedium.org/sparqlist/api/";
// export const URL_API: string = URL_API_ENV;

export const URL_API: string = "https://togomedium.org/sparqlist/api";
export const API_MEDIA_LIST = `${URL_API}/list_media`;
export const API_STRAIN_LIST = `${URL_API}/list_strains`;
export const API_COMPONENT_LIST = `${URL_API}/list_components`;
export const API_MEDIUM_DETAIL = `${URL_API}/gmdb_medium_by_gmid`;
export const API_STRAIN_DETAIL = `${URL_API}/gmdb_strain_by_strainid`;
export const API_COMPONENT_DETAIL = `${URL_API}/gmdb_component_by_gmoid`;
export const API_STRAIN_PHENOTYPES = `${URL_API}/gmdb_phenotype_by_strainid`;
export const API_MEDIA_OF_STRAIN = `${URL_API}/gmdb_media_by_strainid`;
export const API_SIMILAR_MEDIA = `${URL_API}/gmdb_list_similar_media_by_gmid`;
export const API_MEDIA_OF_COMPONENT = `${URL_API}/gmdb_media_by_gmoid`;
