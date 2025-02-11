import { MediaFinderListApiBody } from "../../utils/types";

/**
 * @deprecated
 */
export type OrganismsByPhenotypesResponse = MediaFinderListApiBody<"tax_id" | "name">;
/**
 * @deprecated
 */
export type OrganismsByPhenotypeParams = {
  limit: number;
  offset: number;
  [key: string]: string | number;
};
