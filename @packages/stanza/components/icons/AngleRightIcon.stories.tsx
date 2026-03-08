import { Meta, StoryObj } from "@storybook/react-vite";
import { AngleRightIcon } from "%stanza/components/icons/AngleRightIcon";

const meta: Meta<typeof AngleRightIcon> = {
  component: AngleRightIcon,
  decorators: [
    (StoryItem) => {
      return (
        <div style={{ width: 64 }}>
          <StoryItem />
        </div>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof AngleRightIcon>;
export const Primary: Story = {};
