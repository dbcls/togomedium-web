import { e as dist } from './index-ef9d40bc.js';

const ENV_URL_API = typeof process !== "undefined" ? process.env?.URL_API : undefined;
const makeApiUrl = (path) => {
    const URL_API = ENV_URL_API ?? "https://togomedium.org/sparqlist/api/";
    return `${URL_API}${path}`;
};

const getData = async (url, params, abortController) => {
    const response = await fetch(url, makeOptions(params, abortController ? abortController.signal : null));
    if (response.status !== 200) {
        return {
            status: response.status,
            message: response.statusText,
            body: undefined,
        };
    }
    const body = await response.json();
    return {
        status: 200,
        body,
    };
};
const makeFormBody = (params) => {
    const formBody = Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(dist.isArray(value) ? value.join(",") : value)}`);
    return formBody.join("&");
};
const makeOptions = (params, signal = null) => {
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

export { getData as g, makeApiUrl as m };
//# sourceMappingURL=getData-1442ae18.js.map
