import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { decodeHTMLEntities } from "%core/string/decodeHtmlEntities";
import { THEME } from "%stanza/styles/theme";

type Props = {
  index: number;
  name: string;
  referenceId?: string;
  items: {
    id: string;
    referenceMediaId: string;
    componentName: string;
    componentLabel: string;
    concValue: string;
    concUnit: string;
    volume: string;
    unit: string;
  }[];
};

export const RecipeTable: FC<Props> = ({ name, items, referenceId }) => {
  return (
    <div>
      <TitleWrapper>
        <h4>{name}</h4>
        {referenceId && (
          <span>
            (See also <a href={`/medium/${referenceId}`}>{referenceId}</a>)
          </span>
        )}
      </TitleWrapper>
      <Table>
        <thead>
          <tr>
            <th className="id">GMO ID</th>
            <th className="name">Component</th>
            <th className="name">Original label</th>
            <th className="volume">&nbsp;</th>
            <th className="volume">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={index}>
                <td className="id">
                  <a
                    href={`/component/${item.id}`}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    {item.id}
                  </a>
                </td>
                <td className="name">{decodeHTMLEntities(item.componentLabel)}</td>
                <td className="name">
                  <span>{item.componentName.replace(/\(see.*\)/, "(see below)")}</span>
                </td>
                <td className="volume">
                  <span>{item.concValue}</span>
                  <span>{item.concUnit}</span>
                </td>
                <td className="volume">
                  <span>{item.volume}</span>
                  <span>{item.unit}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

const TitleWrapper = styled("div")({
  marginTop: 16,
  display: "flex",
  gap: 16,
  span: {
    paddingTop: 2,
  },
  a: {
    color: THEME.COLOR.PRIMARY_DARK,
  },

  h4: {
    fontSize: 18,
  },
});
const Table = styled("table")({
  width: "100%",
  borderCollapse: "collapse",
  margin: "4px 0 16px",
  border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
  a: {
    color: THEME.COLOR.PRIMARY_DARK,
  },
  th: {
    border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
    padding: 8,
    textAlign: "left",
  },
  td: {
    border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
    padding: 8,
    textAlign: "left",
  },
  tbody: {
    tr: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#f2f2f2",
      },
    },
  },
  ".id": {
    width: "10%",
    whiteSpace: "nowrap",
  },
  ".name": {
    width: "35%",
  },
  ".volume": {
    width: "10%",
    whiteSpace: "nowrap",
    span: {
      display: "inline-block",
      "&:first-of-type": {
        width: "60%",
        textAlign: "right",
        boxSizing: "border-box",
        paddingRight: 4,
      },
      "&:last-of-type": {
        width: "40%",
      },
    },
  },
});
