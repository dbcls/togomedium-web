import { css } from "@emotion/react";
import React, { FC } from "react";
import { AlignmentTable } from "./AlignmentTable";
import { HeaderRow } from "./HeaderRow";
import { InfoColumns } from "./InfoColumns";
import { MediaAlignmentTableResponse } from "../../../api/media-alignment-table/types";
import { COLOR_GRAY_LINE } from "../../../shared/styles/variables";

type Props = { data: MediaAlignmentTableResponse; prioritizedOrganism?: string[] };

export const ScrollableTable: FC<Props> = ({ data, prioritizedOrganism = [] }) => {
  return (
    <div css={wrapper}>
      <HeaderRow css={header} />
      <InfoColumns
        data={data}
        prioritizedOrganism={prioritizedOrganism}
        css={infoColumns}
      />
      <div className="inner">
        <AlignmentTable
          data={data}
          prioritizedOrganism={prioritizedOrganism}
        />
      </div>
    </div>
  );
};

const wrapper = css`
  position: relative;
  overflow: hidden;
  background-color: ${COLOR_GRAY_LINE};
  & > .inner {
    overflow-x: auto;
  }
`;
const header = css`
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${COLOR_GRAY_LINE};
  background-color: ${COLOR_GRAY_LINE};
`;
const infoColumns = css`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`;
