import { useLocation } from "@tanstack/react-router";
import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { MediumBuilderStanza } from "@/components/stanzas/MediumBuilderStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const BuilderPage: FC = () => {
  usePageTitle("Medium Builder");
  const { search } = useLocation() as { search: { source_gm_id?: unknown } };
  const sourceGmId = normalizeSourceGmId(search.source_gm_id);

  return (
    <PageWrapper>
      <div>
        <H2>Medium builder</H2>
        <MediumBuilderStanza sourceGmId={sourceGmId} />
      </div>
    </PageWrapper>
  );
};

const normalizeSourceGmId = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue === "" ? undefined : trimmedValue;
};
