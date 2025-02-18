import { FC } from "react";
import { listComponentsUrl } from "%api/listComponents/definitions.ts";
import { H2 } from "@/components/atoms/H2.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const ComponentListPage: FC = () => {
  usePageTitle("All media");
  return (
    <PageWrapper>
      <div>
        <H2>All Components</H2>
        <ListStanza
          api={listComponentsUrl}
          columnSizes={[20, 80]}
        />
      </div>
    </PageWrapper>
  );
};
