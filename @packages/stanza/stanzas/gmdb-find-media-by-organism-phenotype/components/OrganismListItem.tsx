import { css } from "@emotion/react";
import Checkbox from "@mui/material/Checkbox";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { PATH_TAXON } from "../../../shared/components/consts";
import {
  COLOR_GRAY_LINE,
  COLOR_PRIMARY,
  COLOR_WHITE,
  SIZE1,
  SIZE2,
} from "../../../shared/styles/variables";
import { LabelInfo } from "../../../shared/utils/labelInfo";

type Props = {
  isChecked: boolean;
  onClick: (info: LabelInfo) => void;
} & LabelInfo &
  AcceptsEmotion;

export const OrganismListItem: FC<Props> = ({ css, className, id, label, isChecked, onClick }) => {
  return (
    <div
      css={[organismListItem, css]}
      className={className}
    >
      <div css={listInner}>
        <span css={labelCol}>{label}</span>
        <a
          css={idCol}
          href={`${PATH_TAXON}${id}`}
          target="_blank"
          rel="noreferrer"
        >
          [tax_id:{id}]
        </a>
      </div>
      <span css={checkCol}>
        <Checkbox
          checked={isChecked}
          onClick={() => onClick({ id, label })}
        />
      </span>
    </div>
  );
};

const organismListItem = css`
  & + & {
    border-top: none;
  }
  display: flex;
  justify-content: space-between;
  background-color: ${COLOR_WHITE};
  border: 1px solid ${COLOR_GRAY_LINE};
  padding: 0 ${SIZE1};
  align-items: center;
`;

const listInner = css`
  display: flex;
  gap: ${SIZE2};
  flex-shrink: 0;
  flex-grow: 0;
  width: calc(100% - 40px);
`;

const idCol = css`
  flex-shrink: 0;
  flex-grow: 0;
  width: 100px;
  color: ${COLOR_PRIMARY};
  text-decoration: none;
`;
const labelCol = css`
  flex-grow: 0;
  flex-shrink: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const checkCol = css`
  flex-shrink: 0;
  flex-grow: 0;
`;
