import { qs } from "yohak-tools";
import { URL_API } from "../../consts";
import { getData } from "../../utils/getData";
import { makePageTitle } from "../../utils/makePageTitle";

export const initOrganismDetail = async (id: string) => {
  const data = await getData("gmdb_organism_by_taxid", `tax_id=${id}`);
  const name = data?.scientific_name ?? id;
  qs("title")!.innerHTML = makePageTitle(name);

  const info: HTMLElement = qs("#info")!;
  info.setAttribute("tax_id", id);

  const phenotype: HTMLElement = qs("#phenotype")!;
  phenotype.setAttribute(
    "api_url",
    `${URL_API}/gmdb_phenotype_by_strainid?strain_id=${"000000001"}`
  );
  // phenotype.setAttribute("column_sizes", "20,80");
  phenotype.setAttribute("title", `Phenotypes of ${name}`);

  const media: HTMLElement = qs("#media")!;
  media.setAttribute("api_url", `${URL_API}/gmdb_media_by_taxid?tax_id=${id}`);
  media.setAttribute("column_sizes", "10,15,75");
  media.setAttribute("title", `Media with ${name}`);
};
