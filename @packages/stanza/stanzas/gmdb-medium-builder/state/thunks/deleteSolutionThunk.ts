import { AppDispatch, AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  DocumentActions,
  DocumentSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import { ComponentRowModelActions } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import {
  SolutionBlockModelActions,
  SolutionBlockSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";

export const deleteSolutionThunk = (solutionBlockId: string) => {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    const solutions = DocumentSelectors.selectSolutions(getState());
    const solutionBlock = SolutionBlockSelectors.selectById(getState(), solutionBlockId);

    if (!solutionBlock || solutions.length <= 1) {
      return;
    }

    dispatch(ComponentRowModelActions.removeComponentRows(solutionBlock.components));
    dispatch(SolutionBlockModelActions.removeSolutionBlock(solutionBlockId));
    dispatch(DocumentActions.removeSolution(solutionBlockId));
  };
};
