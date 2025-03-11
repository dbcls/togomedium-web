import { FC, useMemo } from "react";
import { TaxonomyType } from "%core/types/TaxonomyType.ts";
import { H2 } from "@/components/atoms/H2.tsx";
import { FindMediaByTaxonomicTreeStanza } from "@/components/stanzas/FindMediaByTaxonomicTreeStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

type Props = {
  type: TaxonomyType;
};
export const FindMediaByTaxonomicTreePage: FC<Props> = ({ type = "NCBI" }) => {
  usePageTitle("Find media by taxonomic tree");
  const title = useMemo(() => {
    return `Find media by ${type} taxonomic tree`;
  }, [type]);
  return (
    <PageWrapper>
      <div className={"flex grow flex-col"}>
        <H2>{title}</H2>
        <FindMediaByTaxonomicTreeStanza type={type} />
      </div>
    </PageWrapper>
  );
};
