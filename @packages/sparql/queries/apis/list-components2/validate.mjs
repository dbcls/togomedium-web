import { listComponents2ResponseSchema } from "../../../../api/src/listComponents2/definitions.ts";

// Local validation only. Keep this import out of the standalone SPARQList Output.
export const validate = (output) => listComponents2ResponseSchema.parse(output);
