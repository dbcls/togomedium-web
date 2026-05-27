import { PATH_LIST_STRAINS } from "%api/listStrains/definitions.ts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const StrainListPage: FC = () => {
  usePageTitle("All media");
  return (
    <PageWrapper>
      <div>
        <H2>All Strains</H2>
        <ListStanza api={makeApiUrl(PATH_LIST_STRAINS)} columnSizes={[15, 40, 15, 30]} />
      </div>
    </PageWrapper>
  );
};
