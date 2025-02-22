import { copy } from "copy-anything";
import {
  MediumDetailParams,
  MediumDetailResponse,
  mediumDetailURL,
} from "%api/mediumDetail/definitions";
import { getData } from "%core/network/getData";
import { ReferencingRecipe } from "%stanza/stanzas/gmdb-medium-detail/components/StanzaView";
import { processData } from "%stanza/stanzas/gmdb-medium-detail/utils/processData";

export const getMedia = async (gm_id: string) => {
  const result = await getData<MediumDetailResponse, MediumDetailParams>(mediumDetailURL, {
    gm_id,
  });
  if (!result.body) throw new Error("No data found");
  const extra = await getExternalReferences(result.body, gm_id);
  return processData(result.body, extra);
};

const getExternalReferences = async (
  body: MediumDetailResponse,
  gm_id: string
): Promise<ReferencingRecipe[]> => {
  const externalReferences = copy(body)
    .components.map((component) =>
      component.items.filter(
        (item) => !!item.reference_media_id && item.reference_media_id !== gm_id
      )
    )
    .filter((item) => item.length > 0)
    .flat()
    .map((item) => ({
      id: item.reference_media_id!,
      name: item.component_name.replace(/ \(.*\)/, "").replace(/\*/g, ""),
    }));

  const extraData: ReferencingRecipe[] = [];

  for await (const ref of externalReferences) {
    const result = await getData<MediumDetailResponse, MediumDetailParams>(mediumDetailURL, {
      gm_id: ref.id,
    });
    if (result.body) {
      const data = processData(result.body);
      const components = data.components;
      const target = components.find((item: any) => item.name === ref.name);
      const arr: any[] = [target];
      if (target) {
        const targetIndex = components.indexOf(target);
        let i = 1;
        while ((components[targetIndex + i] as any)?.comment) {
          const comment = components[targetIndex + i] as any;
          arr.push(comment);
          i++;
          if (i > 100) break;
        }
      }
      extraData.push({ components: arr, id: ref.id });
    }
  }
  return extraData;
};
