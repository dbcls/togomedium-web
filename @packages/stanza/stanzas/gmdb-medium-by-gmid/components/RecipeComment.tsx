import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { decodeHTMLEntities } from "%core/string/decodeHtmlEntities";

type Props = {
  index: number;
  comment: string;
};

export const RecipeComment: FC<Props> = ({ comment }) => {
  return <Wrapper>{parseText(comment)}</Wrapper>;
};

const Wrapper = styled("div")({
  margin: "4px 0",
});

const parseText = (str: string) => {
  return decodeHTMLEntities(str.replace(/℃/g, "°C"));
};
