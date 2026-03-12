import { AppDispatch } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { DocumentActions } from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import {
  ComponentRowModelActions,
  createBlankComponentRow,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import {
  createBlankSolutionBlock,
  SolutionBlockModelActions,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";

export const addSolutionThunk = () => {
  return (dispatch: AppDispatch) => {
    const componentRow = createBlankComponentRow();
    const block = createBlankSolutionBlock({
      components: [componentRow.id],
    });

    dispatch(ComponentRowModelActions.addComponentRow(componentRow));
    dispatch(SolutionBlockModelActions.addSolutionBlock(block));
    dispatch(DocumentActions.addSolution(block.id));
  };
};
