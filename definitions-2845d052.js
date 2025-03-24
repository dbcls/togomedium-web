import { m as makeApiUrl } from './getData-deef20ca.js';

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
//# sourceMappingURL=definitions-2845d052.js.map
