import { BottomController } from "%stanza/stanzas/gmdb-meta-list/components/BottomController";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof BottomController> = {
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
};
export default meta;

type Story = StoryObj<typeof BottomController>;
export const Primary: Story = {
  args: {
    total: 2000,
    offset: 10,
    limit: 10,
    setOffset: () => {},
  },
};
