import { initCompareKeggTree } from "./stanza/initCompareKeggTree";
import { initCompareMedia } from "./stanza/initCompareMedia";
import { initCompareMediaOfOrganisms } from "./stanza/initCompareMediaOfOrganisms";
import { initComponentDetail } from "./stanza/initComponentDetail";
import { initFreeSearch } from "./stanza/initFreeSearch";
import { initHomeStats } from "./stanza/initHomeStats";
import { initMediaFinder } from "./stanza/initMediFinder";
import { initMediumDetail } from "./stanza/initMediumDetail";
import { initOrganismDetail } from "./stanza/initOrganismDetail";
import { initTaxonDetail } from "./stanza/initTaxonDetail";
import { getPathParam } from "../utils/getPathParam";

export const initStanza = () => {
  const pathParam = getPathParam();
  if (!pathParam?.page) {
    initHomeStats();
    initFreeSearch();
  }
  if (pathParam?.page === "medium" && !!pathParam.param) {
    initMediumDetail(pathParam.param);
  }
  if (pathParam?.page === "organism" && !!pathParam.param) {
    initOrganismDetail(pathParam.param);
  }
  if (pathParam?.page === "component" && !!pathParam.param) {
    initComponentDetail(pathParam.param);
  }
  if (pathParam?.page === "taxon" && !!pathParam.param) {
    initTaxonDetail(pathParam.param);
  }
  if (pathParam?.page === "compare-media") {
    initCompareMedia();
  }
  if (pathParam?.page === "compare-media-of-organisms") {
    initCompareMediaOfOrganisms();
  }
  if (pathParam?.page === "compare-media-with-kegg-tree-alignment") {
    initCompareKeggTree();
  }
  if (
    pathParam?.page === "find-media-by-components" ||
    pathParam?.page === "find-media-by-organism-phenotype" ||
    pathParam?.page === "find-media-by-taxonomic-tree"
  ) {
    initMediaFinder();
  }
};
