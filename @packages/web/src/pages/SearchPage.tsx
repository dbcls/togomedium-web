import { RefObject } from "@react-types/shared";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { FC, useRef } from "react";
import { listComponentsByIdsUrl } from "%api/listComponentsByIds/definitions.ts";
import { listComponentsByKeywordUrl } from "%api/listComponentsByKeyword/definitions.ts";
import { listMediaByIdsUrl } from "%api/listMediaByIds/definitions.ts";
import { listMediaByKeywordUrl } from "%api/listMediaByKeyword/definitions.ts";
import { listOrganismByIdsUrl } from "%api/listOrganismByIds/definitions.ts";
import { listOrganismByKeywordUrl } from "%api/listOrganismByKeyword/definitions.ts";
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
              api={`${listMediaByIdsUrl}?gm_ids=${query}`}
              columnSizes={[]}
            />
          </div>
        )}
        {organismsById && (
          <div>
            <H3>Organisms of {query}</H3>
            <ListStanza
              api={`${listOrganismByIdsUrl}?tax_ids=${query}`}
              columnSizes={[]}
            />
          </div>
        )}

        {componentsById && (
          <div>
            <H3>Components of {query}</H3>
            <ListStanza
              api={`${listComponentsByIdsUrl}?gmo_ids=${query}`}
              columnSizes={[]}
            />
          </div>
        )}

        {mediaByKeyword && (
          <div>
            <H3>Media with {query}</H3>
            <ListStanza
              api={`${listMediaByKeywordUrl}?keyword=${query}`}
              columnSizes={[]}
            />
          </div>
        )}

        {componentsByKeyword && (
          <div>
            <H3>Components with {query}</H3>
            <ListStanza
              api={`${listComponentsByKeywordUrl}?keyword=${query}`}
              columnSizes={[]}
            />
          </div>
        )}

        {organismsByKeyword && (
          <div>
            <H3>Organisms with {query}</H3>
            <ListStanza
              api={`${listOrganismByKeywordUrl}?keyword=${query}`}
              columnSizes={[]}
            />
          </div>
        )}
      </section>
    </PageWrapper>
  );
};

const useSearchQuery = (query: string) => {
  const mediaById = useListCount(`${listMediaByIdsUrl}?gm_ids=${query}`) > 0;
  const componentsById = useListCount(`${listComponentsByIdsUrl}?gmo_ids=${query}`) > 0;
  const organismsById = useListCount(`${listOrganismByIdsUrl}?tax_ids=${query}`) > 0;
  const mediaByKeyword = useListCount(`${listMediaByKeywordUrl}?keyword=${query}`) > 0;
  const componentsByKeyword = useListCount(`${listComponentsByKeywordUrl}?keyword=${query}`) > 0;
  const organismsByKeyword = useListCount(`${listOrganismByKeywordUrl}?keyword=${query}`) > 0;
  return {
    mediaById,
    componentsById,
    organismsById,
    mediaByKeyword,
    componentsByKeyword,
    organismsByKeyword,
  };
};

const useSubmit = (inputRef: RefObject<HTMLInputElement | null>) => {
  const navigate = useNavigate();
  const onSubmit = () => {
    const query = encodeURIComponent(inputRef.current?.value ?? "");
    if (query !== "") {
      navigate({ to: "/search", search: { query } });
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
