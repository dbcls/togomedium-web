import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ImportDialog } from "./ImportDialog";

const selectedFile = new File(["{}"], "medium-builder-draft.json", {
  type: "application/json",
});

const meta = {
  component: ImportDialog,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
  ],
  args: {
    open: true,
    selectedFile: null,
    onClose: fn(),
    onFileSelect: fn(),
    onImport: fn(),
  },
} satisfies Meta<typeof ImportDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty = {} satisfies Story;

export const FileSelected = {
  args: {
    selectedFile,
  },
} satisfies Story;

export const WithoutImportHandler = {
  args: {
    selectedFile,
    onImport: undefined,
  },
} satisfies Story;
