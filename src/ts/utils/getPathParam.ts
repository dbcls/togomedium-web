export type pageKey =
  | "medium"
  | "strain"
  | "component"
  | "taxon"
  | "compare-media"
  | "compare-media-of-organisms"
  | "compare-media-with-kegg-tree-alignment"
  | "find-media-by-components"
  | "find-media-by-organism-phenotype"
  | "find-media-by-taxonomic-tree"
  | undefined;

export const getPathParam = ():
  | {
      page: pageKey;
      param: string | undefined;
    }
  | undefined => {
  const paths = location.pathname.split("/");
  return {
    page: paths[1] as pageKey,
    param: paths[2],
  };
};
