import { makeApiUrl } from "%core/network/makeApiUrl";
export type ComponentDetailResponse = {
  pref_label: string;
  id: string;
  label_ja: string;
  alt_labels_en: string[];
  alt_labels_ja: string[];
  super_classes: ComponentClass[];
  sub_classes: ComponentClass[];
  properties: ComponentClass[];
  roles: ComponentClass[];
  links: string[];
};
export type ComponentDetailParams = {
  gmo_id: string;
};
export const componentDetailURL = makeApiUrl("gmdb_component_by_gmoid");

type ComponentClass = {
  gmo_id: string;
  uri: string;
  label_en: string;
};
