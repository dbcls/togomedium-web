import { Meta, StoryObj } from "@storybook/react";
import App from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/App";

const meta: Meta<typeof App> = {
  component: App,
};
export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {
  args: { gmIds: ["JCM_M900", "HM_D00067"] },
};
export const LargeData: Story = {
  args: { gmIds: ["M18"] },
};
