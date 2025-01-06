import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { Introduction } from "@/components/organisms/home/Introduction.tsx";
import { Stats } from "@/components/organisms/home/Stats.tsx";
import { Tools } from "@/components/organisms/home/Tools.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const HomePage: FC = () => {
  usePageTitle("");
  return (
    <PageWrapper>
      <div className={"mx-auto flex max-w-[1200px] grow flex-col gap-16"}>
        <Introduction />
        <Stats />
        <Tools />

        <div>
          <H2>Or search anything with by IDs and keywords</H2>
          <div></div>
        </div>
      </div>
    </PageWrapper>
  );
};
