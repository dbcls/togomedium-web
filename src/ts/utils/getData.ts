import { URL_API } from "../consts";

export async function getData<T = any>(apiName: string, body: string = ""): Promise<T | undefined> {
  const api = `${URL_API}${apiName}`;
  try {
    const res = await fetch(api, {
      method: "POST",
      mode: "cors",
      body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return await res.json();
  } catch (e) {
    return undefined;
  }
}
