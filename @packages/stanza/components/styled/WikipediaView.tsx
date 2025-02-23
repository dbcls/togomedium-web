import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { THEME } from "%stanza/styles/theme";
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
  border: `1px ${THEME.COLOR.GRAY300} dashed`,
  padding: 8,
  borderRadius: 5,
  height: "fit-content",
  lineHeight: 1.3,
  "& cite": {
    display: "block",
    textAlign: "right",
    marginTop: 8,
    "& a": {
      color: THEME.STANZA_COLOR.PRIMARY_DARK,
    },
  },
});
