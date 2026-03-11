import { data1 } from "%api/listMedia/data1";
import { StanzaWrapper } from "%stanza/components/styled/StanzaWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ListTable } from "./ListTable";
import { LoadingCover } from "./LoadingCover";

const meta = {
  component: LoadingCover,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <StanzaWrapper>
        <div style={{ position: "relative" }}>
          <ListTable data={data1} showColumnNames={true} columnSizes={[]} limit={20} />
          <Story />
        </div>
      </StanzaWrapper>
    ),
  ],
} satisfies Meta<typeof LoadingCover>;
export default meta;

type Story = StoryObj<typeof meta>;
const defaultArgs: Story["args"] = {
  showLoading: true,
  errorMessage: "",
};
export const Primary = {
  args: {
    ...defaultArgs,
  },
} satisfies Story;
export const ErrorMessage = {
  args: {
    ...defaultArgs,
    errorMessage: "Internal Server Error",
  },
} satisfies Story;
export const Hidden = {
  args: {
    ...defaultArgs,
    showLoading: false,
  },
} satisfies Story;
