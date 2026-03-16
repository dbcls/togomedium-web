const HOST_LIVE = "togomedium.org";
const HOST_STAGING = "togomedium.yohak-lab.com";
const PORT_LOCAL_WEB = 5200;
const PATH_MEDIUM = `/medium/`;
const PATH_TAXON = `/taxon/`;
const PATH_COMPONENT = `/component/`;

const makeLinkPath = (str) => {
    const [targetHost, targetPath] = getLinkInfo(str);
    const currentHost = window.location.hostname;
    if (!isInternalLink(targetHost))
        return str;
    switch (currentHost) {
        case HOST_STAGING:
            return `https://${HOST_STAGING}${targetPath}`;
        case "localhost":
            return `http://localhost:${PORT_LOCAL_WEB}${targetPath}`;
        default:
            return `https://${HOST_LIVE}${targetPath}`;
    }
};
const isInternalLink = (targetHost) => {
    if (targetHost === null) {
        return true;
    }
    return targetHost === HOST_LIVE;
};
const getLinkInfo = (str) => {
    if (str.startsWith("http")) {
        const url = new URL(str);
        const targetHost = url.host;
        const targetPath = url.pathname;
        return [targetHost, targetPath];
    }
    else {
        return [null, str];
    }
};

const getLinkTarget = (str) => {
    const path = makeLinkPath(str);
    const url = new URL(path);
    if (url.hostname === window.location.hostname) {
        return undefined;
    }
    else {
        return "_blank";
    }
};

export { PATH_COMPONENT as P, PATH_MEDIUM as a, PATH_TAXON as b, getLinkTarget as g, makeLinkPath as m };
//# sourceMappingURL=getLinkTarget-9ee27b52.js.map
