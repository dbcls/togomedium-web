import { VerticalEllipsisIcon } from "%stanza/components/icons/VerticalEllipsisIcon";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof VerticalEllipsisIcon> = {
  component: VerticalEllipsisIcon,
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

type Story = StoryObj<typeof VerticalEllipsisIcon>;
export const Primary: Story = {};
