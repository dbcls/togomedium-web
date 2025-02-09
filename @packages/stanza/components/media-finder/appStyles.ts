import { css } from "@emotion/react";
import { COLOR_GRAY_BG, COLOR_WHITE, ROUND_CORNER, SIZE1 } from "%stanza/styles/variables";

/**
 * @deprecated
 */
export const wrapper = css`
  position: relative;
  background-color: ${COLOR_GRAY_BG};
  padding: ${SIZE1};
  height: 100%;
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  gap: ${SIZE1};
`;

/**
 * @deprecated
 */
export const queryPane = css`
  flex-grow: 1;
  overflow-y: auto;
  border-radius: ${ROUND_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
`;

/**
 * @deprecated
 */
export const subPane = css`
  display: flex;
  flex-direction: column;
  max-width: 380px;
  min-width: 380px;
`;
