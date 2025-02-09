import { Meta, StoryObj } from "@storybook/react";
import { PhenotypeSection } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/PhenotypeSection";

const meta: Meta<typeof PhenotypeSection> = {
  component: PhenotypeSection,
};
export default meta;

type Story = StoryObj<typeof PhenotypeSection>;
export const Primary: Story = {};
