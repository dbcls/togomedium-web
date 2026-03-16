import { AppDispatch, AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  ComponentRowModelActions,
  ComponentRowSelectors,
  createBlankComponentRow,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import {
  SolutionBlockModelActions,
  SolutionBlockSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";

export const duplicateComponentRowThunk = (solutionBlockId: string, componentRowId: string) => {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    const state = getState();
    const solutionBlock = SolutionBlockSelectors.selectById(state, solutionBlockId);
    const componentRow = ComponentRowSelectors.selectById(state, componentRowId);

    if (!solutionBlock || !componentRow) {
      return;
    }

    const currentIndex = solutionBlock.components.indexOf(componentRowId);
    if (currentIndex < 0) {
      return;
    }

    const duplicatedComponentRow = createBlankComponentRow({
      component: componentRow.component,
      volume: componentRow.volume,
      unit: componentRow.unit,
      note: componentRow.note,
    });
    const nextComponents = [...solutionBlock.components];

    nextComponents.splice(currentIndex + 1, 0, duplicatedComponentRow.id);

    dispatch(ComponentRowModelActions.addComponentRow(duplicatedComponentRow));
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
