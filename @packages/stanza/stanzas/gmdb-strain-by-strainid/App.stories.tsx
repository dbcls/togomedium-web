import { Meta, StoryObj } from "@storybook/react";
import App from "%stanza/stanzas/gmdb-strain-by-strainid/App";

const meta: Meta<typeof App> = {
  component: App,
};
export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {
  args: {
    strain_id: "S602",
  },
};
