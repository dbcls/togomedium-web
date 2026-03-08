import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { Meta, StoryObj } from "@storybook/react-vite";

import { AppContainer } from "./AppContainer";

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
