import App from "%stanza/stanzas/gmdb-medium-builder/App";
import { appStore } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { PageWrapper } from "%storybook/components/PageWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

const meta = {
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui redux={appStore}>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <PageWrapper>
        <Story />
      </PageWrapper>
    ),
  ],
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Result1 = {
  args: {},
} satisfies Story;

export const ImportedFromRealApiM1470 = {
  args: {
    sourceGmId: "M1470",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(
      async () => {
        await expect(canvas.getByDisplayValue("(Unnamed medium)")).toBeInTheDocument();
      },
      { timeout: 15000 },
    );

    await expect(
      canvas.getByDisplayValue(/GM ID: http:\/\/togomedium\.org\/medium\/M1470/),
    ).toBeInTheDocument();
  },
} satisfies Story;
