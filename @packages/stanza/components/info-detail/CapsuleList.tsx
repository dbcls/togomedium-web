import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { COLOR_PRIMARY } from "%stanza/styles/variables";

export const CapsuleList: FC<{ labels: string[] }> = ({ labels }) => (
  <CapsuleListWrapper>
    {labels.map((label, index) => (
      <li key={index}>{label}</li>
    ))}
  </CapsuleListWrapper>
);

const CapsuleListWrapper = styled("ul")({
  display: "flex",
  marginTop: 8,
  marginBottom: -8,
  flexWrap: "wrap",

  li: {
    border: `1px solid ${COLOR_PRIMARY}`,
    padding: "5px 10px",
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
});
