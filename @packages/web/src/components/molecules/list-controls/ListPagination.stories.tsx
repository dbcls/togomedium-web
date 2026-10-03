import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import { ListPagination } from "./ListPagination";

const PaginationExample = (args: ComponentProps<typeof ListPagination>) => {
  const [page, setPage] = useState(args.page);
  return <ListPagination {...args} page={page} onPageChange={setPage} />;
};

const meta = {
  title: "ListControls/ListPagination",
  component: ListPagination,
  args: { page: 1, totalItems: 1539, pageSize: 20, onPageChange: () => {} },
  render: (args) => <PaginationExample {...args} />,
  decorators: [
    (Story) => (
      <div className="max-w-2xl p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListPagination>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage = {} satisfies Story;
export const MiddlePage = { args: { page: 38 } } satisfies Story;
export const LastPage = { args: { page: 77 } } satisfies Story;
export const SinglePage = { args: { totalItems: 12 } } satisfies Story;
export const NoResults = { args: { totalItems: 0 } } satisfies Story;
export const Disabled = { args: { page: 38, isDisabled: true } } satisfies Story;
export const Narrow = {
  args: { page: 38 },
  decorators: [
    (Story) => (
      <div className="w-64 max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Story;
