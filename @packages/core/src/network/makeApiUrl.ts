/// <reference types="vite/client" />
const ENV_URL_API = import.meta?.env?.VITE_URL_API;
export const makeApiUrl = (path: string) => {
  const URL_API: string = ENV_URL_API ?? "https://togomedium.org/sparqlist/api/";
  return `${URL_API}${path}`;
};
