import type { Meta, StoryObj } from "@storybook/react-vite";
import { FridgeIcon } from "@/components/atoms/svg/FridgeIcon";
import { GridIcon } from "@/components/atoms/svg/GridIcon";
import { ToolsCard } from "./ToolsCard";
const meta = {
  component: ToolsCard,
  args: {
    title: "Find media by components",
    to: "/find-media-by-components",
    icon: <FridgeIcon />,
  },
  decorators: [
    (Story, { parameters }) => (
      <ul className={parameters.narrow ? "w-64 bg-gray-100 p-4" : "max-w-md bg-gray-100 p-4"}>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ToolsCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const CompareMedia = {
  args: { title: "Compare media", to: "/compare-media", icon: <GridIcon /> },
} satisfies Story;
export const Narrow = {
  parameters: { narrow: true },
} satisfies Story;
