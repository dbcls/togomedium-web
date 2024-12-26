import { FC } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { H2 } from "@/components/atoms/H2.tsx";
import { H3 } from "@/components/atoms/H3.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { StrainDetailStanza } from "@/components/stanzas/StrainDetailStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { Route } from "@/routes/strain/$strainId.tsx";
import { makePageTitle } from "@/utils/string.ts";

export const StrainDetailPage: FC = () => {
  const strainId = Route.useParams().strainId;
  const name = useMediumName(strainId);
  useDocumentTitle(makePageTitle(name));
  return (
    <PageWrapper>
      <div>
        <H2>Strain information</H2>
        <StrainDetailStanza strainId={strainId} />
      </div>
      <div>
        <H3>Phenotypes of {name}</H3>
        <ListStanza
          api={`https://togomedium.org/sparqlist/api/gmdb_phenotype_by_strainid?strain_id=${strainId}`}
          columnSizes={[70, 15, 15]}
        />
      </div>
      <div>
        <H3>Media of {name}</H3>
        <ListStanza
          api={`https://togomedium.org/sparqlist/api/gmdb_media_by_strainid?strain_id=${strainId}`}
          columnSizes={[10, 20, 70]}
        />
      </div>
    </PageWrapper>
  );
};

// api_url="https://togomedium.org/sparqlist/api//gmdb_phenotype_by_strainid?strain_id=S6920"
// https://togomedium.org/sparqlist/api//gmdb_media_by_strainid?strain_id=S6920

const useMediumName = (id: string) => {
  const data = Route.useLoaderData();
  const name = data?.strain.strain_name ?? id;
  return name;
};
