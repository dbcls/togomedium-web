import { AttributesSection } from "%stanza/stanzas/gmdb-find-media-by-components/components/AttributesSection";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: AttributesSection,
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
  parameters: {
    // msw: makeMswParameter(allComponentsMocks),
  },
} satisfies Meta<typeof AttributesSection>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {},
} satisfies Story;
