import App from "%stanza/stanzas/gmdb-medium-builder/App";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof App> = {
  component: App,
};
export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {
  args: {},
};
