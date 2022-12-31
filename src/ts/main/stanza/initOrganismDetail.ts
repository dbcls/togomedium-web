import { qs } from "yohak-tools";
import { URL_API_BASE } from "../../consts";
import { getData } from "../../utils/getData";

export const initOrganismDetail = async (id: string) => {
  const data = await getData("gmdb_organism_by_taxid", `tax_id=${id}`);
  const name = data?.scientific_name ?? id;

  const info: HTMLElement = qs("#info")!;
  info.setAttribute("tax_id", id);

  const phenotype: HTMLElement = qs("#phenotype")!;
  phenotype.setAttribute("tax_id", id);

  const media: HTMLElement = qs("#media")!;
  media.setAttribute("api_url", `${URL_API_BASE}/gmdb_media_by_taxid?tax_id=${id}`);
  media.setAttribute("column_sizes", "20,80");
  media.setAttribute("title", `Media with ${name}`);
};