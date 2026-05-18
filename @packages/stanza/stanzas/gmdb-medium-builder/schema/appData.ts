import { z } from "zod";

export const GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION = "2026-05-18";

const componentSchema = z.object({
  gmoId: z.string().nullable(),
  component: z.string().nullable(),
  volume: z.number().finite().nullable(),
  unit: z.string().nullable(),
  note: z.string().nullable(),
});
const solutionSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  components: z.array(componentSchema),
});

export const appDataSchema = z.object({
  schemaVersion: z.literal(GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION),
  title: z.string().nullable(),
  description: z.string().nullable(),
  solutions: z.array(solutionSchema),
});

export type GmdbMediumBuilderDraftAppData = z.infer<typeof appDataSchema>;
