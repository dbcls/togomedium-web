import { StanzaView } from "%stanza/stanzas/gmdb-taxon-detail/components/StanzaView";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: StanzaView,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof StanzaView>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    taxid: "315405",
    scientificName: "Streptococcus gallolyticus",
    authorityName: "Streptococcus caprinus Brooker et al. 1996",
    lineage: {
      superkingdom: {
        taxid: "2",
        label: "Bacteria",
      },
      phylum: {
        taxid: "1239",
        label: "Firmicutes",
      },
      class: {
        taxid: "91061",
        label: "Bacilli",
      },
      order: {
        taxid: "186826",
        label: "Lactobacillales",
      },
      family: {
        taxid: "1300",
        label: "Streptococcaceae",
      },
      genus: {
        taxid: "1301",
        label: "Streptococcus",
      },
      species: {
        taxid: "315405",
        label: "Streptococcus gallolyticus",
      },
    },
    typeMaterials: [
      "ACM 3611",
      "CCUG 35224",
      "CIP 105428",
      "DSM 16831",
      "HDP 98035",
      "JCM 10005",
      "LMG 16802",
      "LMG:16802",
      "NCTC 13773",
    ],
    otherTypeMaterials: [
      {
        key: "Streptococcus caprinus",
        labels: ["ACM 3969", "ATCC 700065", "LMG 15572", "LMG:15572", "strain TPC 2.3"],
      },
    ],
  },
} satisfies Story;
