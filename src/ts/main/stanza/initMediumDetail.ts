import { qs } from "yohak-tools";
import { URL_API } from "../../consts";
import { getData } from "../../utils/getData";
import { makePageTitle } from "../../utils/makePageTitle";

export const initMediumDetail = async (id: string) => {
  const data = await getData("gmdb_medium_by_gmid", `gm_id=${id}`);
  const hasName: boolean = data?.meta?.name !== "" && !!data?.meta?.name;
  const name = hasName ? data.meta.name : id;
  qs("title")!.innerHTML = makePageTitle(name);
  //
  const info = qs("#info")!;
  info.setAttribute("gm_id", id);
  //
  const similar = qs("#similar")!;
  similar.setAttribute("api_url", `${URL_API}gmdb_list_similar_media_by_gmid?gm_id=${id}`);
  similar.setAttribute("title", `Growth media similar to ${name}`);
  similar.setAttribute("column_sizes", "15,70,15");
  //
  const organisms = qs("togostanza-gmdb-media-strains-alignment-table")!;
  organisms.setAttribute("gm_ids", id);
  const organismTitle = qs("*[data-js-target=strainAlignmentTitle]")!;
  organismTitle.textContent = `Organisms that can be cultured in XXX${name}`;
};
