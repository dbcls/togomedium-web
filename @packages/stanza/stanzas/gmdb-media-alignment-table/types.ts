import { Nullable } from "yohak-tools";
import { MediaComponentAlignmentTableResponse } from "%api/mediaComponentAlignment/definitions";
import { TreeBranch } from "%stanza/utils/types";

export type ComponentTrunk = ComponentBranch[];
export type ComponentBranch = {
  parent: Nullable<string>;
  isOpen: boolean;
  func: Nullable<string>;
} & TreeBranch;
export type RawComponent = MediaComponentAlignmentTableResponse["components"][0];
export type RawMedium = MediaComponentAlignmentTableResponse["media"][0];
export type RawOrganism = MediaComponentAlignmentTableResponse["organisms"][0];
