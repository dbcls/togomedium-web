import { TreeBranchView } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TreeBranchView";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps } from "react";

const meta = {
  component: TreeBranchView,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof TreeBranchView>;
export default meta;

const defaultArgs: ComponentProps<typeof TreeBranchView> = {
  label: "Archaea",
  id: "2157",
  check: "checked",
  // hasChildren: true,
  linkString: "taxid:2157",
  linkURL: "/",
  isOpen: true,
  // isLoading: false,
  tag: "Phylum",
  toggle: "none",
  toolTipLabel: "Archaea",
  onClickCheck: () => {
    console.log("onClickCheck");
  },
  onToggleChildren: () => {
    console.log("onCLickToggle");
  },
};

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: { ...defaultArgs },
} satisfies Story;
export const Tree = {
  decorators: [
    (Item) => {
      return (
        <TreeBranchView {...defaultArgs}>
          <TreeBranchView {...defaultArgs}></TreeBranchView>
          <TreeBranchView {...defaultArgs} isHighlighted={true}>
            <Item />
          </TreeBranchView>
        </TreeBranchView>
      );
    },
  ],
  args: { ...defaultArgs },
} satisfies Story;
