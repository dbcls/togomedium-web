import { data1 } from "%api/mediaStrainsAlignment/data1";
import { data2 } from "%api/mediaStrainsAlignment/data2";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppContainer } from "./AppContainer";

const meta = {
  component: AppContainer,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
} satisfies Meta<typeof AppContainer>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: { data: data1 },
} satisfies Story;
export const WithNull = {
  args: { data: data2 },
} satisfies Story;

export const NotFound = { args: { data: [] } } satisfies Story;
