import { VerticalEllipsisIcon } from "%stanza/components/icons/VerticalEllipsisIcon";
import { InputRow } from "%stanza/stanzas/gmdb-medium-builder/components/InputRow";
import { Block, TableRow } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";

type Props = {};

export const InputBlock: FC<Props> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Block>
      <TitleRow>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size={"small"}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <VerticalEllipsisIcon sx={{ fill: "black", width: "16px" }} />
          </IconButton>
          <Menu
            id="basic-menu"
            disablePortal
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem onClick={handleClose}>Delete Block</MenuItem>
            <MenuItem onClick={handleClose}>Move Block up</MenuItem>
            <MenuItem onClick={handleClose}>Move Block down</MenuItem>
          </Menu>
        </div>
        <div style={{ gridColumn: "span 4" }}>
          <TextField sx={{ width: "100%" }} placeholder={"Solution name"} size={"small"} />
        </div>
      </TitleRow>
      <ComponentTable>
        <TableRow>
          <div></div>
          <div>Component</div>
          <div>Volume</div>
          <div>Unit</div>
          <div>Note</div>
        </TableRow>
        <ComponentTableBody>
          <InputRow />
          <InputRow />
        </ComponentTableBody>
        <ComponentTableFooter>
          <Button
            variant={"contained"}
            size={"small"}
            disableElevation={true}
            sx={{ textTransform: "none" }}
          >
            Add component row
          </Button>
        </ComponentTableFooter>
      </ComponentTable>
    </Block>
  );
};

const ComponentTable = styled("div")({
  display: "grid",
  gridColumn: "span 5",
  gridTemplateColumns: "subgrid",
  rowGap: "0px",
});
const ComponentTableBody = styled("div")({
  display: "grid",
  gridTemplateColumns: "subgrid",
  gridColumn: "span 5",
  rowGap: "10px",
});
const ComponentTableFooter = styled("div")({
  // display: "grid",
  // gridTemplateColumns: "subgrid",
  display: "flex",
  justifyContent: "flex-end",
  gridColumn: "span 5",
  paddingTop: "10px",
});

const TitleRow = styled("div")({
  display: "grid",
  gridColumn: "span 5",
  gridTemplateColumns: "subgrid",
});
