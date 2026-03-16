import { Pagination } from "%stanza/components/media-finder/Pagination";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { ComponentProps } from "react";

const meta = {
  component: Pagination,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
    (StoryItem) => {
      return (
        <ComponentWrapper>
          <StoryItem />
        </ComponentWrapper>
      );
    },
  ],
} satisfies Meta<typeof Pagination>;
export default meta;

type Story = StoryObj<typeof meta>;
const defaultArgs: ComponentProps<typeof Pagination> = {
  total: 35,
  current: 0,
  displayLength: 10,
  onClickNext: () => {},
  onClickPrev: () => {},
};
export const Primary = {
  args: { ...defaultArgs },
} satisfies Story;
export const Type1 = {
  args: { ...defaultArgs, current: 10 },
} satisfies Story;
export const Type2 = {
  args: { ...defaultArgs, current: 25 },
} satisfies Story;
