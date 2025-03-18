import { Meta, StoryObj } from "@storybook/react";
import { AppContainer } from "./AppContainer";
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
export const Primary: Story = {};
