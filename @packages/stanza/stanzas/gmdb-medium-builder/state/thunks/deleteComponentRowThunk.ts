import { AppDispatch, AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { ComponentRowModelActions } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import {
  SolutionBlockModelActions,
  SolutionBlockSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";

export const deleteComponentRowThunk = (solutionBlockId: string, componentRowId: string) => {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    const solutionBlock = SolutionBlockSelectors.selectById(getState(), solutionBlockId);

    if (!solutionBlock) {
      return;
    }

    dispatch(ComponentRowModelActions.removeComponentRow(componentRowId));
    dispatch(
      SolutionBlockModelActions.updateSolutionBlock({
        id: solutionBlockId,
        changes: {
          components: solutionBlock.components.filter((id) => id !== componentRowId),
        },
      }),
    );
  };
};
