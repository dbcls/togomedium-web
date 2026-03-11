import { PATH_MEDIUM, PATH_TAXON } from "%core/consts";
import { InfoCell } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/InfoCell";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: InfoCell,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof InfoCell>;
export default meta;

type Story = StoryObj<typeof meta>;
export const MediumCompact = {
  args: {
    expanded: false,
    info: [{ id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" }],
    linkBase: PATH_MEDIUM,
  },
} satisfies Story;
export const MediumExpanded = {
  args: {
    expanded: true,
    info: [{ id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" }],
    linkBase: PATH_MEDIUM,
  },
} satisfies Story;
export const OrganismsCompact = {
  args: {
    expanded: false,
    info: [
      { id: "384676", label: "Pseudomonas entomophila L48" },
      { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
      { id: "169489", label: "Malassezia dermatis" },
    ],
    linkBase: PATH_TAXON,
  },
} satisfies Story;
export const OrganismsCompactWithPriority = {
  args: {
    expanded: false,
    info: [
      { id: "384676", label: "Pseudomonas entomophila L48" },
      { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
      { id: "169489", label: "Malassezia dermatis" },
    ],
    priority: ["169489", "643561"],
    linkBase: PATH_TAXON,
  },
} satisfies Story;
export const OrganismsCompactWithPriority2 = {
  args: {
    expanded: false,
    info: [
      { id: "384676", label: "Pseudomonas entomophila L48" },
      { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
      { id: "169489", label: "Malassezia dermatis" },
    ],
    priority: ["abc", "bbb", "ddd"],
    linkBase: PATH_TAXON,
  },
} satisfies Story;
export const OrganismsExpanded = {
  args: {
    expanded: true,
    info: [
      { id: "384676", label: "Pseudomonas entomophila L48" },
      { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
      { id: "169489", label: "Malassezia dermatis" },
    ],
    linkBase: PATH_TAXON,
  },
} satisfies Story;
export const OrganismsExpandedWithPriority = {
  args: {
    expanded: true,
    info: [
      { id: "384676", label: "Pseudomonas entomophila L48" },
      { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
      { id: "169489", label: "Malassezia dermatis" },
    ],
    linkBase: PATH_TAXON,
    priority: ["169489", "643561"],
  },
} satisfies Story;
