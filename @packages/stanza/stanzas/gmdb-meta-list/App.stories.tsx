import App from "%stanza/stanzas/gmdb-meta-list/App";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

// export default {
//   title: "Stanzas/MetaList",
//   component: App,
// } as ComponentMeta<typeof App>;
//
// const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

const meta = {
  component: App,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Media = {
  args: {
    apiUrl: "https://togomedium.org/sparqlist/api/list_media",
    initialLimit: 20,
    title: "List Media",
    showColumnNames: true,
    columnSizes: [15, 15, 70],
    webFont: "Fira Sans Condensed",
  },
} satisfies Story;
export const Strains = {
  args: {
    apiUrl: "https://togomedium.org/sparqlist/api/list_strains",
    initialLimit: 20,
    title: "List Media",
    showColumnNames: true,
    columnSizes: [15, 15, 70],
    webFont: "Fira Sans Condensed",
  },
} satisfies Story;

export const Components = {
  args: {
    apiUrl: "https://togomedium.org/sparqlist/api/list_components",
    initialLimit: 100,
    title: "List Media",
    showColumnNames: true,
    columnSizes: [15, 15, 70],
    webFont: "Fira Sans Condensed",
  },
} satisfies Story;

export const ChildItems = {
  args: {
    apiUrl: "https://togomedium.org/sparqlist/api/gmdb_organism_under_rank_by_taxid?tax_id=293088",
    initialLimit: 10,
    title: "List Media",
    showColumnNames: true,
    columnSizes: [],
    webFont: "Fira Sans Condensed",
  },
} satisfies Story;

export const SimilarMedia = {
  args: {
    apiUrl: "https://togomedium.org/sparqlist/api/gmdb_list_similar_media_by_gmid?gm_id=M1",
    initialLimit: 10,
    title: "List similar media",
    showColumnNames: true,
    columnSizes: [],
    webFont: "Fira Sans Condensed",
  },
} satisfies Story;
