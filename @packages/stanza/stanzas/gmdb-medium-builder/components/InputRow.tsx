import { fetchAllComponents } from "%core/fetch/fetchAllComponents";
import { VerticalEllipsisIcon } from "%stanza/components/icons/VerticalEllipsisIcon";
import { TableRow } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { useAppDispatch, useAppSelector } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  ComponentRowModelActions,
  ComponentRowSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import { deleteComponentRowThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/deleteComponentRowThunk";
import { Autocomplete, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";

type Props = {
  id: string;
  solutionBlockId: string;
};

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

export const InputRow: FC<Props> = ({ id, solutionBlockId }) => {
  const dispatch = useAppDispatch();
  const componentRow = useAppSelector((state) => ComponentRowSelectors.selectById(state, id));
  const { data, isSuccess } = useQuery({
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

  if (!componentRow) {
    return null;
  }

  const handleChangeComponent = (_event: React.SyntheticEvent, value: { label: string } | null) => {
    dispatch(
      ComponentRowModelActions.updateComponentRow({
        id,
        changes: {
          component: value?.label ?? "",
        },
      }),
    );
  };

  const handleChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = event.target.value === "" ? 0 : Number(event.target.value);
    dispatch(
      ComponentRowModelActions.updateComponentRow({
        id,
        changes: {
          volume: Number.isNaN(nextVolume) ? 0 : nextVolume,
        },
      }),
    );
  };

  const handleChangeUnit = (
    _event: React.SyntheticEvent,
    value: { label: string; value: string } | null,
  ) => {
    dispatch(
      ComponentRowModelActions.updateComponentRow({
        id,
        changes: {
          unit: value?.value ?? "",
        },
      }),
    );
  };

  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      ComponentRowModelActions.updateComponentRow({
        id,
        changes: {
          note: event.target.value,
        },
      }),
    );
  };

  const handleClickDeleteRow = () => {
    dispatch(deleteComponentRowThunk(solutionBlockId, id));
    handleClose();
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
          <MenuItem onClick={handleClickDeleteRow}>Delete row</MenuItem>
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
          value={components.find((component) => component.label === componentRow.component) ?? null}
          onChange={handleChangeComponent}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div>
        <TextField
          sx={{ width: 80 }}
          size={"small"}
          value={componentRow.volume}
          onChange={handleChangeVolume}
        />
      </div>
      <div>
        <Autocomplete
          size={"small"}
          disablePortal
          options={units}
          sx={{ width: 80 }}
          value={units.find((unit) => unit.value === componentRow.unit) ?? null}
          onChange={handleChangeUnit}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div>
        <TextField
          sx={{ width: "100%" }}
          size={"small"}
          value={componentRow.note}
          onChange={handleChangeNote}
        />
      </div>
    </TableRow>
  );
};
