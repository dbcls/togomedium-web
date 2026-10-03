import { createCountFixtures } from "./fixtures";

// Fail closed: new API consumers need an explicit fixture, never a live fallback.
export const fetchData = async <T = unknown>(api: string, _body = ""): Promise<T> => {
  const fixture = createCountFixtures().find(({ url }) => url === api);
  if (!fixture) throw new Error(`Missing Storybook API fixture: ${api}`);
  return structuredClone(fixture.data) as T;
};
