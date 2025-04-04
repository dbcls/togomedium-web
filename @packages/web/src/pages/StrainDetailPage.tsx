import parse from "html-react-parser";
import { FC } from "react";
import { listMediaOfStrain } from "%api/listMediaOfStrain/definitions.ts";
import { listPhenotypeOfStrainUrl } from "%api/listPhenotypeOfStrain/definitions.ts";
import { H2 } from "@/components/atoms/H2.tsx";
import { H3 } from "@/components/atoms/H3.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { StrainDetailStanza } from "@/components/stanzas/StrainDetailStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";
import { Route } from "@/routes/strain/$strainId.tsx";

export const StrainDetailPage: FC = () => {
  const strainId = Route.useParams().strainId;
  const name = useStrainName(strainId);
  usePageTitle(name);
  return (
    <PageWrapper>
      <div>
        <H2>Strain information</H2>
        <StrainDetailStanza strainId={strainId} />
      </div>
      <div>
        <H3>Phenotypes of {name}</H3>
        <ListStanza
          api={`${listPhenotypeOfStrainUrl}?strain_id=${strainId}`}
          columnSizes={[70, 15, 15]}
        />
      </div>
      <div>
        <H3>Media of {name}</H3>
        <ListStanza
          api={`${listMediaOfStrain}?strain_id=${strainId}`}
          columnSizes={[10, 20, 70]}
        />
      </div>
    </PageWrapper>
  );
};

const useStrainName = (id: string) => {
  const data = Route.useLoaderData();
  const name = data?.strain.strain_name ?? id;
  return parse(name).toString();
};
