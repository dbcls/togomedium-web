import { qs } from "yohak-tools";
import { URL_API_BASE } from "../../consts";
import { getData } from "../../utils/getData";

export const initComponentDetail = async (id: string) => {
  const data = await getData("gmdb_component_by_gmoid", `gmo_id=${id}`);
  const name = data?.pref_label ?? id;

  const info: HTMLElement = qs("#info")!;
  info.setAttribute("gmo_id", id);
  info.setAttribute("togostanza-menu-placement", "none");
  //
  const mediaStanza: HTMLElement = qs("#media")!;
  mediaStanza.setAttribute("api_url", `${URL_API_BASE}gmdb_media_by_gmoid?gmo_id=${id}`);
  mediaStanza.setAttribute("title", `Media with ${name}`);
  mediaStanza.setAttribute("column_sizes", "15,85");
};
