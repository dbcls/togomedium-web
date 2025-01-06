export async function fetchData<T = unknown>(
  api: string,
  body: string = ""
): Promise<T | undefined> {
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
    console.error(e);
    return undefined;
  }
}
