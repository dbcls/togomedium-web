import { Pagination } from "%stanza/components/media-finder/Pagination";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";
import React, { ComponentProps } from "react";

const meta: Meta<typeof Pagination> = {
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
};
export default meta;

type Story = StoryObj<typeof Pagination>;
const defaultArgs: ComponentProps<typeof Pagination> = {
  total: 35,
  current: 0,
  displayLength: 10,
  onClickNext: () => {},
  onClickPrev: () => {},
};
export const Primary: Story = {
  args: { ...defaultArgs },
};
export const Type1: Story = {
  args: { ...defaultArgs, current: 10 },
};
export const Type2: Story = {
  args: { ...defaultArgs, current: 25 },
};
