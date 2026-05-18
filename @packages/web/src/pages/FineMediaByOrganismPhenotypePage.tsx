import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { FindMediaByOrganismPhenotypeStanza } from "@/components/stanzas/FindMediaByOrganismPhenotypeStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const FindMediaByOrganismPhenotypePage: FC = () => {
  usePageTitle("Find media by organism phenotype");
  return (
    <PageWrapper>
      <div className={"flex grow flex-col"}>
        <H2>Find media by organism phenotype</H2>
        <FindMediaByOrganismPhenotypeStanza />
      </div>
    </PageWrapper>
  );
};
