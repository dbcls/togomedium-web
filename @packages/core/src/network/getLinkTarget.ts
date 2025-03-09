import { makeLinkPath } from "%core/network/makeLinkPath";

export const getLinkTarget = (str: string): "_blank" | undefined => {
  const path = makeLinkPath(str);
  const url = new URL(path);
  if (url.hostname === window.location.hostname) {
    return undefined;
  } else {
    return "_blank";
  }
};
