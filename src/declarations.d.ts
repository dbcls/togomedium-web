declare global {
  declare module "react" {
    namespace JSX {
      interface IntrinsicElements {
        "togostanza-gmdb-find-media-by-components": unknown;
        "togostanza-gmdb-find-media-by-organism-phenotype": unknown;
        // todo consolidate stanza types
        "togostanza-gmdb-meta-list": {
          id: string;
          api_url: string;
          limit: string;
          title: string;
          column_names: string;
          "column-size": string;
          "togostanza-menu-placement": string;
        };
      }
    }
  }
}
