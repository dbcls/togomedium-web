import { FC } from "react";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const HomePage: FC = () => {
  usePageTitle("");
  return (
    <PageWrapper>
      <div className={"grow"}>
        <h1>Welcome to TogoMedium</h1>
        <p>TogoMedium is a platform for sharing and discussing scientific media.</p>
      </div>
    </PageWrapper>
  );
};
