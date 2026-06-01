import { o as object, s as string, n as number, a as array } from './makeApiUrl-bc69b05b.js';

const metaSchema = object({
    gm: string(),
    name: string(),
    src_url: string(),
    ph: string(),
    original_media_id: string().optional(),
});
const recipeItemSchema = object({
    paragraph_index: number(),
});
const componentSchema = object({
    component_name: string(),
    volume: number().optional(),
    unit: string().optional(),
    gmo: string().optional(),
    gmo_id: string().optional(),
    label: string().optional(),
    conc_value: number().optional(),
    conc_unit: string().optional(),
    reference_media_id: string().optional(),
});
const componentTableSchema = recipeItemSchema.and(object({
    subcomponent_name: string(),
    items: array(componentSchema),
}));
const componentCommentSchema = recipeItemSchema.and(object({
    comment: string(),
}));
object({
    meta: metaSchema,
    components: array(componentTableSchema),
    comments: array(componentCommentSchema),
});
object({
    gm_id: string(),
});
const PATH_MEDIUM_DETAIL = "/gmdb_medium_by_gmid";

export { PATH_MEDIUM_DETAIL as P };
//# sourceMappingURL=definitions-a767899b.js.map
