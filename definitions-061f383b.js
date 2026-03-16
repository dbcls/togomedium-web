import { o as object, s as string, a as array, m as makeApiUrl } from './schemas-d468dcf7.js';

const taxonSchema = object({
    id: string(),
    label: string(),
});
const lineageSchema = object({
    superkingdom: taxonSchema.nullable(),
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
/**
 * @deprecated
 */
const mediaStrainsAlignmentURL = makeApiUrl("gmdb_media_strains_alignment_by_gm_ids");
const lineageRanks = [
    "superkingdom",
    "phylum",
    "class",
    "order",
    "family",
    "genus",
    "species",
    "strain",
];

export { lineageRanks as l, mediaStrainsAlignmentURL as m };
//# sourceMappingURL=definitions-061f383b.js.map
