import { ComponentProps } from "react";
import { MediaDetailResponse } from "%api/mediaDetail/definitions";
import {
  RecipeCommentProps,
  RecipeTableProps,
  ReferencingRecipe,
  StanzaView,
} from "%stanza/stanzas/gmdb-medium-by-gmid/components/StanzaView";

type ViewProps = ComponentProps<typeof StanzaView>;
type ApiComponentComment = MediaDetailResponse["comments"][0];
type ApiComponentTable = MediaDetailResponse["components"][0];

export const processData = (
  body: MediaDetailResponse,
  extraComponents: ReferencingRecipe[] = []
): ViewProps => {
  const id = body.meta.gm.split("/").pop()!;
  return {
    id,
    originalId: body.meta.original_media_id,
    name: body.meta.name,
    srcLabel: getSrcLabel(body.meta.src_url),
    srcUrl: body.meta.src_url,
    ph: body.meta.ph,
    components: processComponents(id, body.components, body.comments),
    extraComponents,
  };
};

const processComponents = (
  myId: string,
  tables: ApiComponentTable[],
  comments: ApiComponentComment[]
): ViewProps["components"] => {
  return [...processComponentTables(tables, myId), ...processComponentComments(comments)].sort(
    (a, b) => a.index - b.index
  );
};

const processComponentTables = (tables: ApiComponentTable[], gmID: string): RecipeTableProps[] => {
  return tables.map((table) => ({
    index: table.paragraph_index,
    name: table.subcomponent_name,
    items: table.items.map((item) => ({
      id: item.gmo_id || "",
      componentName: item.component_name,
      componentLabel: item.label || "",
      concValue: item.conc_value?.toString() || "",
      concUnit: item.conc_unit || "",
      volume: item.volume?.toString() || "",
      unit: item.unit || "",
      referenceMediaId:
        !item.reference_media_id || item.reference_media_id === gmID ? "" : item.reference_media_id,
    })),
  }));
};
const processComponentComments = (comments: ApiComponentComment[]): RecipeCommentProps[] => {
  return comments.map((item) => ({
    index: item.paragraph_index,
    comment: item.comment ? item.comment : "&nbsp;",
  }));
};

const getSrcLabel = (str: string): string => {
  switch (true) {
    case str.match(/jcm.*riken/) !== null:
      return "JCM";
    case str.match(/nite.*nbrc/) !== null:
      return "NBRC";
    case str.match(/dsmz\.de/) !== null:
      return "DSMZ";
    case str.match(/atcc\.org/) !== null:
      return "ATCC";
    default:
      return "SRC";
  }
};
