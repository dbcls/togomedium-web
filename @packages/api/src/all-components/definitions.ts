import { makeApiUrl } from "%core/network/makeApiUrl";

export type AllComponentsResponse = {
  gmo_id: string;
  name: string;
  japanese_name: string;
}[];

export const AllComponentsURL = makeApiUrl("all-components");

// export const
