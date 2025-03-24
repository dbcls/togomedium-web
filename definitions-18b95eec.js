import { m as makeApiUrl } from './getData-1442ae18.js';

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
//# sourceMappingURL=definitions-18b95eec.js.map
