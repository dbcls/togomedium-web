import type { MediumDetailResponse } from "%api/mediumDetail/definitions";

export const cloneMediumDetailResponse = (response: MediumDetailResponse): MediumDetailResponse => {
  return structuredClone(response);
};
