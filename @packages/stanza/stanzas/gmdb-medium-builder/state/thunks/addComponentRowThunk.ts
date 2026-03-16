import { AppDispatch, AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  ComponentRowModelActions,
  createBlankComponentRow,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import {
  SolutionBlockModelActions,
  SolutionBlockSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";

export const addComponentRowThunk = (solutionBlockId: string) => {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    const componentRow = createBlankComponentRow();
    const solutionBlock = SolutionBlockSelectors.selectById(getState(), solutionBlockId);

    if (!solutionBlock) {
      return;
    }

    dispatch(ComponentRowModelActions.addComponentRow(componentRow));
    dispatch(
      SolutionBlockModelActions.updateSolutionBlock({
        id: solutionBlockId,
        changes: {
          components: [...solutionBlock.components, componentRow.id],
        },
      }),
    );
  };
};
