import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import { ListSearchField } from "./ListSearchField";

const SearchExample = (args: ComponentProps<typeof ListSearchField>) => {
  const [value, setValue] = useState(args.value);
  const [applied, setApplied] = useState<string>();
  return (
    <div className="flex flex-col gap-4">
      <ListSearchField {...args} value={value} onChange={setValue} onSubmit={setApplied} />
      {applied !== undefined && (
        <p role="status">Applied search: {applied || "Any name or GMO ID"}</p>
      )}
    </div>
  );
};

const meta = {
  title: "ListControls/ListSearchField",
  component: ListSearchField,
  args: { value: "", onChange: () => {}, onSubmit: () => {} },
  render: (args) => <SearchExample {...args} />,
  decorators: [
    (Story) => (
      <div className="max-w-xl p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListSearchField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
export const Prefilled = { args: { value: "Glucose" } } satisfies Story;
export const EmptySearch = {
  args: { value: "", placeholder: "Clear the name or GMO ID filter with an empty search" },
} satisfies Story;
export const Disabled = { args: { value: "Glucose", isDisabled: true } } satisfies Story;
export const Narrow = {
  decorators: [
    (Story) => (
      <div className="w-64 max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Story;
