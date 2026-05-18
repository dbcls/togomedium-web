import { z } from "zod";

const componentSchema = z.object({
  gmoId: z.string().nullable(),
  component: z.string().nullable(),
  volume: z.number().nullable(),
  unit: z.string().nullable(),
  note: z.string().nullable(),
});
const solutionSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  components: z.array(componentSchema),
});

export const appDataSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  solutions: z.array(solutionSchema),
});
