import App from "%stanza/stanzas/gmdb-medium-builder/App";
import { appStore } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { PageWrapper } from "%storybook/components/PageWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui redux={appStore}>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <PageWrapper>
        <Story />
      </PageWrapper>
    ),
  ],
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Result1 = {
  args: {},
} satisfies Story;
