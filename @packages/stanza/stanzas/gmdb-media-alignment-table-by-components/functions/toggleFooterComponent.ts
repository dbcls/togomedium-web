import { clone } from "../../../utils/clone";
import { findBranchFromTrunk } from "../../../utils/findBranchFromTrunk";
import { ComponentTrunk } from "../types";

export const toggleFooterComponent = (
  id: string,
  data: ComponentTrunk,
): ComponentTrunk | undefined => {
  const cloned = clone(data);
  const branch = findBranchFromTrunk(id, cloned);
  if (branch) {
    branch.isOpen = !branch.isOpen;
    return cloned;
  } else {
    return undefined;
  }
};
