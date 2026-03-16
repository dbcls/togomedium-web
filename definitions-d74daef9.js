import { c as createListApiResponseSchema, a as createListApiParamsSchema, l as listApiLinkSchema } from './ListApi-c3bc90be.js';
import { m as makeApiUrl, o as object, s as string } from './schemas-d468dcf7.js';

const listMediaOfTaxonsURL = makeApiUrl("gmdb_media_by_taxon");
const listMediaOfGtdbTaxonsURL = makeApiUrl("gmdb_media_by_gtdb_taxon");
createListApiResponseSchema(object({
    gm_id: string(),
    name: string(),
    // NOTE: TypeSpec documents `original_media_id` but current TS usage does not.
}));
createListApiParamsSchema({
    tax_ids: string(),
});
createListApiResponseSchema(object({
    name: string(),
    original_media_id: string(),
    media_id: listApiLinkSchema,
}));
createListApiParamsSchema({
    tax_id: string(),
});

export { listMediaOfGtdbTaxonsURL as a, listMediaOfTaxonsURL as l };
//# sourceMappingURL=definitions-d74daef9.js.map
