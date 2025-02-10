const ENV_URL_API = typeof process !== "undefined" ? process.env?.URL_API : undefined;
export const makeApiUrl = (path: string) => {
  const URL_API: string = ENV_URL_API ?? "https://togomedium.org/sparqlist/api/";
  return `${URL_API}${path}`;
};
