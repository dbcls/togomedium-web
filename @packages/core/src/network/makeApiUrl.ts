/// <reference types="vite/client" />
const ENV_URL_API = import.meta?.env?.VITE_URL_API;
export const makeApiUrl = (path: string, getParams?: URLSearchParams) => {
  const URL_API: string = ENV_URL_API ?? "https://togomedium.org/sparqlist/api/";
  const baseUrl = URL_API.endsWith("/") ? URL_API : `${URL_API}/`;
  const pathWithoutLeadingSlash = path.startsWith("/") ? path.slice(1) : path;
  const url = `${baseUrl}${pathWithoutLeadingSlash}`;
  if (getParams) {
    return `${url}?${getParams.toString()}`;
  } else {
    return url;
  }
};
