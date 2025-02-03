import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { API_MEDIA_LIST } from "@/consts/api.ts";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const MediaListPage: FC = () => {
  usePageTitle("All media");
  return (
    <PageWrapper>
      <div>
        <H2>All Media</H2>
        <ListStanza
          api={API_MEDIA_LIST}
          columnSizes={[15, 15, 70]}
        />
      </div>
    </PageWrapper>
  );
};
