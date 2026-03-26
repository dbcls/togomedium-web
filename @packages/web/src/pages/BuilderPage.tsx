import { FC } from "react";

import { H2 } from "@/components/atoms/H2.tsx";
import { MediumBuilderStanza } from "@/components/stanzas/MediumBuilderStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const BuilderPage: FC = () => {
  usePageTitle("Medium Builder");
  return (
    <PageWrapper>
      <div>
        <H2>Medium builder</H2>
        <MediumBuilderStanza />
      </div>
    </PageWrapper>
  );
};
