import { z } from "zod";

const listApiColumnSchema = z.object({
  key: z.string(),
  label: z.string(),
});

export const listApiLinkSchema = z.object({
  href: z.string(),
  label: z.string(),
});

export const createListApiResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    limit: z.number(),
    total: z.number(),
    offset: z.number(),
    contents: z.array(itemSchema),
    columns: z.array(listApiColumnSchema),
  });

export const createListApiParamsSchema = <T extends z.ZodRawShape>(shape: T) =>
  z.object(shape).extend({
    limit: z.number().optional(),
    offset: z.number().optional(),
  });

export type ListApiResponse<T = unknown> = {
  limit: number;
  total: number;
  offset: number;
  contents: T[];
  columns: { key: string; label: string }[];
};

export type ListApiLink = z.infer<typeof listApiLinkSchema>;

export type ListApiParams<T> = T & {
  limit?: number;
  offset?: number;
};

export const nullListResponse: ListApiResponse<never> = {
  total: 0,
  contents: [],
  offset: 0,
  limit: 0,
  columns: [],
};
