import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { FindMediaByTaxonomicTreeStanza } from "@/components/stanzas/FindMediaByTaxonomicTreeStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const FindMediaByTaxonomicTreePage: FC = () => {
  usePageTitle("Find media by taxonomic tree");
  return (
    <PageWrapper>
      <div className={"flex grow flex-col"}>
        <H2>Find media by taxonomic tree</H2>
        <FindMediaByTaxonomicTreeStanza />
      </div>
    </PageWrapper>
  );
};
