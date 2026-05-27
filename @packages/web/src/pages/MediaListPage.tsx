import { PATH_LIST_MEDIA } from "%api/listMedia/definitions.ts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const MediaListPage: FC = () => {
  usePageTitle("All media");
  return (
    <PageWrapper>
      <div>
        <H2>All Media</H2>
        <ListStanza api={makeApiUrl(PATH_LIST_MEDIA)} columnSizes={[15, 15, 70]} />
      </div>
    </PageWrapper>
  );
};
