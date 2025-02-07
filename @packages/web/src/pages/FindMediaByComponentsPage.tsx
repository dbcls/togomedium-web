import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { FindMediaByComponentsStanza } from "@/components/stanzas/FindMediaByComponentsStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const FindMediaByComponentsPage: FC = () => {
  usePageTitle("Find media by components");
  return (
    <PageWrapper>
      <div className={"flex grow flex-col"}>
        <H2>Find media by components</H2>
        <FindMediaByComponentsStanza />
      </div>
    </PageWrapper>
  );
};
