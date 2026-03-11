import { BottomController } from "%stanza/stanzas/gmdb-meta-list/components/BottomController";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: BottomController,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
} satisfies Meta<typeof BottomController>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    total: 2000,
    offset: 10,
    limit: 10,
    setOffset: () => {},
  },
} satisfies Story;
