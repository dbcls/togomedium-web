export type LinkLabel =
  | "PubChem"
  | "Wikipedia"
  | "NCI Thesaurus"
  | "ChEBI"
  | "SNOMED-CT"
  | "MediaDive";
export type LinkInfo = {
  label: LinkLabel;
  uri: string;
};
