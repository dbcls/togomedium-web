import { FC } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { H2 } from "@/components/atoms/H2.tsx";
import { H3 } from "@/components/atoms/H3.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { MediumDetailStanza } from "@/components/stanzas/MediumDetailStanza";
import { StrainAlignmentStanza } from "@/components/stanzas/StrainAlignmentStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { Route } from "@/routes/medium/$gmId.tsx";
import { makePageTitle } from "@/utils/string.ts";

export const MediumDetailPage: FC = () => {
  const gmId = Route.useParams().gmId;
  const name = useMediumName(gmId);
  useDocumentTitle(makePageTitle(name));
  return (
    <PageWrapper>
      <div>
        <H2>Medium Information</H2>
        <MediumDetailStanza gmId={gmId} />
      </div>
      <div>
        <H3>Growth media similar to {name}</H3>
        <ListStanza
          api={`https://togomedium.org/sparqlist/api/gmdb_list_similar_media_by_gmid?gm_id=${gmId}`}
          columnSizes={[15, 70, 15]}
        />
      </div>
      <div>
        <H3>Organisms that can be cultured in {name}</H3>
        <StrainAlignmentStanza gmIds={[gmId]} hideMedia={true} />
      </div>
    </PageWrapper>
  );
};

const useMediumName = (id: string) => {
  const data = Route.useLoaderData();
  const hasName: boolean =
    data?.meta?.name !== "" && data?.meta?.name !== "(Unnamed medium)" && !!data?.meta?.name;
  const name = hasName ? `[${id}] ${data?.meta.name}` : `[${id}] `;
  return name;
};
