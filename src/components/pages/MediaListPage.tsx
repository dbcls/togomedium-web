import { FC } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { H2 } from "@/components/atoms/H2.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { makePageTitle } from "@/utils/string.ts";

export const MediaListPage: FC = () => {
  useDocumentTitle(makePageTitle("All media"));
  return (
    <PageWrapper>
      <div>
        <H2>All Media</H2>
        <ListStanza
          api={"https://togomedium.org/sparqlist/api/list_media"}
          columnSizes={[15, 15, 70]}
        />
      </div>
    </PageWrapper>
  );
};
