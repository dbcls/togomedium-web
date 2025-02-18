import { FC } from "react";
import { listStrainsUrl } from "%api/listStrains/definitions.ts";
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
        <ListStanza
          api={listStrainsUrl}
          columnSizes={[15, 40, 15, 30]}
        />
      </div>
    </PageWrapper>
  );
};
