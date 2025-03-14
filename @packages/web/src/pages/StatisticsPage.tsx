import { FC } from "react";
import { statsGmCountByPhylum } from "%api/statsGmCountByPhylum/definitions.ts";
import { H2 } from "@/components/atoms/H2.tsx";
import {MediumSpeciesDistributionChart} from "@/components/organisms/MediumSpeciesDistributionChart.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const StatisticsPage: FC = () => {
  usePageTitle("All media");
  return (
    <PageWrapper>
      <div>
        <H2>Distribution of the Number of Culturable Species per Medium</H2>
        <div className={"bg-white p-4 rounded"}>
        <MediumSpeciesDistributionChart />
        </div>
      </div>

      <div>
        <H2>The number of growth media per phylum</H2>
        <ListStanza
          api={statsGmCountByPhylum}
          columnSizes={[50, 50]}
          limit={999}
        />
      </div>
    </PageWrapper>
  );
};
