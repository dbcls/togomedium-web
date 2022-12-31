import animateScrollTo from "animated-scroll-to";
import { qs } from "yohak-tools";

export const initCompareKeggTree = () => {
  const table = qs("#table")!;
  document.addEventListener("STANZA_ROUND_TREE_CLICK", (e: CustomEvent) => {
    const ids: string[] = e.detail.taxIds;
    table.setAttribute("t_id", ids.join(","));
    setTimeout(() => {
      animateScrollTo(table, { verticalOffset: -100 });
    }, 500);
  });
};
