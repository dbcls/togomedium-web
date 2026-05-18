import { AppDispatch, AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { DocumentActions } from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import { ComponentRowModelActions } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import { SolutionBlockModelActions } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";

type ImportedAppState = Pick<AppState, "document" | "entities">;

export const replaceImportedAppStateThunk = (importedState: ImportedAppState) => {
  return (dispatch: AppDispatch) => {
    dispatch(ComponentRowModelActions.replaceComponentRows(importedState.entities.componentRows));
    dispatch(
      SolutionBlockModelActions.replaceSolutionBlocks(importedState.entities.solutionBlocks),
    );
    dispatch(DocumentActions.replaceDocument(importedState.document));
  };
};
