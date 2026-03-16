import { Block, Sheet } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { appStore } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ComponentRow } from "./ComponentRow";

const state = appStore.getState();
const componentRowId = state.entities.componentRows.ids[0];
const solutionBlockId = state.entities.solutionBlocks.ids[0];

const meta = {
  component: ComponentRow,
  args: {
    id: componentRowId,
    solutionBlockId,
  },
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui redux={appStore}>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <Sheet>
        <Block>
          <Story />
        </Block>
      </Sheet>
    ),
  ],
} satisfies Meta<typeof ComponentRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
