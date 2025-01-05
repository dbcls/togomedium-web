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
        "togostanza-gmdb-medium-by-gmid": {
          gm_id: string;
        } & StanzaProps;
        "togostanza-gmdb-media-strains-alignment-table": {
          gm_ids: string;
          hide_media: BooleanString;
        } & StanzaProps;
        "togostanza-gmdb-media-alignment-table": {
          gm_ids: string;
          prioritized_tax_ids?: string;
        } & StanzaProps;
        "togostanza-gmdb-strain-by-strainid": {
          strain_id: string;
        } & StanzaProps;
        "togostanza-gmdb-component-by-gmoid": {
          gmo_id: string;
        } & StanzaProps;
        "togostanza-gmdb-taxon-by-taxid": {
          tax_id: string;
        } & StanzaProps;
        "togostanza-gmdb-find-media-by-components": {} & StanzaProps;
        "togostanza-gmdb-find-media-by-organism-phenotype": {} & StanzaProps;
        "togostanza-gmdb-find-media-by-taxonomic-tree": {} & StanzaProps;
      }
    }
  }
}
