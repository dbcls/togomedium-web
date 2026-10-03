import type { Meta, StoryObj } from "@storybook/react-vite";
import { IntroductionSection } from "./IntroductionSection";

const meta = {
  component: IntroductionSection,
} satisfies Meta<typeof IntroductionSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
