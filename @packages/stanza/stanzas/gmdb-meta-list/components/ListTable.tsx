import { styled } from "@mui/material/styles";
import { nanoid } from "nanoid";
import React, { FC } from "react";
import { makeLinkPath } from "%core/network/makeLinkPath";
import { decodeHTMLEntities } from "%core/string/decodeHtmlEntities";
import { ListApiBody } from "%stanza/stanzas/gmdb-meta-list/types";
import { THEME } from "%stanza/styles/theme";

type Props = {
  data: ListApiBody;
  showColumnNames: boolean;
  columnSizes: number[];
  limit: number;
};

export const ListTable: FC<Props> = ({ data, columnSizes, showColumnNames, limit }) => {
  const extraRows = Array(Math.max(0, limit - data.contents.length))
    .fill(null)
    .map(() => nanoid());
  return (
    <Wrapper>
      {showColumnNames && (
        <thead>
          <tr>
            {data.columns.map((column, index) => {
              const size = columnSizes[index];
              const isSizeEnabled = !!size && data.columns.length === columnSizes.length;
              return (
                <th
                  style={isSizeEnabled ? { width: `${size}%` } : {}}
                  key={column.key}
                >
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
      )}
      <tbody>
        {data.contents.map((row, i) => (
          <tr key={i}>
            {data.columns.map((column) => {
              const key = column.key;
              const item = row[key];
              const noWrap: boolean = !!column.nowrap;
              return (
                <td
                  key={key}
                  style={noWrap ? { whiteSpace: "nowrap" } : {}}
                >
                  <CellContent item={item} />
                </td>
              );
            })}
          </tr>
        ))}
        {extraRows.map((rowId) => (
          <tr key={rowId}>
            {data.columns.map((column) => {
              const key = column.key;
              return <td key={key}>-</td>;
            })}
          </tr>
        ))}
      </tbody>
    </Wrapper>
  );
};

type CellContentProps = { item: ListApiBody["contents"][0][0] };
const CellContent: FC<CellContentProps> = ({ item }) => {
  if (typeof item === "string") {
    return <>{decodeHTMLEntities(item)}</>;
  }
  if (typeof item === "number") {
    return <>{item}</>;
  }
  return (
    <a
      href={makeLinkPath(item.href)}
      target={"_blank"}
      rel="noreferrer"
    >
      {decodeHTMLEntities(item.label)}
    </a>
  );
};

const Wrapper = styled("table")({
  border: "1px solid #ccc",
  width: "100%",
  fontSize: "16px",
  borderCollapse: "collapse",
  "& td, & th": {
    padding: "6px 8px",
    borderBottom: "1px solid #ccc",
    textAlign: "left",
    lineHeight: 1.2,
  },
  "& tr:nth-of-type(2n)": {
    backgroundColor: "#f6f6f6",
  },
  "& a": {
    color: THEME.COLOR.PRIMARY_DARK,
    textDecoration: "none",
  },
});
