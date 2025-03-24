import { HOST_LIVE, HOST_STAGING, PORT_LOCAL_WEB } from "%core/consts";

export const makeLinkPath = (str: string) => {
  const [targetHost, targetPath] = getLinkInfo(str);
  const currentHost = window.location.hostname;
  if (!isInternalLink(targetHost)) return str;
  switch (currentHost) {
    case HOST_STAGING:
      return `https://${HOST_STAGING}${targetPath}`;
    case "localhost":
      return `http://localhost:${PORT_LOCAL_WEB}${targetPath}`;
    default:
      return `https://${HOST_LIVE}${targetPath}`;
  }
};

const isInternalLink = (targetHost: string | null): boolean => {
  if (targetHost === null) {
    return true;
  }
  return targetHost === HOST_LIVE;
};

const getLinkInfo = (str: string): [string | null, string] => {
  if (str.startsWith("http")) {
    const url = new URL(str);
    const targetHost = url.host;
    const targetPath = url.pathname;
    return [targetHost, targetPath];
  } else {
    return [null, str];
  }
};
