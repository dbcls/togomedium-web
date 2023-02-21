import { qs } from "yohak-tools";
import { URL_API } from "../../consts";
import { getData } from "../../utils/getData";

export const initTaxonDetail = async (id: string) => {
  const data = await getData("gmdb_taxonomic_rank_by_taxid", `tax_id=${id}`);
  const name = data?.scientific_name ?? id;
  //
  const info: HTMLElement = qs("#info")!;
  info.setAttribute("tax_id", id);
  //

  const media: HTMLElement = qs("#media")!;
  media.setAttribute("api_url", `${URL_API}gmdb_media_by_taxid?tax_id=${id}`);
  media.setAttribute("title", `Media with ${name}`);
  media.setAttribute("column_sizes", "15,85");

  //
  const organism: HTMLElement = qs("#organisms")!;
  organism.setAttribute("api_url", `${URL_API}gmdb_infraspecific_list_by_taxid?tax_id=${id}`);
  organism.setAttribute("title", `Organisms with ${name}`);
  organism.setAttribute("column_sizes", "15,15,70");
};