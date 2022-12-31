import { initComponentDetail } from "./stanza/initComponentDetail";
import { initMediumDetail } from "./stanza/initMediumDetail";
import { initOrganismDetail } from "./stanza/initOrganismDetail";
import { getPathParam } from "../utils/getPathParam";

export const initStanza = () => {
  const pathParam = getPathParam();
  if (pathParam?.page === "medium" && !!pathParam.param) {
    initMediumDetail(pathParam.param);
  }
  if (pathParam?.page === "organism" && !!pathParam.param) {
    initOrganismDetail(pathParam.param);
  }
  if (pathParam?.page === "component" && !!pathParam.param) {
    initComponentDetail(pathParam.param);
  }
};
