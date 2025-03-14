import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { THEME } from "%core/theme";
import {
  useSelectedMediaMutators,
  useSelectedMediaState,
} from "%stanza/state/media-finder/selectedMedia";

type Props = { actionLabel: string; dispatchEvent: (gmIds: string[]) => void };

export const ActionPane: FC<Props> = ({ actionLabel, dispatchEvent }) => {
  const selectedMedia = useSelectedMediaState();
  const { clearSelectedMedia } = useSelectedMediaMutators();
  const onClickAction = () => {
    if (!dispatchEvent) return;
    dispatchEvent(selectedMedia.map((item) => item.id));
  };
  return (
    <Wrapper>
      <p className={"info"}>{getInfoText(selectedMedia.length)}</p>
      <ButtonWrapper>
        <Button
          variant="contained"
          disableElevation={true}
          disabled={selectedMedia.length === 0}
          sx={{ textTransform: "none" }}
          onClick={onClickAction}
        >
          {actionLabel}
        </Button>
        <Button
          variant="outlined"
          onClick={clearSelectedMedia}
          sx={{ textTransform: "none" }}
        >
          Clear selection
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const getInfoText = (mediaLength: number): string => {
  if (mediaLength === 0) {
    return "No media selected";
  } else if (mediaLength === 1) {
    return "1 medium selected";
  } else {
    return `${mediaLength} media selected`;
  }
};

const Wrapper = styled("div")({
  borderRadius: THEME.ROUND.BASE,
  backgroundColor: THEME.COLOR.WHITE,
  paddingBlock: THEME.SIZE.S1,
  paddingInline: THEME.SIZE.S2,
  "& p.info": {
    marginBottom: THEME.SIZE.S05,
    fontSize: 18,
    fontWeight: THEME.FONT_WEIGHT.MEDIUM,
  },
});

const ButtonWrapper = styled("div")({
  display: "flex",
  gap: THEME.SIZE.S1,

  "& > *": {
    flexGrow: 1,
    flexBasis: 0,
  },
});
