import { Meta, StoryObj } from "@storybook/react";
import { MediumSpeciesDistributionChart } from "./MediumSpeciesDistributionChart";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper.tsx";

const meta: Meta<typeof MediumSpeciesDistributionChart> = {
  component: MediumSpeciesDistributionChart,
  decorators: [
    (Story) => {
      // This decorator is used to wrap the story in a component wrapper
      return (
        <>
          <style>{`.w-full{
            width: 100%;
          }`}</style>
          <ComponentWrapper>
            <Story />
          </ComponentWrapper>
        </>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof MediumSpeciesDistributionChart>;

export const Default: Story = {};
