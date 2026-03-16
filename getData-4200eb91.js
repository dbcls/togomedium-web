import { i as isArray } from './isArray-56c7d056.js';

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
    const formBody = Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(isArray(value) ? value.join(",") : value)}`);
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

export { getData as g };
//# sourceMappingURL=getData-4200eb91.js.map
