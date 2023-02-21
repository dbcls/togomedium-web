import { qs } from "yohak-tools";
import { URL_API } from "../../consts";
import { getData } from "../../utils/getData";
import { makePageTitle } from "../../utils/makePageTitle";

export const initComponentDetail = async (id: string) => {
  const data = await getData("gmdb_component_by_gmoid", `gmo_id=${id}`);
  const name = data?.pref_label ?? id;
  qs("title")!.innerHTML = makePageTitle(name);

  const info: HTMLElement = qs("#info")!;
  info.setAttribute("gmo_id", id);
  info.setAttribute("togostanza-menu-placement", "none");
  //
  const mediaStanza: HTMLElement = qs("#media")!;
  mediaStanza.setAttribute("api_url", `${URL_API}gmdb_media_by_gmoid?gmo_id=${id}`);
  mediaStanza.setAttribute("title", `Media with ${name}`);
  mediaStanza.setAttribute("column_sizes", "15,85");
};
