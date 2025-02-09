import { Meta, StoryObj } from "@storybook/react";
import { PhenotypeSearchArea } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/PhenotypeSearchArea";

const meta: Meta<typeof PhenotypeSearchArea> = {
  component: PhenotypeSearchArea,
};
export default meta;

type Story = StoryObj<typeof PhenotypeSearchArea>;
export const Primary: Story = {};
