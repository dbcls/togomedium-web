import { ListApiParams, ListApiResponse } from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";

export type ListMediaByAttributesResponse = ListApiResponse<{ gm_id: string; name: string }>;

export type ListMediaByAttributesParams = ListApiParams<{ gmo_ids: string }>;

export const listMediaByAttributesURL = makeApiUrl("gmdb_media_by_attributes");
