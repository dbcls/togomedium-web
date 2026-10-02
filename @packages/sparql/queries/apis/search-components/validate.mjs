import { searchComponentsResponseSchema } from "%api/searchComponents/definitions";

// Local only; do not include in standalone SPARQList Output.
export const validate = (output) => searchComponentsResponseSchema.parse(output);
