import { deepEqual } from "@tanstack/react-router";
import { FC, useEffect, useRef, useState } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { ComponentAlignmentStanza } from "@/components/stanzas/ComponentAlignmentStanza.tsx";
import { StrainAlignmentStanza } from "@/components/stanzas/StrainAlignmentStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";
import { MediaAlignmentTableResponse } from "@/types/MediaAlignmentTableResponse.ts";

export const CompareMediaPage: FC = () => {
  usePageTitle("Compare Media");
  const { gmIds, isVisible, errorMsg, inputRef, onClickButton } = useCompareMedia();

  return (
    <PageWrapper>
      <div>
        <H2>Compare media</H2>
        <fieldset className="id-input">
          <input type="text" placeholder="M2339,M328" defaultValue={"M2339,M328"} ref={inputRef} />
          <input type="button" value="compare" onClick={onClickButton} />
          {errorMsg && <p id="errorMsg">{errorMsg}</p>}
        </fieldset>
      </div>

      <ComponentAlignmentStanza gmIds={gmIds} isVisible={isVisible} />
      <StrainAlignmentStanza gmIds={gmIds} isVisible={isVisible} />
    </PageWrapper>
  );
};

const useCompareMedia = () => {
  const [gmIds, setGmIds] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const execute = () => {
    const queryStr = inputRef.current?.value ?? "";
    const _gmIds = queryStr.split(",").map((str) => str.trim());
    if (deepEqual(_gmIds, gmIds)) return;
    setErrorMsg("");
    setGmIds(_gmIds);
    setSearchParams(_gmIds);
  };

  const onClickButton = () => {
    execute();
  };

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const response: MediaAlignmentTableResponse = e.detail;
      const { foundLength, notFoundIds } = processMediaAlignmentTableResponse(response, gmIds);
      setIsVisible(foundLength > 0);
      setErrorMsg(notFoundIds.length > 0 ? `Media not found: ${notFoundIds.join(",")}` : "");
    };
    document.addEventListener("STANZA_ON_LOAD_DATA", handler);
    return () => {
      document.removeEventListener("STANZA_ON_LOAD_DATA", handler);
    };
  }, [gmIds]);

  useEffect(() => {
    const url = new URL(location.href);
    const queriedIds = url.searchParams.get("gm_ids");
    if (queriedIds) {
      inputRef.current!.value = queriedIds;
      execute();
    }
  }, [execute]);

  return { gmIds, isVisible, errorMsg, inputRef, onClickButton };
};

const setSearchParams = (ids: string[]) => {
  const url = new URL(location.href);
  url.searchParams.set("gm_ids", ids.join(","));
  history.pushState(null, "", url);
};

const processMediaAlignmentTableResponse = (
  response: MediaAlignmentTableResponse,
  gmIds: string[]
) => {
  const loadedMedia: string[] = [
    ...response.media.map((m) => m.gm_id),
    ...response.media.map((m) => m.original_media_id),
  ];
  const foundLength = gmIds.filter((id) => loadedMedia.includes(id)).length;
  const notFoundIds = gmIds.filter((id) => !loadedMedia.includes(id));
  return { foundLength, notFoundIds };
};
