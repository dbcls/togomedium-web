import { HeaderRow } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/HeaderRow";
import { useIsMediaExpandedMutators } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/states/isMediaExpanded";
import { useIsOrganismsExpandedMutators } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/states/isOrganismsExpanded";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps, useEffect } from "react";

type WithCustomArgs = {
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
} & ComponentProps<typeof HeaderRow>;
const meta = {
  component: HeaderRow,
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
        setIsMediaExpanded(isMediaExpanded);
      }, [isMediaExpanded]);
      useEffect(() => {
        setIsOrganismsExpanded(isOrganismsExpanded);
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
  },
} satisfies Story;
