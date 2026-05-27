import { PATH_STATS_GM_COUNT_BY_PHYLUM } from "%api/statsGmCountByPhylum/definitions.ts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { CulturableSpeciesStatsStanza } from "@/components/stanzas/CulturableSpeciesStatsStanza.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const StatisticsPage: FC = () => {
  usePageTitle("All media");
  return (
    <PageWrapper>
      <div>
        <H2>Distribution of the Number of Culturable Species per Medium</H2>
        <div className={"rounded bg-white p-4"}>
          <CulturableSpeciesStatsStanza />
        </div>
      </div>

      <div>
        <H2>The number of growth media per phylum</H2>
        <ListStanza
          api={makeApiUrl(PATH_STATS_GM_COUNT_BY_PHYLUM)}
          columnSizes={[50, 50]}
          limit={999}
        />
      </div>
    </PageWrapper>
  );
};
