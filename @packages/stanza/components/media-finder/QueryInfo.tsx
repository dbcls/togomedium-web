import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { useQueryDataState } from "../../state/media-finder/queryData";
import { queryDataToInfoText } from "../../utils/queryDataToInfoText";
import { THEME } from "%stanza/styles/theme";

type Props = {};

export const QueryInfo: FC<Props> = () => {
  const queryData = useQueryDataState();

  return (
    <Wrapper>
      <p>Queried with:</p>
      <p>{queryDataToInfoText(queryData)}</p>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  borderRadius: THEME.ROUND.BASE,
  borderColor: THEME.COLOR.GRAY_LINE,
  borderStyle: "dashed",
  borderWidth: 2,
  padding: THEME.SIZE.S1,
  "& > p:first-of-type": {
    fontWeight: THEME.FONT_WEIGHT.BOLD,
    marginBottom: THEME.SIZE.S05,
  },
});
