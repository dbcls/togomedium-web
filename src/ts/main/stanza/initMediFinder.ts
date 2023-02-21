import { pageKey } from "../../utils/getPathParam";

export const initMediaFinder = () => {
  console.log("initmedia");
  document.addEventListener("STANZA_RUN_ACTION", (e: CustomEvent) => {
    const ids: string[] = e.detail;
    const encodedIds = encodeURIComponent(ids.join(","));
    const target: pageKey = "compare-media";
    window.open(`/${target}/?gm_ids=${encodedIds}`);
  });
};
