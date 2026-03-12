import { AppDispatch } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { DocumentActions } from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import {
  createBlankSolutionBlock,
  SolutionBlockModelActions,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";

export const addSolutionThunk = () => {
  return (dispatch: AppDispatch) => {
    const block = createBlankSolutionBlock();
    dispatch(SolutionBlockModelActions.addSolutionBlock(block));
    dispatch(DocumentActions.addSolution(block.id));
  };
};
