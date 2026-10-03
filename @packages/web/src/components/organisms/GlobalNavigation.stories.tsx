import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlobalNavigation } from "./GlobalNavigation";

const meta = {
  component: GlobalNavigation,
  parameters: { web: { showLocation: true } },
} satisfies Meta<typeof GlobalNavigation>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
export const MediaSelected = {
  parameters: { web: { initialPath: "/medium" } },
} satisfies Story;
export const CompareMediaSelected = {
  parameters: { web: { initialPath: "/compare-media" } },
} satisfies Story;
export const SearchQuery = {
  parameters: { web: { initialPath: "/search?query=Glucose" } },
} satisfies Story;
