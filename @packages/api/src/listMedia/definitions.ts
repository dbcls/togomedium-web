import { ListApiLink, ListApiParams, ListApiResponse } from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";

export type ListMediaResponse = ListApiResponse<{
  media_id: ListApiLink;
  original_media_id: string;
  label: string;
}>;
export type ListMediaParams = ListApiParams<never>;
export const listMediaURL = makeApiUrl("list_media");
