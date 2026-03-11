import { FooterRow } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/FooterRow";
import { useIsMediaExpandedMutators } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/states/isMediaExpanded";
import { useIsOrganismsExpandedMutators } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/states/isOrganismsExpanded";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps, useEffect } from "react";

type WithCustomArgs = {
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
} & ComponentProps<typeof FooterRow>;
const meta = {
  component: FooterRow,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
    (StoryItem, { args }) => {
      const { isMediaExpanded, isOrganismsExpanded } = args;
      const { setIsMediaExpanded } = useIsMediaExpandedMutators();
      const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
      useEffect(() => {
        setIsMediaExpanded(args.isMediaExpanded);
      }, [isMediaExpanded]);
      useEffect(() => {
        setIsOrganismsExpanded(args.isOrganismsExpanded);
      }, [isOrganismsExpanded]);
      return <StoryItem />;
    },
  ],
} satisfies Meta<WithCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    isMediaExpanded: false,
    isOrganismsExpanded: false,
    components: [
      {
        id: "ID of Distilled Water",
        level: 0,
        label: "Distilled Water",
        hasChildren: false,
        isOpen: false,
      },
      {
        id: "ID of Ager",
        level: 0,
        label: "Ager",
        hasChildren: true,
        isOpen: false,
      },
    ],
  },
} satisfies Story;
