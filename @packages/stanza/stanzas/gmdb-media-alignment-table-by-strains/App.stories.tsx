import App from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/App";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof App> = {
  component: App,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {
  args: { gmIds: ["JCM_M900", "HM_D00067"] },
};
export const LargeData: Story = {
  args: { gmIds: ["M18"] },
};
