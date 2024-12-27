import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { H3 } from "@/components/atoms/H3.tsx";
import { ComponentDetailStanza } from "@/components/stanzas/ComponentDetailStanza.tsx";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { API_MEDIA_OF_COMPONENT } from "@/consts.ts";
import { usePageTitle } from "@/hooks/usePageTitle.ts";
import { Route } from "@/routes/component/$gmoId.tsx";

export const ComponentDetailPage: FC = () => {
  const gmoId = Route.useParams().gmoId;
  const name = useComponentName(gmoId);
  usePageTitle(name);
  return (
    <PageWrapper>
      <div>
        <H2>Component information</H2>
        <ComponentDetailStanza gmoId={gmoId} />
      </div>
      <div>
        <H3>Media including {name}</H3>
        <ListStanza api={`${API_MEDIA_OF_COMPONENT}?gmo_id=${gmoId}`} columnSizes={[15, 85]} />
      </div>
    </PageWrapper>
  );
};

const useComponentName = (id: string) => {
  const data = Route.useLoaderData();
  const name = data?.pref_label ?? id;
  return name;
};
