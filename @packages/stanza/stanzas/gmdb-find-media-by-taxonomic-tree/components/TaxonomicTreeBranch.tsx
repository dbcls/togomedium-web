import { useQuery } from "@tanstack/react-query";
import React, { FC, PropsWithChildren, useEffect, useMemo } from "react";
import { Optional } from "yohak-tools";
import {
  TaxonChildrenParams,
  TaxonChildrenResponse,
  taxonChildrenURL,
} from "%api/taxonChildren/definitions";
import { getData } from "%core/network/getData";
import {
  CheckStatus,
  ToggleIconStatus,
  TreeBranchView,
} from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TreeBranchView";
import {
  findAscendants,
  findDescendants,
} from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/functions/proessTaxonInfo";
import { useSearchResult } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/searchResult";
import {
  useSelectedTaxonMutators,
  useSelectedTaxonState,
} from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/selectedTaxon";
import {
  TaxonInfo,
  useTaxonListMutators,
  useTaxonListState,
} from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonList";
import {
  useIsOpen,
  useTaxonTreeMutators,
} from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/treeState";

type Props = { id: string } & PropsWithChildren;

export const TaxonomicTreeBranch: FC<Props> = ({ id }) => {
  const taxonList = useTaxonListState();
  const searchResult = useSearchResult();
  const isHighlighted = useMemo(() => searchResult === id, [searchResult, id]);
  const myInfo: Optional<TaxonInfo> = useMemo(() => {
    return taxonList.find((item) => item.id === id);
  }, [taxonList, id]);
  const { branchChildren, isOpen, onToggleChildren, toggleIconStatus } = useBranchChildren(myInfo);
  const { descendants, ascendants, ascendantsLabel } = useLineages(id, taxonList);
  const { check, onClickCheck } = useChecked(id, taxonList, ascendants, descendants);
  const { label, rank } = useTaxonInfo(myInfo);
  const [linkString, linkURL] = useLinkString(id, rank);

  return (
    <TreeBranchView
      label={label}
      id={id}
      tag={rank}
      linkString={linkString}
      linkURL={linkURL}
      toolTipLabel={ascendantsLabel}
      check={check}
      isOpen={isOpen}
      onClickCheck={() => onClickCheck()}
      onToggleChildren={onToggleChildren}
      toggle={toggleIconStatus}
      isHighlighted={isHighlighted}
    >
      {isOpen &&
        branchChildren.length &&
        branchChildren.map((childId) => (
          <TaxonomicTreeBranch
            key={childId}
            id={childId}
          />
        ))}
    </TreeBranchView>
  );
};

const useBranchChildren = (info: Optional<TaxonInfo>) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const onToggleChildren = () => {
  //   setIsOpen((prev) => !prev);
  // };
  const { toggleOpen } = useTaxonTreeMutators();
  // const setIsOpen = (value: boolean) => {
  //   setBranchState(info?.id || "", value);
  // };
  const onToggleChildren = () => toggleOpen(info?.id || "");
  const isOpen = useIsOpen(info?.id || "");

  const { addTaxonToList, setTaxonChildren } = useTaxonListMutators();

  const query = useQuery({
    queryKey: ["taxon_children", info?.id || ""],
    queryFn: async () => {
      const tax_id = info?.id || "";
      if (!tax_id) return [];
      const response = await getData<TaxonChildrenResponse, TaxonChildrenParams>(taxonChildrenURL, {
        tax_id,
      });
      return response.body;
    },
    staleTime: Infinity,
    placeholderData: [],
  });
  useEffect(() => {
    if (query.data?.length) {
      query.data.forEach((item) => {
        addTaxonToList({
          id: item.tax_id,
          rank: item.rank,
          label: item.name,
          children: [],
        });
      });
    }
  }, [query.data]);
  useEffect(() => {
    if (query.data?.length) {
      setTaxonChildren(
        info?.id || "",
        query.data.map((item) => item.tax_id)
      );
    }
  }, [query.data]);

  const branchChildren: string[] = useMemo(
    () => (query.data ?? []).map((item) => item.tax_id),
    [query.data]
  );

  const toggleIconStatus: ToggleIconStatus = useMemo(() => {
    switch (true) {
      case info?.rank.toLowerCase() === "species":
        return "none";
      case query.isLoading:
        return "loading";
      case isOpen:
        return "compact";
      default:
        return "expand";
    }
  }, [info, isOpen, query.isLoading]);
  return { branchChildren, onToggleChildren, isOpen, toggleIconStatus };
};

const useLinkString = (id: string, rank: string) => {
  const linkString = useMemo(() => `tax_id:${id}`, [id]);
  const linkURL = useMemo(() => `/taxon/${id}`, [id]);
  return [linkString, linkURL];
};

const useTaxonInfo = (myInfo: Optional<TaxonInfo>) => {
  const rank = useMemo(() => myInfo?.rank || "", [myInfo]);
  const label = useMemo(() => myInfo?.label || "", [myInfo]);
  return { rank, label };
};

const useChecked = (
  id: string,
  taxonList: TaxonInfo[],
  ascendants: string[],
  descendants: string[]
) => {
  const selectedTaxon = useSelectedTaxonState();
  const { updateSelection } = useSelectedTaxonMutators();
  const onClickCheck = () => {
    updateSelection(taxonList, id);
  };
  const isChecked: boolean = !!selectedTaxon.find((taxId) => taxId === id);
  const isGrouped: boolean = !!selectedTaxon.find((taxId) => ascendants.includes(taxId));
  const isIndeterminate: boolean = !!selectedTaxon.find((taxId) => descendants.includes(taxId));
  const check: CheckStatus = useMemo(() => {
    switch (true) {
      case isChecked:
        return "checked";
      case isGrouped:
        return "grouped";
      case isIndeterminate:
        return "indeterminate";
      default:
        return "none";
    }
  }, [isChecked, isGrouped, isIndeterminate]);
  return { check, onClickCheck };
};

const useLineages = (id: string, taxonList: TaxonInfo[]) => {
  const ascendants = useMemo(() => findAscendants(taxonList, id), [taxonList, id]);
  const descendants = useMemo(() => findDescendants(taxonList, id), [taxonList, id]);
  const ascendantsLabel = useMemo(
    () => ascendants.map((id) => taxonList.find((taxon) => taxon.id === id)?.label).join(" > "),
    [ascendants]
  );
  // useEffect(() => {
  //   console.log({ id: id, ascendants: ascendants, descendants: descendants });
  // }, [descendants]);
  return { ascendants, descendants, ascendantsLabel };
};
