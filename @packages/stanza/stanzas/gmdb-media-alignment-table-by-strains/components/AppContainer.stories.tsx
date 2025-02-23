import { Meta, StoryObj } from "@storybook/react";
import { AppContainer } from "./AppContainer";
import { data1 } from "%api/mediaStrainsAlignment/data1";
import { data2 } from "%api/mediaStrainsAlignment/data2";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";

const meta: Meta<typeof AppContainer> = {
  component: AppContainer,
  decorators: [
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof AppContainer>;
export const Primary: Story = {
  args: { data: data1 },
};
export const WithNull: Story = {
  args: { data: data2 },
};

export const NotFound: Story = { args: { data: [] } };
