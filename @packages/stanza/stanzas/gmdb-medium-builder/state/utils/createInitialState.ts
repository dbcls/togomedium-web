import { createBlankComponentRow } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import { createBlankSolutionBlock } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";

export const createInitialState = () => {
  const componentRow = createBlankComponentRow();
  const solutionBlock = createBlankSolutionBlock({
    components: [componentRow.id],
  });

  return {
    entities: {
      componentRows: {
        ids: [componentRow.id],
        entities: {
          [componentRow.id]: componentRow,
        },
      },
      solutionBlocks: {
        ids: [solutionBlock.id],
        entities: {
          [solutionBlock.id]: solutionBlock,
        },
      },
    },
    document: {
      title: "",
      description: "",
      solutions: [solutionBlock.id],
    },
  };
};
