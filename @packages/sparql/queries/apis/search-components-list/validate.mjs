import { searchComponentsListResponseSchema } from "%api/searchComponentsList/definitions";
export const validate = (output) => searchComponentsListResponseSchema.parse(output);
