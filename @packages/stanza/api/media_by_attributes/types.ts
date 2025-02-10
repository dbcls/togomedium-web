import { MediaFinderListApiBody } from "../../utils/types";

/**
 * @deprecated
 */
export type MediaByAttributesResponse = MediaFinderListApiBody<"gm_id" | "name">;

/**
 * @deprecated
 */
export type MediaByAttributesParams = {
  gmo_ids: string[];
  limit: number;
  offset: number;
};
