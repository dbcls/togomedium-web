import { FC } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { H2 } from "@/components/atoms/H2.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { API_COMPONENT_LIST } from "@/consts.ts";
import { makePageTitle } from "@/utils/string.ts";

export const ComponentListPage: FC = () => {
  useDocumentTitle(makePageTitle("All media"));
  return (
    <PageWrapper>
      <div>
        <H2>All Components</H2>
        <ListStanza api={API_COMPONENT_LIST} columnSizes={[15, 15, 70]} />
      </div>
    </PageWrapper>
  );
};
