import { AppDispatch, AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  DocumentActions,
  DocumentSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";

type Direction = "up" | "down";

export const moveSolutionThunk = (solutionBlockId: string, direction: Direction) => {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    const solutions = DocumentSelectors.selectSolutions(getState());
    const currentIndex = solutions.indexOf(solutionBlockId);

    if (currentIndex < 0) {
      return;
    }

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= solutions.length) {
      return;
    }

    const nextSolutions = [...solutions];
    const currentValue = nextSolutions[currentIndex];
    const targetValue = nextSolutions[targetIndex];

    nextSolutions[currentIndex] = targetValue;
    nextSolutions[targetIndex] = currentValue;

    dispatch(DocumentActions.setSolutions(nextSolutions));
  };
};
