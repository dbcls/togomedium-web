import { qs } from "yohak-tools";
import { URL_API } from "../../consts";
import { getData } from "../../utils/getData";
import { makePageTitle } from "../../utils/makePageTitle";

export const initTaxonDetail = async (id: string) => {
  const data = await getData("gmdb_taxonomic_rank_by_taxid", `tax_id=${id}`);
  const name = data?.scientific_name ?? id;
  qs("title")!.innerHTML = makePageTitle(name);
  //
  const info: HTMLElement = qs("#info")!;
  info.setAttribute("tax_id", id);
  //
  const rank = data.rank.split("/").pop().toLowerCase();
  const children: HTMLElement = qs("#children")!;
  if (rank !== "species") {
    children.setAttribute("api_url", `${URL_API}gmdb_organism_under_rank_by_taxid?tax_id=${id}`);
    children.setAttribute("title", `Children of ${name}`);
  } else {
    children.parentElement!.style.display = "none";
  }
  const strains: HTMLElement = qs("#strains")!;
  strains.setAttribute("api_url", `${URL_API}gmdb_strain_list_by_taxid?tax_id=${id}`);
  strains.setAttribute("title", `Strains of ${name}`);
  // strains.setAttribute("column_sizes");

  const media: HTMLElement = qs("#media")!;
  media.setAttribute("api_url", `${URL_API}gmdb_media_by_taxid?tax_id=${id}`);
  media.setAttribute("title", `Media for ${name}`);
  // media.setAttribute("column_sizes", "10,15,75");
};
