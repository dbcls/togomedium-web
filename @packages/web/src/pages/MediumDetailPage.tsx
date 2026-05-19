import { listSimilarMediaUrl } from "%api/listSimilarMedia/definitions.ts";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import parse from "html-react-parser";
import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { H3 } from "@/components/atoms/H3.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { MediumDetailStanza } from "@/components/stanzas/MediumDetailStanza.tsx";
import { StrainAlignmentStanza } from "@/components/stanzas/StrainAlignmentStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";
import { Route } from "@/routes/medium/$gmId.tsx";

const builderLinkClasses = clsx(
  "text-sm2 font-narrow bg-primary self-end rounded px-1 py-0.5 text-white",
);

export const MediumDetailPage: FC = () => {
  const gmId = Route.useParams().gmId;
  const name = useMediumName(gmId);
  const builderLink = `/builder/?source_gm_id=${gmId}`;
  usePageTitle(name);
  return (
    <PageWrapper>
      <div>
        <H2>
          <span>{name}</span>
          <Link className={builderLinkClasses} to={builderLink}>
            Create new medium from this medium
          </Link>
        </H2>
        <MediumDetailStanza gmId={gmId} />
      </div>
      <div>
        <H3>Growth media similar to {name}</H3>
        <ListStanza api={`${listSimilarMediaUrl}?gm_id=${gmId}`} columnSizes={[15, 70, 15]} />
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
  // todo fix this
  // oxlint-disable-next-line
  return parse(name).toString();
};
