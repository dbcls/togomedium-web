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
      paragraph_index: 2,
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
      paragraph_index: 3,
      comment: "Keep this comment out of the builder state in v1.",
    },
  ],
} satisfies MediumDetailResponse;
