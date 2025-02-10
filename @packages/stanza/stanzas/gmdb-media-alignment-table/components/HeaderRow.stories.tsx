import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useEffect } from "react";
import { HeaderRow } from "%stanza/stanzas/gmdb-media-alignment-table/components/HeaderRow";
import { useIsMediaExpandedMutators } from "%stanza/stanzas/gmdb-media-alignment-table/states/isMediaExpanded";
import { useIsOrganismsExpandedMutators } from "%stanza/stanzas/gmdb-media-alignment-table/states/isOrganismsExpanded";

type WithCustomArgs = {
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
} & ComponentProps<typeof HeaderRow>;
const meta: Meta<WithCustomArgs> = {
  component: HeaderRow,
  decorators: [
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
};
export default meta;

type Story = StoryObj<WithCustomArgs>;
export const Primary: Story = {
  args: {
    isMediaExpanded: false,
    isOrganismsExpanded: false,
  },
};
