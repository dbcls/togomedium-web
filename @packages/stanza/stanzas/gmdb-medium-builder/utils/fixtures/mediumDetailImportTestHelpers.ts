import type { MediumDetailResponse } from "%api/mediumDetail/definitions";
import {
  mediumDetailImportFixture,
  referencedMediumDetailImportFixture,
} from "%stanza/stanzas/gmdb-medium-builder/utils/fixtures/mediumDetailImport";

type MediumDetailFixtureMap = Record<string, MediumDetailResponse | undefined>;

export type MediumDetailFixtureLoader = (gmId: string) => Promise<MediumDetailResponse>;

export const createMediumDetailFixtureLoader = (
  overrides: MediumDetailFixtureMap = {},
): MediumDetailFixtureLoader => {
  const fixtures: MediumDetailFixtureMap = {
    GM_000001: mediumDetailImportFixture,
    GM_000999: referencedMediumDetailImportFixture,
    ...overrides,
  };

  return async (gmId) => {
    const fixture = fixtures[gmId];

    if (!fixture) {
      throw new Error(`Unexpected medium detail fixture request: ${gmId}`);
    }

    return cloneMediumDetailResponse(fixture);
  };
};

export const cloneMediumDetailResponse = (response: MediumDetailResponse): MediumDetailResponse => {
  return structuredClone(response);
};
