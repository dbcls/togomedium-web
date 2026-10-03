import type { Meta, StoryObj } from "@storybook/react-vite";
import { MediumIcon } from "@/components/atoms/svg/MediumIcon";
import { StatsCard } from "./StatsCard";
const meta = {
  component: StatsCard,
  args: { count: 2400, label: "media", to: "/medium", icon: <MediumIcon /> },
  decorators: [
    (Story, { parameters }) => (
      <ul className={parameters.narrow ? "w-64 bg-gray-100 p-4" : "max-w-md bg-gray-100 p-4"}>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof StatsCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const Navigation = { parameters: { web: { showLocation: true } } } satisfies Story;
export const Zero = { args: { count: 0 } } satisfies Story;
export const LargeCount = { args: { count: 1234567 } } satisfies Story;
export const Narrow = {
  parameters: { narrow: true },
} satisfies Story;
