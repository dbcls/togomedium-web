import { FC } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { H2 } from "@/components/atoms/H2.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { makePageTitle } from "@/utils/string.ts";

export const StrainListPage: FC = () => {
  useDocumentTitle(makePageTitle("All media"));
  return (
    <PageWrapper>
      <div>
        <H2>All Strains</H2>
        <ListStanza
          api={"https://togomedium.org/sparqlist/api/list_strains"}
          columnSizes={[15, 40, 15, 30]}
        />
      </div>
    </PageWrapper>
  );
};
