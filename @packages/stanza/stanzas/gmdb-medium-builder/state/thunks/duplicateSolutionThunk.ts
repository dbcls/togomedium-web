import { AppDispatch, AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  DocumentActions,
  DocumentSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import {
  ComponentRowModelActions,
  ComponentRowSelectors,
  createBlankComponentRow,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import {
  createBlankSolutionBlock,
  SolutionBlockModelActions,
  SolutionBlockSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";

export const duplicateSolutionThunk = (solutionBlockId: string) => {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    const state = getState();
    const solutions = DocumentSelectors.selectSolutions(state);
    const solutionBlock = SolutionBlockSelectors.selectById(state, solutionBlockId);

    if (!solutionBlock) {
      return;
    }

    const currentIndex = solutions.indexOf(solutionBlockId);
    if (currentIndex < 0) {
      return;
    }

    const duplicatedComponentRows = solutionBlock.components
      .map((componentRowId) => ComponentRowSelectors.selectById(state, componentRowId))
      .filter((componentRow) => componentRow !== undefined)
      .map((componentRow) =>
        createBlankComponentRow({
          gmoId: componentRow.gmoId,
          component: componentRow.component,
          volume: componentRow.volume,
          unit: componentRow.unit,
          note: componentRow.note,
        }),
      );
    const duplicatedSolutionBlock = createBlankSolutionBlock({
      title: solutionBlock.title,
      description: solutionBlock.description,
      components: duplicatedComponentRows.map((componentRow) => componentRow.id),
    });
    const nextSolutions = [...solutions];

    nextSolutions.splice(currentIndex + 1, 0, duplicatedSolutionBlock.id);

    duplicatedComponentRows.forEach((componentRow) => {
      dispatch(ComponentRowModelActions.addComponentRow(componentRow));
    });
    dispatch(SolutionBlockModelActions.addSolutionBlock(duplicatedSolutionBlock));
    dispatch(DocumentActions.setSolutions(nextSolutions));
  };
};
