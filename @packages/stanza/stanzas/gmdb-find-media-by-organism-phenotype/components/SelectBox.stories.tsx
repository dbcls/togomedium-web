import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { SelectBox } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/SelectBox";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";

const meta: Meta<typeof SelectBox> = {
  component: SelectBox,
  decorators: [
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SelectBox>;
const args: Story["args"] = {
  label: "Oxygen requirement",
  queryKey: "MPO_10002",
  items: [
    ["MPO_04002", "Aerobe"],
    ["MPO_04003", "Anaerobe"],
    ["MPO_04004", "Obligate aerobe"],
    ["MPO_04005", "Facultative aerobe"],
    ["MPO_04006", "Obligate anaerobe"],
    ["MPO_04007", "Facultative anaerobe"],
    ["MPO_04009", "Microaerophilic"],
  ],
  handleEnabledChange: () => {},
  handleValueChange: () => {},
};

export const Primary: Story = {
  args: { ...args },
};

export const Enabled: Story = {
  args: { ...args },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await userEvent.click(checkbox, { delay: 100 });
  },
};
