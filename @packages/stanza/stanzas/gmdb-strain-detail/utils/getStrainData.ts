import { ComponentProps } from "react";
import {
  StrainDetailParams,
  StrainDetailResponse,
  strainDetailURL,
} from "%api/strainDetail/definitions";
import { getData } from "%core/network/getData";
import { StanzaView } from "%stanza/stanzas/gmdb-strain-detail/components/StanzaView";
import { parseData } from "%stanza/stanzas/gmdb-strain-detail/utils/parseData";

type ViewProps = ComponentProps<typeof StanzaView>;
export const getStrainData = async (strain_id: string): Promise<ViewProps> => {
  const result = await getData<StrainDetailResponse, StrainDetailParams>(strainDetailURL, {
    strain_id,
  });
  if (!result.body?.strain) {
    throw new Error("No strain data found");
  }
  return parseData(result.body);
};
