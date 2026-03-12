import { AppDispatch, AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  SolutionBlockModelActions,
  SolutionBlockSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";

type Direction = "up" | "down";

export const moveComponentRowThunk = (
  solutionBlockId: string,
  componentRowId: string,
  direction: Direction,
) => {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    const solutionBlock = SolutionBlockSelectors.selectById(getState(), solutionBlockId);

    if (!solutionBlock) {
      return;
    }

    const currentIndex = solutionBlock.components.indexOf(componentRowId);
    if (currentIndex < 0) {
      return;
    }

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= solutionBlock.components.length) {
      return;
    }

    const nextComponents = [...solutionBlock.components];
    const currentValue = nextComponents[currentIndex];
    const targetValue = nextComponents[targetIndex];

    nextComponents[currentIndex] = targetValue;
    nextComponents[targetIndex] = currentValue;

    dispatch(
      SolutionBlockModelActions.updateSolutionBlock({
        id: solutionBlockId,
        changes: {
          components: nextComponents,
        },
      }),
    );
  };
};
