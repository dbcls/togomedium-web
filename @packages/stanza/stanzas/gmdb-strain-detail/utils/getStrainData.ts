import {
  StrainDetailParams,
  StrainDetailResponse,
  PATH_STRAIN_DETAIL,
} from "%api/strainDetail/definitions";
import { getData } from "%core/network/getData";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { StanzaView } from "%stanza/stanzas/gmdb-strain-detail/components/StanzaView";
import { parseData } from "%stanza/stanzas/gmdb-strain-detail/utils/parseData";
import { ComponentProps } from "react";

type ViewProps = ComponentProps<typeof StanzaView>;
export const getStrainData = async (strain_id: string): Promise<ViewProps> => {
  const result = await getData<StrainDetailResponse, StrainDetailParams>(
    makeApiUrl(PATH_STRAIN_DETAIL),
    {
      strain_id,
    },
  );
  if (!result.body?.strain) {
    throw new Error("No strain data found");
  }
  return parseData(result.body);
};
