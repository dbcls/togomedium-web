import { QueryData, useQueryDataMutators } from "%stanza/state/media-finder/queryData";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps, useEffect } from "react";

import { QueryInfo } from "./QueryInfo";

type WithCustomArgs = { queryData: QueryData } & ComponentProps<typeof QueryInfo>;
const meta: Meta<WithCustomArgs> = {
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
};
export default meta;

type Story = StoryObj<WithCustomArgs>;
export const Primary: Story = {
  args: {
    queryData: {
      "tax-id": ["123456", "725851", "447413"],
    },
  },
};
