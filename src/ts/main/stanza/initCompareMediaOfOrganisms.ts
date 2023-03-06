import { qs } from "yohak-tools";
import { MediaByTaxonResponse } from "./types";
import { URL_API } from "../../consts";

export const initCompareMediaOfOrganisms = () => {
  const ids = qs<HTMLInputElement>("#ids")!;
  const button = qs("#compareBtn")!;
  const url = new URL(location.href);
  const queriedTaxIds = url.searchParams.get("tax_ids");
  //
  if (queriedTaxIds) {
    ids.value = queriedTaxIds;
    execute();
  } else {
    // ids.value = "1111041,1658616,760260";
    ids.value = "77580,28024,2771,38275";
  }
  //
  button.addEventListener("click", () => execute());
};

const fetchMedia = async (tax_ids: string[]): Promise<string[]> => {
  const API = `${URL_API}gmdb_media_by_taxon`;
  const response = await fetch(API, {
    method: "POST",
    mode: "cors",
    body: `tax_ids=${tax_ids}&limit=${100}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data: MediaByTaxonResponse = await response.json();
  return data.contents.map((item) => item.gm_id);
};

const filterTaxIds = async (tax_ids: string[]): Promise<string[]> => {
  const API = `${URL_API}gmdb_taxa_with_media_within_genus`;
  const response = await fetch(API, {
    method: "POST",
    mode: "cors",
    body: `tax_ids=${tax_ids}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return await response.json();
};

const setError = (queried: string[], filtered: string[]) => {
  const errorData = queried.filter((str) => !filtered.includes(str));
  const errorMsg = errorData.length ? `Not found: ${errorData.join(", ")}` : "";
  qs("#errorMsg")!.textContent = errorMsg;
};

const execute = async () => {
  const componentAlignment = qs<HTMLElement>("togostanza-gmdb-media-alignment-table")!;
  const strainAlignment = qs<HTMLElement>("togostanza-gmdb-media-strains-alignment-table")!;
  const url = new URL(location.href);
  const ids = qs<HTMLInputElement>("#ids")!;
  const queriedData = ids.value.split(",").map((str) => str.trim());
  const filteredData = await filterTaxIds(queriedData);
  const gmIds = await fetchMedia(filteredData);
  const value = gmIds.join(",");
  setError(queriedData, filteredData);
  componentAlignment.setAttribute("gm_ids", value);
  componentAlignment.setAttribute("prioritized_tax_ids", filteredData.join(","));
  componentAlignment.style.display = "block";
  strainAlignment.setAttribute("gm_ids", value);
  strainAlignment.style.display = "block";
  //
  url.searchParams.set("tax_ids", queriedData.join(","));
  history.pushState(null, "", url);
};
