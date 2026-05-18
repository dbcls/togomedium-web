import { Sheet } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { appStore } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MediumInfo } from "./MediumInfo";

const meta = {
  component: MediumInfo,
  decorators: [
    (Story) => (
      <StoryProvider mui redux={appStore}>
        <Story />
      </StoryProvider>
    ),
    (Story) => <Story />,
  ],
} satisfies Meta<typeof MediumInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
