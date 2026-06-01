import { o as object, s as string, a as array } from './makeApiUrl-bc69b05b.js';

const componentWithComponentsItemSchema = object({
    gmo_id: string(),
    name: string(),
    japanese_name: string(),
});
array(componentWithComponentsItemSchema);
object({
    gmo_ids: string().optional(),
});
const PATH_COMPONENTS_WITH_COMPONENTS = "/gmdb_components_with_components";

export { PATH_COMPONENTS_WITH_COMPONENTS as P };
//# sourceMappingURL=definitions-a04f4463.js.map
