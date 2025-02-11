import { ComponentProps, useEffect, useState } from "react";
import { ListOrganismsByPhenotypesResponse } from "%api/listOrganismsByPhenotypes/definitions";
import { OrganismListItem } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismListItem";
import {
  useSelectedOrganismsMutators,
  useSelectedOrganismsState,
} from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/selectedOrganisms";
import { hasIdOfLabel } from "%stanza/utils/labelInfo";

type OrganismListInfo = Omit<ComponentProps<typeof OrganismListItem>, "onClick">;
// type FoundOrganisms = MediaFinderListApiBody<"tax_id" | "name">;
export const useOrganismList = (response?: ListOrganismsByPhenotypesResponse) => {
  const [list, setList] = useState<OrganismListInfo[]>([]);
  const selectedOrganisms = useSelectedOrganismsState();
  const { toggleOrganismSelection } = useSelectedOrganismsMutators();
  useEffect(() => {
    const result: OrganismListInfo[] = (response?.contents ?? []).map((organism) => {
      return {
        id: organism.tax_id,
        label: organism.name,
        isChecked: hasIdOfLabel(selectedOrganisms, organism.tax_id),
      };
    });
    setList(result);
  }, [response, selectedOrganisms]);
  return { list, toggleOrganismSelection };
};
