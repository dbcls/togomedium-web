import { nullListResponse } from "%api/ListApi";
import { PATH_LIST_COMPONENTS } from "%api/listComponents/definitions";
import { PATH_LIST_MEDIA } from "%api/listMedia/definitions";
import { PATH_LIST_STRAINS } from "%api/listStrains/definitions";
import { makeApiUrl } from "%core/network/makeApiUrl";

export type StoryCounts = { media: number; strains: number; components: number };
export const DEFAULT_COUNTS: StoryCounts = { media: 2400, strains: 12500, components: 850 };

export const createCountFixtures = (counts: StoryCounts = DEFAULT_COUNTS) => [
  { url: makeApiUrl(PATH_LIST_MEDIA), data: { ...nullListResponse, total: counts.media } },
  { url: makeApiUrl(PATH_LIST_STRAINS), data: { ...nullListResponse, total: counts.strains } },
  {
    url: makeApiUrl(PATH_LIST_COMPONENTS),
    data: { ...nullListResponse, total: counts.components },
  },
];
