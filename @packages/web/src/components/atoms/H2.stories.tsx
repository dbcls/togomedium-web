import type { Meta, StoryObj } from "@storybook/react-vite";
import { H2 } from "./H2";
const meta = {
  component: H2,
  args: { children: "Growth media", hasStanzaMargin: true },
} satisfies Meta<typeof H2>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const WithoutStanzaMargin = { args: { hasStanzaMargin: false } } satisfies Story;
export const LongHeading = {
  args: { children: "Find growth media by organism phenotype and taxonomy" },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Story;
