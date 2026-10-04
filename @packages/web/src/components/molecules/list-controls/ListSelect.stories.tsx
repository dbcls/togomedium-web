import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import { ListSelect } from "./ListSelect";

const SelectExample = (args: ComponentProps<typeof ListSelect>) => {
  const [value, setValue] = useState(args.value);
  return <ListSelect {...args} value={value} onChange={setValue} />;
};

const meta = {
  title: "ListControls/ListSelect",
  component: ListSelect,
  args: {
    label: "Items per page",
    options: [20, 50, 100].map((size) => ({ id: String(size), label: `${size} items` })),
    value: "20",
    onChange: () => {},
  },
  render: (args) => <SelectExample {...args} />,
  decorators: [
    (Story) => (
      <div className="w-80 max-w-full p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListSelect>;
export default meta;
type Story = StoryObj<typeof meta>;

export const PageSize = {} satisfies Story;
export const Fifty = { args: { value: "50" } } satisfies Story;
export const Hundred = { args: { value: "100" } } satisfies Story;
export const Sort = {
  args: {
    label: "Sort by",
    value: "medium-count-desc",
    options: [
      { id: "name-asc", label: "Standard name (A–Z)" },
      { id: "name-desc", label: "Standard name (Z–A)" },
      { id: "id-asc", label: "ID (ascending)" },
      { id: "id-desc", label: "ID (descending)" },
      { id: "medium-count-desc", label: "Medium count (highest first)" },
      { id: "medium-count-asc", label: "Medium count (lowest first)" },
    ],
  },
} satisfies Story;
export const Disabled = { args: { isDisabled: true } } satisfies Story;
export const Narrow = {
  ...Sort,
  decorators: [
    (Story) => (
      <div className="w-40 max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Story;
