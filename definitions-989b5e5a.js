import { o as object, s as string, a as array, m as makeApiUrl } from './schemas-d468dcf7.js';

const componentWithComponentsItemSchema = object({
    gmo_id: string(),
    name: string(),
    japanese_name: string(),
});
array(componentWithComponentsItemSchema);
object({
    gmo_ids: string().optional(),
});
/**
 * @deprecated
 */
const componentsWithComponentsURL = makeApiUrl("gmdb_components_with_components");
const PATH_COMPONENTS_WITH_COMPONENTS = "gmdb_components_with_components";

export { PATH_COMPONENTS_WITH_COMPONENTS as P, componentsWithComponentsURL as c };
//# sourceMappingURL=definitions-989b5e5a.js.map
