import { makeApiUrl } from "%core/network/makeApiUrl";

export type MediumDetailResponse = {
  meta: Meta;
  components: ComponentTable[];
  comments: ComponentComment[];
};
export type MediumDetailParams = { gm_id: string };
export const mediumDetailURL = makeApiUrl("gmdb_medium_by_gmid");

type Meta = {
  gm: string;
  name: string;
  src_url: string;
  ph: string;
  original_media_id?: string;
};

type ComponentTable = {
  subcomponent_name: string;
  items: Component[];
} & RecipeItem;

type ComponentComment = {
  comment: string;
} & RecipeItem;

type RecipeItem = {
  paragraph_index: number;
};

type Component = {
  component_name: string;
  volume?: number;
  unit?: string;
  gmo?: string;
  gmo_id?: string;
  label?: string;
  conc_value?: number;
  conc_unit?: string;
  reference_media_id?: string;
};
