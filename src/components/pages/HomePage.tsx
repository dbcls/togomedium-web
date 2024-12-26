import { FC } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { makePageTitle } from "@/utils/string.ts";

export const HomePage: FC = () => {
  useDocumentTitle(makePageTitle());
  return (
    <PageWrapper>
      <div className={"grow"}>
        <h1>Welcome to TogoMedium</h1>
        <p>TogoMedium is a platform for sharing and discussing scientific media.</p>
      </div>
    </PageWrapper>
  );
};
