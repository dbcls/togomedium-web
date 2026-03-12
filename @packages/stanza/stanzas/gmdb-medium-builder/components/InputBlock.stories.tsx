import { Sheet } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { appStore } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputBlock } from "./InputBlock";

const state = appStore.getState();
const solutionBlockId = state.entities.solutionBlocks.ids[0];

const meta = {
  component: InputBlock,
  args: {
    id: solutionBlockId,
  },
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui redux={appStore}>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <Sheet>
        <Story />
      </Sheet>
    ),
  ],
} satisfies Meta<typeof InputBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
