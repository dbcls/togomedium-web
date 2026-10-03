import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import { ListPageSizeSelect } from "./ListPageSizeSelect";

const PageSizeExample = (args: ComponentProps<typeof ListPageSizeSelect>) => {
  const [value, setValue] = useState(args.value);
  return <ListPageSizeSelect {...args} value={value} onChange={setValue} />;
};

const meta = {
  title: "ListControls/ListPageSizeSelect",
  component: ListPageSizeSelect,
  args: { value: 20, onChange: () => {} },
  render: (args) => <PageSizeExample {...args} />,
  decorators: [
    (Story) => (
      <div className="w-56 max-w-full p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListPageSizeSelect>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
export const Fifty = { args: { value: 50 } } satisfies Story;
export const Hundred = { args: { value: 100 } } satisfies Story;
export const Disabled = { args: { isDisabled: true } } satisfies Story;
export const Narrow = {
  decorators: [
    (Story) => (
      <div className="w-40 max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Story;
