import { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  ComponentRowModel,
  ComponentRowSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import { SolutionBlockSelectors } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";
import { createSelector } from "@reduxjs/toolkit";

export const selectSolutionComponentRows = createSelector(
  [
    (_state: AppState, solutionBlockId: string) => solutionBlockId,
    SolutionBlockSelectors.selectEntities,
    ComponentRowSelectors.selectEntities,
  ],
  (solutionBlockId, solutionEntities, componentRowEntities) => {
    const solution = solutionEntities[solutionBlockId];
    if (!solution) {
      return [];
    }

    return solution.components
      .map((componentRowId) => componentRowEntities[componentRowId])
      .filter((row): row is ComponentRowModel => row !== undefined);
  },
);
