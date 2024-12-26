import { FC } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { ListStanza } from "@/components/stanzas/ListStanza.tsx";
import { MediumDetailStanza } from "@/components/stanzas/MediumDetailStanza";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { Route } from "@/routes/medium/$postId";
import { makePageTitle } from "@/utils/string.ts";

export const MediumDetailPage: FC = () => {
  const postId = Route.useParams().postId;
  const name = useMediumName(postId);
  useDocumentTitle(makePageTitle(name));
  return (
    <PageWrapper>
      <div>
        <h2 className={"text-4xl"}>Medium Information</h2>
        <MediumDetailStanza gmId={postId} />
      </div>
      <ListStanza
        api={`https://togomedium.org/sparqlist/api/gmdb_list_similar_media_by_gmid?gm_id=${postId}`}
        columnSizes={[15, 70, 15]}
        title={`Growth media similar to ${name}`}
      />
    </PageWrapper>
  );
};

const useMediumName = (postId: string) => {
  const data = Route.useLoaderData();
  const hasName: boolean =
    data?.meta?.name !== "" && data?.meta?.name !== "(Unnamed medium)" && !!data?.meta?.name;
  const name = hasName ? `[${postId}] ${data?.meta.name}` : `[${postId}] `;
  return name;
};
