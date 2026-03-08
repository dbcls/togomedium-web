import { makeApiUrl } from "%core/network/makeApiUrl";

export type MediaComponentAlignmentTableResponse = {
  media: {
    gm_id: string;
    original_media_id: string;
    name: string;
    components: string[];
    organisms: string[];
  }[];
  organisms: {
    tax_id: string;
    name: string;
  }[];
  components: {
    gmo_id: string;
    name: string;
    parent: string | null;
    function: string | null;
  }[];
};
export type MediaComponentAlignmentTableParams = {
  gm_ids: string;
};
export const mediaComponentAlignmentTableURL = makeApiUrl("gmdb_media_alignment_by_gm_ids");
