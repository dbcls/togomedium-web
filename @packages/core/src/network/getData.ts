import { isArray, Optional, Nullable } from "yohak-tools";

export const getData = async <ResponseBody, Params extends ParamObject = ParamObject>(
  url: string,
  params: Params,
  abortController?: AbortController
): Promise<ApiResponse<ResponseBody>> => {
  const response = await fetch(
    url,
    makeOptions(params, abortController ? abortController.signal : null)
  );

  if (response.status !== 200) {
    return {
      status: response.status,
      message: response.statusText,
      body: undefined,
    };
  }
  const body: ResponseBody = await response.json();
  return {
    status: 200,
    body,
  };
};

type ApiResponse<T> = {
  status: number;
  message?: string;
  body: Optional<T>;
};

type ParamObject = { [key: string]: string | number | string[] | number[] };

const makeFormBody = (params: ParamObject) => {
  const formBody = Object.entries(params).map(
    ([key, value]) => `${key}=${encodeURIComponent(isArray(value) ? value.join(",") : value)}`
  );
  return formBody.join("&");
};

const makeOptions = (params: ParamObject, signal: Nullable<AbortSignal> = null): RequestInit => {
  const body = makeFormBody(params);
  return {
    method: "POST",
    mode: "cors",
    body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    signal,
  };
};
