import App from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/App";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: App,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Result1 = {
  args: { gmIds: ["JCM_M900", "HM_D00067"] },
} satisfies Story;
export const LargeData = {
  args: { gmIds: ["M18"] },
} satisfies Story;
