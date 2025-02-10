import { ComponentsWithComponentsResponse } from "%api/componentsWithComponents/definitions";
import { decodeHTMLEntities } from "%core/string/decodeHtmlEntities";
import { LabelInfo } from "%stanza/utils/labelInfo";

export type ComponentLabelInfo = LabelInfo & { japaneseName: string };
export const parseLabelInfo = (
  res: ComponentsWithComponentsResponse,
  selectedIds: string[]
): ComponentLabelInfo[] => {
  return res
    .map<ComponentLabelInfo>((item) => ({
      id: item.gmo_id,
      label: item.name.includes(";") ? decodeHTMLEntities(item.name) : item.name,
      japaneseName: item.japanese_name,
    }))
    .filter((item) => !selectedIds.includes(item.id));
};
