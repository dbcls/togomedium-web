import { DocumentSelectors } from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import { SolutionBlockSelectors } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";
import { createSelector } from "@reduxjs/toolkit";

export const selectDocumentSolutions = createSelector(
  [DocumentSelectors.selectSolutions, SolutionBlockSelectors.selectEntities],
  (ids, entities) => {
    return ids.map((id) => entities[id]).filter((entity) => entity !== undefined);
  },
);
