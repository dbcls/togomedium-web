import { Badge, SxProps, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { THEME } from "%core/theme";
import {
  OrganismTabName,
  organismTabNames,
  useOrganismTabFocusMutators,
  useOrganismTabFocusState,
} from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/organismTabFocus";
import { useSelectedOrganismsState } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/selectedOrganisms";

type Props = {};

export const OrganismTab: FC<Props> = () => {
  const tabFocus = useOrganismTabFocusState();
  const { setOrganismTabFocus } = useOrganismTabFocusMutators();
  const selected = useSelectedOrganismsState();
  const handleChange = (event: React.SyntheticEvent, newValue: OrganismTabName) => {
    setOrganismTabFocus(newValue);
  };
  return (
    <Wrapper>
      <Tabs
        value={tabFocus}
        onChange={handleChange}
      >
        {organismTabNames.map((label) => {
          if (label === "Selected organisms") {
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
