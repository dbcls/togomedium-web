import { searchComponentsFacetsResponseSchema } from "%api/searchComponentsFacets/definitions";
export const validate = (output) => searchComponentsFacetsResponseSchema.parse(output);
