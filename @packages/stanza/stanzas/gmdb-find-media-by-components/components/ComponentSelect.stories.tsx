import { ComponentWrapper } from "%stanza/.storybook/components/ComponentWrapper";
import { StoryProvider } from "%stanza/.storybook/StoryProvider";
import { ComponentSelect } from "%stanza/stanzas/gmdb-find-media-by-components/components/ComponentSelect";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: ComponentSelect,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
} satisfies Meta<typeof ComponentSelect>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    onChangeSelection: (ids) => {
      console.log(ids);
    },
  },
} satisfies Story;
