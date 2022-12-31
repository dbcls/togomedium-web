import { qs } from "yohak-tools";
import { MediaAlignmentTableResponse } from "./types";

export const initCompareMedia = () => {
  const table = qs<HTMLElement>("togostanza-gmdb-media-alignment-table")!;
  const ids = qs<HTMLInputElement>("#ids")!;
  const button = qs("#compareBtn")!;
  const url = new URL(location.href);
  const queriedGmIds = url.searchParams.get("gm_ids");
  let queriedData: string[] = [];
  //
  const execute = () => {
    queriedData = ids.value.split(",").map((str) => str.trim());
    const value = queriedData.join(",");
    table.setAttribute("gm_ids", value);
    table.style.display = "block";
    //
    const url = new URL(location.href);
    url.searchParams.set("gm_ids", value);
    history.pushState(null, "", url);
  };

  if (queriedGmIds) {
    ids.value = queriedGmIds;
    execute();
  } else {
    ids.value = "HM_D00001,JCM_M333";
  }
  //

  button.addEventListener("click", () => execute());
  document.addEventListener("STANZA_ON_QUERY_DATA", (e: CustomEvent) => {
    queriedData = (e.detail as string[]).filter((str) => str !== "");
  });
  document.addEventListener("STANZA_ON_LOAD_DATA", (e: CustomEvent) => {
    const response: MediaAlignmentTableResponse = e.detail;
    const loadedMedia: string[] = response.media.map((m) => m.gm_id);
    //
    const notFound = queriedData.filter((str) => !loadedMedia.includes(str));
    const errorMsg = notFound.length ? `Not found: ${notFound.join(", ")}` : "";
    qs("#errorMsg")!.textContent = errorMsg;
  });
};