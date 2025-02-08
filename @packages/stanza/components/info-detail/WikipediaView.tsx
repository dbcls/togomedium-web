import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { COLOR_GRAY300, COLOR_PRIMARY } from "%stanza/styles/variables";
import { WikipediaData } from "%stanza/utils/fetchWikipediaData";

export const WikipediaView: FC<WikipediaData> = ({ thumb, description, link }) => (
  <WikipediaInfo>
    <p>
      {thumb && (
        <img
          src={thumb}
          alt={""}
        />
      )}
      {description}
    </p>
    <cite>
      <a
        href={link}
        target={"_blank"}
        rel="noreferrer"
      >
        From Wikipedia
      </a>
    </cite>
  </WikipediaInfo>
);

const WikipediaInfo = styled("div")({
  marginTop: 32,
  width: 336,
  border: `1px ${COLOR_GRAY300} dashed`,
  padding: 8,
  borderRadius: 5,
  height: "fit-content",
  lineHeight: 1.3,
  "& cite": {
    display: "block",
    textAlign: "right",
    marginTop: 8,
    "& a": {
      color: COLOR_PRIMARY,
    },
  },
});
