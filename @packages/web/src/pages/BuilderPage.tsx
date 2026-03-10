import { FC } from "react";

import { MediumBuilderStanza } from "@/components/stanzas/MediumBuilderStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const BuilderPage: FC = () => {
  usePageTitle("Medium Builder");
  return (
    <PageWrapper>
      <MediumBuilderStanza />
    </PageWrapper>
  );
};
