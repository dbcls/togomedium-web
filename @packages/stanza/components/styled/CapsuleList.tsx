import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { THEME } from "%core/theme";

export const CapsuleList: FC<{ labels: string[] }> = ({ labels }) => (
  <CapsuleListWrapper>
    {labels.map((label, index) => (
      <li key={index}>{label}</li>
    ))}
  </CapsuleListWrapper>
);

const CapsuleListWrapper = styled("ul")({
  display: "flex",
  marginTop: THEME.SIZE.S1,
  marginBottom: -THEME.SIZE.S1,
  flexWrap: "wrap",

  li: {
    border: `1px solid ${THEME.STANZA_COLOR.PRIMARY}`,
    padding: `${THEME.SIZE.S05}px ${THEME.SIZE.S1 * 1.25}px`,
    borderRadius: THEME.ROUND.BASE * 4,
    marginRight: THEME.SIZE.S1,
    marginBottom: THEME.SIZE.S1,
  },
});
