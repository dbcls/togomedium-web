import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { API_PHYLUM_STATS } from "@/consts.ts";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const StatisticsPage: FC = () => {
  usePageTitle("All media");
  return (
    <PageWrapper>
      <div>
        <H2>The number of growth media per phylum</H2>
        <ListStanza
          api={API_PHYLUM_STATS}
          columnSizes={[50, 50]}
          limit={999}
        />
      </div>
    </PageWrapper>
  );
};
