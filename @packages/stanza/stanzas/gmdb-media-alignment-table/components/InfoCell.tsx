import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC, useMemo } from "react";
import { WIDTH_COMPACT, WIDTH_EXPANDED } from "%stanza/stanzas/gmdb-media-alignment-table/consts";
import { THEME } from "%stanza/styles/theme";
import { LabelInfo } from "%stanza/utils/labelInfo";

type Props = {
  info: LabelInfo[];
  linkBase: string;
  expanded: boolean;
  priority?: string[];
};

export const InfoCell: FC<Props> = ({ info, linkBase, expanded, priority = [] }) => {
  return expanded ? (
    <Expanded {...{ info: sortInfo(info, priority), linkBase, priority }} />
  ) : (
    <Compact {...{ info: sortInfo(info, priority), linkBase, priority }} />
  );
};

const sortInfo = (info: LabelInfo[], priority: string[]): LabelInfo[] => {
  return [
    ...priority.map((id) => info.find((item) => item.id === id)!).filter((item) => !!item),
    ...info.filter((item) => !priority.includes(item.id)),
  ];
};

const Compact: FC<Omit<Props, "expanded">> = ({ info, linkBase, priority = [] }) => {
  const myPriorityItems: string[] = useMemo(
    () => info.map((item) => item.id).filter((str) => priority.includes(str)),
    [info, priority]
  );
  const items = useMemo(
    () => (myPriorityItems.length ? info.filter((item) => priority.includes(item.id)) : [info[0]]),
    [myPriorityItems, info]
  );
  const restText = useMemo(() => {
    const remain = myPriorityItems.length ? info.length - myPriorityItems.length : info.length - 1;
    switch (remain) {
      case 0:
        return "";
      case 1:
        return ` + ${remain} organism`;
      default:
        return ` + ${remain} organisms`;
    }
  }, [myPriorityItems, info]);
  return (
    <Wrapper className="compact">
      <div className="inner">
        <div className="text">
          {items.map((item, index) => (
            <span key={index}>
              {item.id ? (
                <Tooltip
                  title={item.label}
                  placement={"top"}
                  arrow
                  slotProps={{ popper: { disablePortal: true } }}
                >
                  <a
                    href={`${linkBase}${item.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.id}
                  </a>
                </Tooltip>
              ) : (
                <>{item.label}</>
              )}
              {index < items.length - 1 ? ", " : ""}
            </span>
          ))}
          <span style={{ whiteSpace: "nowrap" }}>{restText}</span>
        </div>
      </div>
    </Wrapper>
  );
};

const Expanded: FC<Omit<Props, "expanded">> = ({ info, linkBase, priority = [] }) => {
  return (
    <Wrapper className="expanded">
      <div className="inner">
        {[
          ...info.filter((item) => priority.includes(item.id)),
          ...info.filter((item) => !priority.includes(item.id)),
        ].map((item) => (
          <div
            key={item.id}
            className="text"
          >
            <a
              href={`${linkBase}${item.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {item.id}
            </a>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  fontSize: "14px",
  backgroundColor: THEME.COLOR.WHITE,
  boxSizing: "border-box",
  padding: THEME.SIZE.S1,
  display: "block",
  minHeight: "40px",
  "& .inner": {
    paddingTop: "4px",
  },
  "& a": {
    color: THEME.COLOR.PRIMARY,
    textDecoration: "none",
  },
  "&.compact": {
    width: WIDTH_COMPACT,
    "& .inner": {
      display: "flex",
      flexWrap: "wrap",
    },
    "& .text": {
      marginRight: THEME.SIZE.S1,
    },
  },
  "&.expanded": {
    width: WIDTH_EXPANDED,
    "& .text": {
      display: "flex",
      flexDirection: "column",
      "& + .text": {
        marginTop: THEME.SIZE.S1,
      },
    },
  },
});
