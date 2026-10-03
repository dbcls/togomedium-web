import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavItem } from "./NavItem";
const meta = {
  component: NavItem,
  args: { title: "Media", to: "/medium", icon: "medium" },
  parameters: { web: { initialPath: "/" } },
  decorators: [
    (Story) => (
      <ul className="w-64">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof NavItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const Active = { parameters: { web: { initialPath: "/medium" } } } satisfies Story;
export const ActiveDescendant = {
  args: { exactActive: false },
  parameters: { web: { initialPath: "/medium/M1" } },
} satisfies Story;
export const WithoutIcon = { args: { icon: undefined } } satisfies Story;
export const External = {
  args: { title: "Documentation", href: "https://togomedium.org", to: undefined, icon: "doc" },
} satisfies Story;
