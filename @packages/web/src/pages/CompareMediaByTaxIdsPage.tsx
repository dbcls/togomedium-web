import { deepEqual } from "@tanstack/react-router";
import { FC, useEffect, useRef, useState } from "react";
import { ListMediaByTaxonResponse } from "%api/listMediaByTaxon/definitions.ts";
import { H2 } from "@/components/atoms/H2.tsx";
import { SearchPane } from "@/components/organisms/SearchPane.tsx";
import { ComponentAlignmentStanza } from "@/components/stanzas/ComponentAlignmentStanza.tsx";
import { StrainAlignmentStanza } from "@/components/stanzas/StrainAlignmentStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { URL_API } from "@/consts/api.ts";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const CompareMediaByTaxIdsPage: FC = () => {
  usePageTitle("Compare media specified by Tax IDs");
  const { gmIds, isVisible, errorMsg, inputRef, onSubmit } = useCompareMediaByTaxIds();

  return (
    <PageWrapper>
      <div>
        <H2>Compare media specified by Tax IDs</H2>
        <SearchPane
          inputRef={inputRef}
          onSubmit={onSubmit}
          errorMsg={errorMsg}
          label={"Enter tax Ids to compare"}
          buttonLabel={"Compare"}
          placeHolder={["77580", "28024", "2771", "38275"].join(",")}
          defaultWithPlaceHolder={true}
        />
      </div>

      <ComponentAlignmentStanza
        gmIds={gmIds}
        isVisible={isVisible}
      />
      <StrainAlignmentStanza
        gmIds={gmIds}
        isVisible={isVisible}
      />
    </PageWrapper>
  );
};

const useCompareMediaByTaxIds = () => {
  const [gmIds, setGmIds] = useState<string[]>([]);
  const [taxIds, setTaxIds] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = () => {
    execute();
  };
  const execute = async () => {
    const queryStr = inputRef.current?.value ?? "";
    const _taxIds = queryStr.split(",").map((str) => str.trim());
    if (deepEqual(_taxIds, taxIds)) return;
    setErrorMsg("");
    const filteredData = await filterTaxIds(_taxIds);
    const _gmIds = await fetchMedia(filteredData);
    if (_gmIds.length === 0) {
      setErrorMsg("No media found");
      setIsVisible(false);
      return;
    }
    setErrorMsg(makeErrorMessage(_taxIds, filteredData));
    setGmIds(_gmIds);
    setTaxIds(_taxIds);
    setSearchParams(_taxIds);
    setIsVisible(true);
  };

  useEffect(() => {
    const url = new URL(location.href);
    const queriedIds = url.searchParams.get("tax_ids");
    if (queriedIds) {
      inputRef.current!.value = queriedIds;
      execute();
    }
  }, [execute]);

  return { gmIds, isVisible, errorMsg, inputRef, onSubmit };
};

const filterTaxIds = async (taxIds: string[]): Promise<string[]> => {
  const API = `${URL_API}/gmdb_taxa_with_media_within_genus`;
  const response = await fetch(API, {
    method: "POST",
    mode: "cors",
    body: `tax_ids=${taxIds}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return await response.json();
};

const fetchMedia = async (tax_ids: string[]): Promise<string[]> => {
  const API = `${URL_API}/gmdb_media_by_taxon`;
  const response = await fetch(API, {
    method: "POST",
    mode: "cors",
    body: `tax_ids=${tax_ids}&limit=${100}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data: ListMediaByTaxonResponse = await response.json();
  return data.contents.map((item) => item.gm_id);
};
const setSearchParams = (taxIds: string[]) => {
  const url = new URL(location.href);
  url.searchParams.set("tax_ids", taxIds.join(","));
  history.pushState(null, "", url);
};

const makeErrorMessage = (queried: string[], filtered: string[]) => {
  const errorData = queried.filter((str) => !filtered.includes(str));
  return errorData.length ? `Not found: ${errorData.join(", ")}` : "";
};
