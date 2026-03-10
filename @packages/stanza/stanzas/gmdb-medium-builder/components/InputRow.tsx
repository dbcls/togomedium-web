import { fetchAllComponents } from "%core/fetch/fetchAllComponents";
import { VerticalEllipsisIcon } from "%stanza/components/icons/VerticalEllipsisIcon";
import { TableRow } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { Autocomplete, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";

type Props = {};

const units = [
  {
    label: "mg",
    value: "mg",
  },
  {
    label: "g",
    value: "g",
  },
  {
    label: "L",
    value: "l",
  },
];

export const InputRow: FC<Props> = () => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["allComponents"],
    queryFn: fetchAllComponents,
    placeholderData: [],
  });
  const components = (data ?? []).map((c) => ({ label: c.name }));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <TableRow>
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
          <MenuItem onClick={handleClose}>Delete row</MenuItem>
          <MenuItem onClick={handleClose}>Move row up</MenuItem>
          <MenuItem onClick={handleClose}>Move row down</MenuItem>
        </Menu>
      </div>
      <div>
        <Autocomplete
          size={"small"}
          disablePortal
          disabled={!isSuccess}
          options={components}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div>
        <TextField sx={{ width: 80 }} size={"small"} />
      </div>
      <div>
        <Autocomplete
          size={"small"}
          disablePortal
          options={units}
          sx={{ width: 80 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div>
        <TextField sx={{ width: "100%" }} size={"small"} />
      </div>
    </TableRow>
  );
};
