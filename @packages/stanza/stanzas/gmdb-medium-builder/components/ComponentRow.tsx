import { fetchAllComponents } from "%core/fetch/fetchAllComponents";
import { VerticalEllipsisIcon } from "%stanza/components/icons/VerticalEllipsisIcon";
import { TableRow } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { useAppDispatch, useAppSelector } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  ComponentRowModelActions,
  ComponentRowSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import { SolutionBlockSelectors } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";
import { deleteComponentRowThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/deleteComponentRowThunk";
import { duplicateComponentRowThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/duplicateComponentRowThunk";
import { moveComponentRowThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/moveComponentRowThunk";
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

export const ComponentRow: FC<Props> = ({ id, solutionBlockId }) => {
  const componentRow = useAppSelector((state) => ComponentRowSelectors.selectById(state, id));
  const { components, isSuccess } = useComponentsData();
  const { handleChangeComponent, handleChangeVolume, handleChangeUnit, handleChangeNote } =
    useInputHandlers(id);
  const {
    solutionBlock,
    anchorEl,
    open,
    handleClose,
    handleClick,
    handleClickDeleteRow,
    handleClickDuplicateRow,
    handleClickMoveRowUp,
    handleClickMoveRowDown,
    disableDelete,
    disableMoveRowUp,
    disableMoveRowDown,
  } = useMenu(id, solutionBlockId);

  if (!componentRow || !solutionBlock) {
    return null;
  }

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
          <MenuItem onClick={handleClickDuplicateRow}>Duplicate row</MenuItem>
          <MenuItem onClick={handleClickDeleteRow} disabled={disableDelete}>
            Delete row
          </MenuItem>
          <MenuItem onClick={handleClickMoveRowUp} disabled={disableMoveRowUp}>
            Move row up
          </MenuItem>
          <MenuItem onClick={handleClickMoveRowDown} disabled={disableMoveRowDown}>
            Move row down
          </MenuItem>
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

const useComponentsData = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["allComponents"],
    queryFn: fetchAllComponents,
    placeholderData: [],
  });
  const components = (data ?? []).map((c) => ({ label: c.name }));
  return { components, isSuccess };
};

const useInputHandlers = (id: string) => {
  const dispatch = useAppDispatch();
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

  return { handleChangeComponent, handleChangeVolume, handleChangeUnit, handleChangeNote };
};
const useMenu = (id: string, solutionBlockId: string) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const solutionBlock = useAppSelector((state) =>
    SolutionBlockSelectors.selectById(state, solutionBlockId),
  );
  const open = Boolean(anchorEl);
  const componentRowIds = solutionBlock?.components ?? [];
  const componentRowIndex = componentRowIds.indexOf(id);
  const disableDelete = componentRowIds.length <= 1;
  const disableMoveRowUp = componentRowIndex <= 0;
  const disableMoveRowDown =
    componentRowIndex < 0 || componentRowIndex >= componentRowIds.length - 1;
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickDeleteRow = () => {
    dispatch(deleteComponentRowThunk(solutionBlockId, id));
    handleClose();
  };
  const handleClickDuplicateRow = () => {
    dispatch(duplicateComponentRowThunk(solutionBlockId, id));
    handleClose();
  };
  const handleClickMoveRowUp = () => {
    dispatch(moveComponentRowThunk(solutionBlockId, id, "up"));
    handleClose();
  };
  const handleClickMoveRowDown = () => {
    dispatch(moveComponentRowThunk(solutionBlockId, id, "down"));
    handleClose();
  };
  return {
    solutionBlock,
    anchorEl,
    open,
    handleClose,
    handleClick,
    handleClickDeleteRow,
    handleClickDuplicateRow,
    handleClickMoveRowUp,
    handleClickMoveRowDown,
    disableDelete,
    disableMoveRowUp,
    disableMoveRowDown,
  };
};
