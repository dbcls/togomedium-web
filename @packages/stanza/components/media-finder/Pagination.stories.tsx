import { Meta, StoryObj } from "@storybook/react";
import React, { ComponentProps } from "react";
import { Pagination } from "%stanza/components/media-finder/Pagination";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  decorators: [
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
