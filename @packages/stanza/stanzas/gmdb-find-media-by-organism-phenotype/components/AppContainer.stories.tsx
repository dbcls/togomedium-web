import { Meta, StoryObj } from "@storybook/react";
import { AppContainer } from "./AppContainer";

const meta: Meta<typeof AppContainer> = {
  component: AppContainer,
  // parameters: {
  //   msw: makeMswParameter([
  //     ...mediaByAttributesMocks,
  //     ...mediaByTaxonMocks,
  //     ...organismsByPhenotypesMocks,
  //   ]),
  // },
};
export default meta;

type Story = StoryObj<typeof AppContainer>;
export const Primary: Story = {};
