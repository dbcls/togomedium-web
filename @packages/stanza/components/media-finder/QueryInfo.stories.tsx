import { QueryData, useQueryDataMutators } from "%stanza/state/media-finder/queryData";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps, useEffect } from "react";
import { QueryInfo } from "./QueryInfo";

type WithCustomArgs = { queryData: QueryData } & ComponentProps<typeof QueryInfo>;
const meta = {
  component: QueryInfo,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
    (StoryItem, { args }) => {
      const { queryData } = args;
      const { setQueryData } = useQueryDataMutators();
      useEffect(() => {
        setQueryData(queryData);
      }, [queryData]);
      return (
        <ComponentWrapper>
          <StoryItem />
        </ComponentWrapper>
      );
    },
  ],
} satisfies Meta<WithCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    queryData: {
      "tax-id": ["123456", "725851", "447413"],
    },
  },
} satisfies Story;
