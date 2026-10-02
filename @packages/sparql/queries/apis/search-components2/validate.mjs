import { searchComponents2ResponseSchema } from "%api/searchComponents2/definitions";
export const validate = (output) => searchComponents2ResponseSchema.parse(output);
