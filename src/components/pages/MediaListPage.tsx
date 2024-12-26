import { FC } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { makePageTitle } from "@/utils/string.ts";

export const MediaListPage: FC = () => {
  useDocumentTitle(makePageTitle("All media"));
  return (
    <PageWrapper>
      <div>
        <h2 className={"text-3xl font-medium"}>List Of Media</h2>
        <ListStanza
          api={"https://togomedium.org/sparqlist/api/list_media"}
          columnSizes={[15, 15, 70]}
        />
      </div>
    </PageWrapper>
  );
};
