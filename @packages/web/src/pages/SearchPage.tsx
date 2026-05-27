import { PATH_LIST_COMPONENTS_BY_IDS } from "%api/listComponentsByIds/definitions.ts";
import { PATH_LIST_COMPONENTS_BY_KEYWORD } from "%api/listComponentsByKeyword/definitions.ts";
import { PATH_LIST_MEDIA_BY_IDS } from "%api/listMediaByIds/definitions.ts";
import { PATH_LIST_MEDIA_BY_KEYWORD } from "%api/listMediaByKeyword/definitions.ts";
import { PATH_LIST_ORGANISMS_BY_TAXIDS } from "%api/listOrganismByIds/definitions.ts";
import { PATH_LIST_ORGANISMS_BY_KEYWORD } from "%api/listOrganismByKeyword/definitions.ts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RefObject } from "@react-types/shared";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { FC, useRef } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { H3 } from "@/components/atoms/H3.tsx";
import { SearchPane } from "@/components/organisms/SearchPane.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { useListCount } from "@/hooks/useListCount.ts";

export const SearchPage: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { onSubmit } = useSubmit(inputRef);
  const { query } = useLocationUpdate(inputRef);
  const {
    mediaById,
    componentsById,
    organismsById,
    mediaByKeyword,
    componentsByKeyword,
    organismsByKeyword,
  } = useSearchQuery(query);
  const notFound =
    !mediaById &&
    !componentsById &&
    !organismsById &&
    !mediaByKeyword &&
    !componentsByKeyword &&
    !organismsByKeyword;
  return (
    <PageWrapper type={"narrow"}>
      <section>
        <H2>Search anything by IDs and keywords</H2>
        <SearchPane
          inputRef={inputRef}
          onSubmit={onSubmit}
          errorMsg={""}
          label={"Enter IDs or keywords for search"}
          buttonLabel={"Search"}
        ></SearchPane>
      </section>
      <section className={"flex flex-col gap-12"}>
        {notFound && (
          <p className={"font-wide rounded bg-white px-12 py-8 text-2xl font-medium"}>
            No result found with {query}
          </p>
        )}

        {mediaById && (
          <div>
            <H3>Media of {query}</H3>
            <ListStanza
              api={makeSearchApiUrl(PATH_LIST_MEDIA_BY_IDS, { gm_ids: query })}
              columnSizes={[]}
            />
          </div>
        )}
        {organismsById && (
          <div>
            <H3>Organisms of {query}</H3>
            <ListStanza
              api={makeSearchApiUrl(PATH_LIST_ORGANISMS_BY_TAXIDS, { tax_ids: query })}
              columnSizes={[]}
            />
          </div>
        )}

        {componentsById && (
          <div>
            <H3>Components of {query}</H3>
            <ListStanza
              api={makeSearchApiUrl(PATH_LIST_COMPONENTS_BY_IDS, { gmo_ids: query })}
              columnSizes={[]}
            />
          </div>
        )}

        {mediaByKeyword && (
          <div>
            <H3>Media with {query}</H3>
            <ListStanza
              api={makeSearchApiUrl(PATH_LIST_MEDIA_BY_KEYWORD, { keyword: query })}
              columnSizes={[]}
            />
          </div>
        )}

        {componentsByKeyword && (
          <div>
            <H3>Components with {query}</H3>
            <ListStanza
              api={makeSearchApiUrl(PATH_LIST_COMPONENTS_BY_KEYWORD, { keyword: query })}
              columnSizes={[]}
            />
          </div>
        )}

        {organismsByKeyword && (
          <div>
            <H3>Organisms with {query}</H3>
            <ListStanza
              api={makeSearchApiUrl(PATH_LIST_ORGANISMS_BY_KEYWORD, { keyword: query })}
              columnSizes={[]}
            />
          </div>
        )}
      </section>
    </PageWrapper>
  );
};

const useSearchQuery = (query: string) => {
  const mediaById = useListCount(makeSearchApiUrl(PATH_LIST_MEDIA_BY_IDS, { gm_ids: query })) > 0;
  const componentsById =
    useListCount(makeSearchApiUrl(PATH_LIST_COMPONENTS_BY_IDS, { gmo_ids: query })) > 0;
  const organismsById =
    useListCount(makeSearchApiUrl(PATH_LIST_ORGANISMS_BY_TAXIDS, { tax_ids: query })) > 0;
  const mediaByKeyword =
    useListCount(makeSearchApiUrl(PATH_LIST_MEDIA_BY_KEYWORD, { keyword: query })) > 0;
  const componentsByKeyword =
    useListCount(makeSearchApiUrl(PATH_LIST_COMPONENTS_BY_KEYWORD, { keyword: query })) > 0;
  const organismsByKeyword =
    useListCount(makeSearchApiUrl(PATH_LIST_ORGANISMS_BY_KEYWORD, { keyword: query })) > 0;
  return {
    mediaById,
    componentsById,
    organismsById,
    mediaByKeyword,
    componentsByKeyword,
    organismsByKeyword,
  };
};

const makeSearchApiUrl = (path: string, params: Record<string, string>) => {
  return makeApiUrl(path, new URLSearchParams(params));
};

const useSubmit = (inputRef: RefObject<HTMLInputElement | null>) => {
  const navigate = useNavigate();
  const onSubmit = () => {
    const query = encodeURIComponent(inputRef.current?.value ?? "");
    if (query !== "") {
      void navigate({ to: "/search", search: { query } });
    }
    (document.activeElement as HTMLElement).blur();
  };
  return { onSubmit };
};

const useLocationUpdate = (inputRef: RefObject<HTMLInputElement | null>) => {
  const location = useLocation<any>();
  const query = decodeURIComponent(location.search.query);
  const path = location.pathname;
  if (inputRef.current) {
    if (path === "/search" && query) {
      inputRef.current.value = query;
    } else {
      inputRef.current.value = "";
    }
  }
  return { query };
};
