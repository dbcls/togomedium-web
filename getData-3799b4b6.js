import { e as dist } from './index-7a88ba65.js';

/**
 * @deprecated
 */
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

export { getData as g, makeFormBody as m };
//# sourceMappingURL=getData-3799b4b6.js.map
