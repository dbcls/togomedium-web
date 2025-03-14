import { Badge, SxProps, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { THEME } from "%core/theme";
import {
  MediaTabName,
  mediaTabNames,
  useMediaTabFocusMutators,
  useMediaTabFocusState,
} from "%stanza/state/media-finder/mediaTabFocus";
import { useSelectedMediaState } from "%stanza/state/media-finder/selectedMedia";

type Props = {};

export const MediaTab: FC<Props> = () => {
  const tabFocus = useMediaTabFocusState();
  const { setMediaTabFocus } = useMediaTabFocusMutators();
  const selected = useSelectedMediaState();
  const handleChange = (event: React.SyntheticEvent, newValue: MediaTabName) => {
    setMediaTabFocus(newValue);
  };
  return (
    <Wrapper>
      <Tabs
        value={tabFocus}
        onChange={handleChange}
      >
        {mediaTabNames.map((label) => {
          if (label === "Selected media") {
            return (
              <Tab
                key={label}
                label={
                  <Badge
                    badgeContent={selected.length}
                    color="primary"
                  >
                    {label}
                  </Badge>
                }
                value={label}
                sx={tabStyles}
              />
            );
          }
          return (
            <Tab
              key={label}
              label={label}
              value={label}
              sx={tabStyles}
            />
          );
        })}
      </Tabs>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  width: "100%",
  borderBottom: `1px solid ${THEME.COLOR.GRAY_LINE}`,
  "& > *": {
    position: "relative",
    top: "1px",
  },
});

const tabStyles: SxProps = {
  textTransform: "none",
};
