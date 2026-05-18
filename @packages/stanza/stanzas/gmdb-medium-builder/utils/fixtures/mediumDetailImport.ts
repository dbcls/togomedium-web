import type { MediumDetailResponse } from "%api/mediumDetail/definitions";

export const mediumDetailImportFixture = {
  meta: {
    gm: "GM_000001",
    name: "Imported NBRC medium",
    src_url: "https://example.org/medium/GM_000001",
    ph: "7.2",
    original_media_id: "NBRC 123",
  },
  components: [
    {
      paragraph_index: 1,
      subcomponent_name: "Main solution",
      items: [
        {
          component_name: "D-Glucose",
          label: "Glucose",
          volume: 10,
          unit: "g/L",
          gmo_id: "GMO_000001",
          conc_value: 55.5,
          conc_unit: "mM",
        },
        {
          component_name: "Yeast extract",
          label: "",
          volume: 2,
          unit: "g/L",
          gmo_id: "GMO_000002",
        },
      ],
    },
    {
      paragraph_index: 3,
      subcomponent_name: "Trace elements",
      items: [
        {
          component_name: "Trace element solution",
          label: "Trace solution",
          volume: 1,
          unit: "mL/L",
          gmo_id: "GMO_000003",
          reference_media_id: "GM_000999",
        },
      ],
    },
  ],
  comments: [
    {
      paragraph_index: 2,
      comment: "Autoclave main solution separately.",
    },
    {
      paragraph_index: 4,
      comment: "Add trace elements after sterilization.",
    },
  ],
} satisfies MediumDetailResponse;

export const referencedMediumDetailImportFixture = {
  meta: {
    gm: "GM_000999",
    name: "Referenced trace elements medium",
    src_url: "https://example.org/medium/GM_000999",
    ph: "",
    original_media_id: "REF 999",
  },
  components: [
    {
      paragraph_index: 1,
      subcomponent_name: "Unrelated solution",
      items: [
        {
          component_name: "Sodium chloride",
          label: "",
          volume: 5,
          unit: "g/L",
          gmo_id: "GMO_000010",
        },
      ],
    },
    {
      paragraph_index: 2,
      subcomponent_name: "Trace element solution",
      items: [
        {
          component_name: "EDTA",
          label: "",
          volume: 0.5,
          unit: "g/L",
          gmo_id: "GMO_000011",
        },
        {
          component_name: "Zinc sulfate",
          label: "ZnSO4",
          volume: 0.1,
          unit: "g/L",
          gmo_id: "GMO_000012",
        },
      ],
    },
  ],
  comments: [
    {
      paragraph_index: 3,
      comment: "Filter-sterilize referenced trace solution.",
    },
  ],
} satisfies MediumDetailResponse;
