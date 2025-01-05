import { FC } from "react";
import { Introduction } from "@/components/organisms/home/Introduction.tsx";
import { Stats } from "@/components/organisms/home/Stats.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const HomePage: FC = () => {
  usePageTitle("");
  return (
    <PageWrapper>
      <div className={"mx-auto flex max-w-[1200px] grow flex-col gap-6"}>
        <Introduction />
        <Stats />
      </div>
    </PageWrapper>
  );
};
