import { Meta, StoryObj } from "@storybook/react";
import App from "%stanza/stanzas/gmdb-stats-culturable-species/App";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";

const meta: Meta<typeof App> = {
  component: App,
  decorators: [
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {};
