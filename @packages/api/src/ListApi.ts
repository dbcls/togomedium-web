export type ListApiResponse<T> = {
  limit: number;
  total: number;
  offset: number;
  contents: T[];
};

export type ListApiParams<T> = T & {
  limit?: number;
  offset?: number;
};

export const nullListResponse: ListApiResponse<any> = {
  total: 0,
  contents: [],
  offset: 0,
  limit: 0,
};
