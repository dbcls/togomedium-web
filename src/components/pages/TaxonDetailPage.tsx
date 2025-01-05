import parse from "html-react-parser";
import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { H3 } from "@/components/atoms/H3.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { TaxonDetailStanza } from "@/components/stanzas/TaxonDetailStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { API_CHILDREN_OF_TAXON, API_MEDIA_OF_TAXON, API_STRAINS_OF_TAXON } from "@/consts.ts";
import { usePageTitle } from "@/hooks/usePageTitle.ts";
import { Route } from "@/routes/taxon/$taxId.tsx";

export const TaxonDetailPage: FC = () => {
  const taxId = Route.useParams().taxId;
  const name = useTaxonName(taxId);
  const isSpecies = useIsSpecies();
  usePageTitle(name);
  return (
    <PageWrapper>
      <div>
        <H2>Taxon information</H2>
        <TaxonDetailStanza taxId={taxId} />
      </div>
      {!isSpecies && (
        <div>
          <H3>Children of {name}</H3>
          <ListStanza
            api={`${API_CHILDREN_OF_TAXON}?tax_id=${taxId}`}
            columnSizes={[10, 65, 10, 15]}
            limit={10}
          />
        </div>
      )}

      <div>
        <H3>Strains of {name}</H3>
        <ListStanza
          api={`${API_STRAINS_OF_TAXON}?tax_id=${taxId}`}
          columnSizes={[15, 70, 15]}
          limit={10}
        />
      </div>
      <div>
        <H3>Media of {name}</H3>
        <ListStanza
          api={`${API_MEDIA_OF_TAXON}?tax_id=${taxId}`}
          columnSizes={[15, 20, 65]}
          limit={10}
        />
      </div>
    </PageWrapper>
  );
};

const useIsSpecies = () => {
  const data = Route.useLoaderData();
  return data?.rank.split("/").pop()?.toLowerCase() === "species";
};

const useTaxonName = (id: string) => {
  const data = Route.useLoaderData();
  const name = data?.scientific_name ?? id;
  return parse(name).toString();
};
