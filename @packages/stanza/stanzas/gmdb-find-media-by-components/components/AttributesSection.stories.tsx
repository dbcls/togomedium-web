import { css } from "@emotion/react";
import { Meta, StoryObj } from "@storybook/react";
import { AttributesSection } from "./AttributesSection";
import { COLOR_WHITE, SIZE2 } from "../../../shared/styles/variables";

const meta: Meta<typeof AttributesSection> = {
  component: AttributesSection,
  decorators: [
    (Story) => (
      <div css={wrapper}>
        <Story />
      </div>
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

const wrapper = css`
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
`;
