import { Meta, StoryObj } from "@storybook/react";
import { AttributesSection } from "%stanza/stanzas/gmdb-find-media-by-components/components/AttributesSection";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";

const meta: Meta<typeof AttributesSection> = {
  component: AttributesSection,
  decorators: [
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
  parameters: {
    // msw: makeMswParameter(allComponentsMocks),
  },
};
export default meta;

type Story = StoryObj<typeof AttributesSection>;
export const Primary: Story = {
  args: {},
};
