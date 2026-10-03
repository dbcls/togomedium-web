import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavIcon } from "./NavIcon";
const meta = {
  component: NavIcon,
  args: { type: "home", isActive: false },
  argTypes: {
    type: {
      control: "select",
      options: [
        "home",
        "medium",
        "organism",
        "component",
        "slider",
        "tree",
        "fridge",
        "api",
        "stats",
        "grid",
        "mail",
        "doc",
      ],
    },
  },
} satisfies Meta<typeof NavIcon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const Active = { args: { isActive: true } } satisfies Story;
export const AllIcons = {
  render: (args) => (
    <div className="flex flex-wrap gap-6">
      {(
        [
          "home",
          "medium",
          "organism",
          "component",
          "slider",
          "tree",
          "fridge",
          "api",
          "stats",
          "grid",
          "mail",
          "doc",
        ] as const
      ).map((type) => (
        <div key={type} className="group flex flex-col items-center gap-2">
          <NavIcon {...args} type={type} />
          <span>{type}</span>
        </div>
      ))}
    </div>
  ),
} satisfies Story;
