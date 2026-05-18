import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MediumBuilderImportDialog } from "./MediumBuilderImportDialog";

const selectedFile = new File(["{}"], "medium-builder-draft.json", {
  type: "application/json",
});

const meta = {
  component: MediumBuilderImportDialog,
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
} satisfies Meta<typeof MediumBuilderImportDialog>;

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
