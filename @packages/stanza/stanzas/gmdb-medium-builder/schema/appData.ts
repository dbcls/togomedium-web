import { z } from "zod";

export const DRAFT_SCHEMA_VERSION = "2026-05-18";

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
  schemaVersion: z.literal(DRAFT_SCHEMA_VERSION),
  title: z.string().nullable(),
  description: z.string().nullable(),
  solutions: z.array(solutionSchema),
});

export type DraftAppData = z.infer<typeof appDataSchema>;
