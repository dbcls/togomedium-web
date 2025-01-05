import parse from "html-react-parser";
import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { H3 } from "@/components/atoms/H3.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { MediumDetailStanza } from "@/components/stanzas/MediumDetailStanza";
import { StrainAlignmentStanza } from "@/components/stanzas/StrainAlignmentStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { API_SIMILAR_MEDIA } from "@/consts.ts";
import { usePageTitle } from "@/hooks/usePageTitle.ts";
import { Route } from "@/routes/medium/$gmId.tsx";

export const MediumDetailPage: FC = () => {
  const gmId = Route.useParams().gmId;
  const name = useMediumName(gmId);
  usePageTitle(name);
  return (
    <PageWrapper>
      <div>
        <H2>Medium information</H2>
        <MediumDetailStanza gmId={gmId} />
      </div>
      <div>
        <H3>Growth media similar to {name}</H3>
        <ListStanza
          api={`${API_SIMILAR_MEDIA}?gm_id=${gmId}`}
          columnSizes={[15, 70, 15]}
        />
      </div>
      <div>
        <H3>Organisms that can be cultured in {name}</H3>
        <StrainAlignmentStanza
          gmIds={[gmId]}
          hideMedia={true}
        />
      </div>
    </PageWrapper>
  );
};

const useMediumName = (id: string) => {
  const data = Route.useLoaderData();
  const hasName: boolean =
    data?.meta?.name !== "" && data?.meta?.name !== "(Unnamed medium)" && !!data?.meta?.name;
  const name = hasName ? `[${id}] ${data?.meta.name}` : `[${id}] `;
  return parse(name).toString();
};
