import { listComponents2ResponseSchema } from "%api/listComponents2/definitions";

// Local validation only. Keep this import out of the standalone SPARQList Output.
export const validate = (output) => listComponents2ResponseSchema.parse(output);
