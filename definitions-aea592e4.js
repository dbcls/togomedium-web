import { o as object, s as string, a as array } from './makeApiUrl-bc69b05b.js';

const taxonSchema = object({
    id: string(),
    label: string(),
});
const lineageSchema = object({
    domain: taxonSchema.nullable(),
    phylum: taxonSchema.nullable(),
    class: taxonSchema.nullable(),
    order: taxonSchema.nullable(),
    family: taxonSchema.nullable(),
    genus: taxonSchema.nullable(),
    species: taxonSchema.nullable(),
    strain: taxonSchema.nullable(),
});
const mediaStrainsAlignmentItemSchema = object({
    gm_id: string(),
    label: string(),
    organisms: array(lineageSchema),
});
array(mediaStrainsAlignmentItemSchema);
object({
    gm_ids: string(),
});
const PATH_MEDIA_STRAINS_ALIGNMENT = "/gmdb_media_strains_alignment_by_gm_ids";
const lineageRanks = [
    "domain",
    "phylum",
    "class",
    "order",
    "family",
    "genus",
    "species",
    "strain",
];

export { PATH_MEDIA_STRAINS_ALIGNMENT as P, lineageRanks as l };
//# sourceMappingURL=definitions-aea592e4.js.map
