type BooleanString = "true" | "false";

type StanzaProps = {
  id?: string;
  "togostanza-menu-placement": "none";
};

declare global {
  declare module "react" {
    namespace JSX {
      interface IntrinsicElements {
        "togostanza-gmdb-find-media-by-components": unknown;
        "togostanza-gmdb-find-media-by-organism-phenotype": unknown;
        // todo consolidate stanza types
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
        "togostanza-gmdb-strain-by-strainid": {
          strain_id: string;
        } & StanzaProps;
      }
    }
  }
}
