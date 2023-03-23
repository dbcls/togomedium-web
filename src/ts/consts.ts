const URL_API_ENV = process.env.URL_API;
if (!URL_API_ENV) {
  throw new Error("URL_API is not defined");
}
export const URL_API: string = URL_API_ENV;
