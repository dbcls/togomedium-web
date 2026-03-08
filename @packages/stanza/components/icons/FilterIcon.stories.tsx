import { FilterIcon } from "%stanza/components/icons/FilterIcon";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof FilterIcon> = {
  component: FilterIcon,
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

type Story = StoryObj<typeof FilterIcon>;
export const Primary: Story = {};
