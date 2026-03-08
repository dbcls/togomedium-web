const ENV_URL_API = import.meta.env?.VITE_URL_API;
export const makeApiUrl = (path: string) => {
  const URL_API: string = ENV_URL_API ?? "https://togomedium.org/sparqlist/api/";
  console.log(URL_API);
  return `${URL_API}${path}`;
};
