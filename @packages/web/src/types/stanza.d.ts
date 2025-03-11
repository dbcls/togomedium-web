type BooleanString = "true" | "false";

type StanzaProps = {
  id?: string;
  className?: string;
  "togostanza-menu-placement": "none";
};

declare global {
  declare module "react" {
    namespace JSX {
      interface IntrinsicElements {
        "togostanza-gmdb-meta-list": {
          api_url: string;
          limit: string;
          title: string;
          column_names: BooleanString;
          column_sizes: string;
        } & StanzaProps;
        "togostanza-gmdb-medium-detail": {
          gm_id: string;
        } & StanzaProps;
        "togostanza-gmdb-media-alignment-table-by-strains": {
          gm_ids: string;
          hide_media: BooleanString;
        } & StanzaProps;
        "togostanza-gmdb-media-alignment-table-by-components": {
          gm_ids: string;
          prioritized_tax_ids?: string;
        } & StanzaProps;
        "togostanza-gmdb-strain-detail": {
          strain_id: string;
        } & StanzaProps;
        "togostanza-gmdb-component-detail": {
          gmo_id: string;
        } & StanzaProps;
        "togostanza-gmdb-taxon-detail": {
          tax_id: string;
        } & StanzaProps;
        "togostanza-gmdb-find-media-by-components": {} & StanzaProps;
        "togostanza-gmdb-find-media-by-organism-phenotype": {} & StanzaProps;
        "togostanza-gmdb-find-media-by-taxonomic-tree": {
          taxonomy_type: "NCBI" | "GTDB";
        } & StanzaProps;
      }
    }
  }
}
