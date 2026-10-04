import type { SearchComponentsListResponse } from "%api/searchComponentsList/definitions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentCard } from "./ComponentCard";

const component = {
  id: "GMO_000001",
  name: "Glucose",
  aliases: ["D-glucose", "Dextrose"],
  matched_names: [],
  medium_count: 1240,
  roles: [{ gmo_id: "GMO_000101", label_en: "Carbon source", parent: null }],
  properties: [{ gmo_id: "GMO_000201", label_en: "Carbohydrate" }],
} satisfies SearchComponentsListResponse["contents"][number];

const meta = {
  title: "ComponentList/ComponentCard",
  component: ComponentCard,
  args: { component },
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-full bg-stone-100 p-4">
        <div className="w-full max-w-4xl">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ComponentCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
export const LongNames = {
  args: {
    component: {
      ...component,
      name: "N-(2-Hydroxyethyl)piperazine-N′-(2-ethanesulfonic acid) sodium salt",
      aliases: [
        "4-(2-Hydroxyethyl)-1-piperazineethanesulfonic acid sodium salt",
        "HEPES sodium salt",
        "UnbrokenNameWithoutSpaces012345678901234567890123456789012345678901234567890123456789",
      ],
    },
  },
} satisfies Story;
export const ManyItems = {
  args: {
    component: {
      ...component,
      aliases: [
        "D-glucose",
        "Dextrose",
        "Grape sugar",
        "D-(+)-Glucose",
        "Glucopyranose",
        "Anhydrous dextrose",
      ],
      roles: [
        "Carbon source",
        "Energy source",
        "Nutrient source",
        "Reducing agent",
        "Osmotic regulator",
      ].map((label, index) => ({ gmo_id: `GMO_00010${index}`, label_en: label, parent: null })),
      properties: [
        "Carbohydrate",
        "Monosaccharide",
        "Water-soluble compound",
        "Organic compound",
      ].map((label, index) => ({ gmo_id: `GMO_00020${index}`, label_en: label })),
    },
  },
} satisfies Story;
export const MissingInformation = {
  args: { component: { ...component, name: "", aliases: [], roles: [], properties: [] } },
} satisfies Story;
export const MissingClassificationLabels = {
  args: {
    component: {
      ...component,
      roles: [{ gmo_id: "GMO_000101", label_en: "", parent: null }],
      properties: [{ gmo_id: "GMO_000201", label_en: "" }],
    },
  },
} satisfies Story;
export const Narrow = {
  ...LongNames,
  decorators: [
    (Story) => (
      <div className="w-72 max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Story;
export const SingleColumn = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ComponentCard component={component} />
      <ComponentCard
        component={{
          ...component,
          id: "GMO_000002",
          name: "Sodium chloride",
          aliases: ["NaCl", "Common salt"],
          medium_count: 1,
          roles: [],
          properties: [],
        }}
      />
      <ComponentCard
        component={{
          ...component,
          id: "GMO_000003",
          name: "Bacto &trade; Yeast extract",
          aliases: ["Yeast &#8482; extract"],
          medium_count: 0,
        }}
      />
    </div>
  ),
} satisfies Story;
