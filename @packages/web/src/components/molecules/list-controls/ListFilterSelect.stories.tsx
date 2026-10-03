import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import { ListFilterSelect, type ListFilterOption } from "./ListFilterSelect";

const options: ListFilterOption[] = [
  { id: "source", label: "Nutrient source", count: 240 },
  { id: "carbon", label: "Carbon source", count: 120, depth: 1 },
  { id: "sugar", label: "Sugar", count: 65, depth: 2 },
  { id: "nitrogen", label: "Nitrogen source", count: 0, depth: 1 },
  { id: "buffer", label: "Buffer", count: 18 },
];

const FilterExample = (args: ComponentProps<typeof ListFilterSelect>) => {
  const [value, setValue] = useState(args.value);
  return <ListFilterSelect {...args} value={value} onChange={setValue} />;
};

const meta = {
  title: "ListControls/ListFilterSelect",
  component: ListFilterSelect,
  args: { label: "Role", value: null, options, onChange: () => {} },
  render: (args) => <FilterExample {...args} />,
  decorators: [
    (Story) => (
      <div className="w-80 max-w-full p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListFilterSelect>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
export const Hierarchy = { args: { value: "sugar" } } satisfies Story;
export const ZeroCount = { args: { value: "nitrogen" } } satisfies Story;
export const LoadingCounts = { args: { value: "carbon", countsStatus: "loading" } } satisfies Story;
export const FailedCounts = { args: { value: "carbon", countsStatus: "error" } } satisfies Story;
export const EmptyOptions = { args: { options: [] } } satisfies Story;
export const LoadingOptions = { args: { options: [], countsStatus: "loading" } } satisfies Story;
export const FlatOptions = {
  args: {
    label: "Property",
    options: [
      { id: "solid", label: "Solidifying agent", count: 24 },
      { id: "organic", label: "Organic compound", count: 83 },
      { id: "inorganic", label: "Inorganic compound", count: 0 },
    ],
  },
} satisfies Story;
export const Disabled = { args: { isDisabled: true } } satisfies Story;
export const Narrow = {
  args: {
    options: [
      ...options,
      {
        id: "long",
        label: "A filter option with a long descriptive label",
        count: 12345,
        depth: 2,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-56 max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Story;
