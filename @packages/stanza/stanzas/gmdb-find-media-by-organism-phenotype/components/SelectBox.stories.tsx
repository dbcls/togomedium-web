import { SelectBox } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/SelectBox";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "storybook/test";

const meta = {
  component: SelectBox,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
} satisfies Meta<typeof SelectBox>;
export default meta;

type Story = StoryObj<typeof meta>;
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

export const Primary = {
  args: { ...args },
} satisfies Story;

export const Enabled = {
  args: { ...args },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await userEvent.click(checkbox, { delay: 100 });
  },
} satisfies Story;
