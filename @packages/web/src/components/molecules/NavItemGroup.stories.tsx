import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavItem } from "./NavItem";
import { NavItemGroup } from "./NavItemGroup";
const meta = {
  component: NavItemGroup,
  args: {
    title: "Browse",
    children: (
      <>
        <NavItem title="Media" to="/medium" icon="medium" />
        <NavItem title="Strains" to="/strain" icon="organism" />
        <NavItem title="Components" to="/component" icon="component" />
      </>
    ),
  },
  parameters: { web: { initialPath: "/medium", showLocation: true } },
  decorators: [
    (Story) => (
      <ul className="w-64">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof NavItemGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const LongTitle = { args: { title: "Find and compare growth media" } } satisfies Story;
