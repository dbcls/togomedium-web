import { css } from "@emotion/react";
import { Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { FC } from "react";
import { COLOR_GRAY_LINE, COLOR_PRIMARY, COLOR_WHITE, SIZE1, SIZE2 } from "../../styles/variables";
import { LabelInfo } from "../../utils/labelInfo";
import { PATH_MEDIUM } from "../consts";

type Props = {
  isChecked: boolean;
  onClick: (info: LabelInfo) => void;
} & LabelInfo;

export type MediaListItemInfo = Omit<Props, "onClick">;

export const MediaListItem: FC<Props> = ({ id, label, isChecked, onClick }) => {
  return (
    <div css={wrapper}>
      <a
        css={idCol}
        href={`${PATH_MEDIUM}${id}`}
        target="_blank"
        rel="noreferrer"
      >
        {id}
      </a>
      <span css={labelCol}>
        <Tooltip
          title={label}
          placement={"top"}
          arrow
        >
          <span>{label}</span>
        </Tooltip>
      </span>
      <span css={checkCol}>
        <Checkbox
          checked={isChecked}
          onClick={() => onClick({ id, label })}
          css={css`
            padding: 5px;
          `}
        />
      </span>
    </div>
  );
};

const wrapper = css`
  & + & {
    border-top: none;
  }
  display: flex;
  background-color: ${COLOR_WHITE};
  border: 1px solid ${COLOR_GRAY_LINE};
  padding: 0 ${SIZE1};
  justify-content: space-between;
  align-items: center;
  gap: ${SIZE2};
`;

const idCol = css`
  flex-shrink: 0;
  flex-grow: 0;
  width: 90px;
  color: ${COLOR_PRIMARY};
  text-decoration: none;
`;
const labelCol = css`
  flex-grow: 1;
  flex-shrink: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const checkCol = css`
  flex-shrink: 0;
`;
