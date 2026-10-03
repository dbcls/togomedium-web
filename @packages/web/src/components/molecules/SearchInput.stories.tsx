import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "./SearchInput";

const meta = {
  component: SearchInput,
  parameters: { web: { showLocation: true } },
} satisfies Meta<typeof SearchInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const OnSearchRoute = {
  parameters: { web: { initialPath: "/search?query=Bacillus" } },
} satisfies Story;
export const Narrow = {
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Story;
