import { c as createListApiResponseSchema, a as createListApiParamsSchema } from './ListApi-bd743e49.js';
import { o as object, s as string } from './makeApiUrl-bc69b05b.js';

const PATH_LIST_MEDIA_OF_TAXONS = "/gmdb_media_by_taxon";
createListApiResponseSchema(object({
    gm_id: string(),
    name: string(),
    // NOTE: TypeSpec documents `original_media_id` but current TS usage does not.
}));
createListApiParamsSchema({
    tax_ids: string(),
});

export { PATH_LIST_MEDIA_OF_TAXONS as P };
//# sourceMappingURL=definitions-09faafc6.js.map
