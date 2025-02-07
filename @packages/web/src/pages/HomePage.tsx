import { FC } from "react";
import { IntroductionSection } from "@/components/organisms/home/IntroductionSection.tsx";
import { SearchSection } from "@/components/organisms/home/SearchSection.tsx";
import { StatsSection } from "@/components/organisms/home/StatsSection.tsx";
import { ToolsSection } from "@/components/organisms/home/ToolsSection.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const HomePage: FC = () => {
  usePageTitle("");
  return (
    <PageWrapper
      type={"narrow"}
      className={"gap-20, pb-40"}
    >
      <IntroductionSection />
      <StatsSection />
      <ToolsSection />
      <SearchSection />
    </PageWrapper>
  );
};
