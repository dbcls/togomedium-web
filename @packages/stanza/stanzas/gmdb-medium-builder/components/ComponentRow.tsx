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
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";

type Props = {
  id: string;
  solutionBlockId: string;
};

type ComponentOption = {
  label: string;
  gmoId: string;
};

type UnitOption = {
  label: string;
  value: string;
};

const units: UnitOption[] = [
  {
    label: "mg",
    value: "mg",
  },
  {
    label: "g",
    value: "g",
  },
  {
    label: "ml",
    value: "ml",
  },
  {
    label: "l",
    value: "l",
  },
];

const concentrationUnits: UnitOption[] = [
  {
    label: "mM",
    value: "mM",
  },
  {
    label: "uM",
    value: "uM",
  },
  {
    label: "%",
    value: "%",
  },
  {
    label: "x",
    value: "x",
  },
];

export const ComponentRow: FC<Props> = ({ id, solutionBlockId }) => {
  const componentRow = useAppSelector((state) => ComponentRowSelectors.selectById(state, id));
  const { components, isSuccess } = useComponentsData();
  const {
    handleChangeComponent,
    handleInputComponent,
    handleChangeVolume,
    handleChangeUnit,
    handleInputUnit,
    handleChangeConcentrationValue,
    handleChangeConcentrationUnit,
    handleInputConcentrationUnit,
    handleChangeNote,
  } = useInputHandlers(id);
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
    <ComponentTableRow>
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
      <ComponentInputCell>
        <GmoIdLabel>{componentRow.gmoId || "No GMO ID"}</GmoIdLabel>
        <Autocomplete
          freeSolo
          size={"small"}
          disablePortal
          disabled={!isSuccess}
          options={components}
          sx={{ width: 300, flex: "0 0 auto" }}
          inputValue={componentRow.component}
          value={components.find((component) => component.gmoId === componentRow.gmoId) ?? null}
          getOptionLabel={(option) => (typeof option === "string" ? option : option.label)}
          isOptionEqualToValue={(option, value) =>
            typeof value === "string" ? option.label === value : option.gmoId === value.gmoId
          }
          onChange={handleChangeComponent}
          onInputChange={handleInputComponent}
          renderInput={(params) => (
            <TextField
              {...params}
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  "aria-label": "Component",
                },
              }}
            />
          )}
        />
      </ComponentInputCell>
      <div>
        <TextField
          size={"small"}
          value={formatNullableNumberInput(componentRow.volume)}
          onChange={handleChangeVolume}
          slotProps={{
            htmlInput: {
              "aria-label": "Volume",
            },
          }}
        />
      </div>
      <div>
        <Autocomplete<UnitOption, false, false, true>
          freeSolo
          size={"small"}
          disablePortal
          options={units}
          // sx={{ width: 110 }}
          inputValue={componentRow.unit}
          value={componentRow.unit}
          onChange={handleChangeUnit}
          onInputChange={handleInputUnit}
          getOptionLabel={getUnitOptionLabel}
          renderInput={(params) => (
            <TextField
              {...params}
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  "aria-label": "Unit",
                },
              }}
            />
          )}
        />
      </div>
      <div>
        <TextField
          size={"small"}
          value={formatNullableNumberInput(componentRow.concentrationValue ?? null)}
          onChange={handleChangeConcentrationValue}
          slotProps={{
            htmlInput: {
              "aria-label": "Concentration",
            },
          }}
        />
      </div>
      <div>
        <Autocomplete<UnitOption, false, false, true>
          freeSolo
          size={"small"}
          disablePortal
          options={concentrationUnits}
          inputValue={componentRow.concentrationUnit ?? ""}
          value={componentRow.concentrationUnit ?? ""}
          onChange={handleChangeConcentrationUnit}
          onInputChange={handleInputConcentrationUnit}
          getOptionLabel={getUnitOptionLabel}
          renderInput={(params) => (
            <TextField
              {...params}
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  "aria-label": "Concentration unit",
                },
              }}
            />
          )}
        />
      </div>
      <div>
        <TextField
          sx={{ width: "100%" }}
          size={"small"}
          value={componentRow.note}
          onChange={handleChangeNote}
          slotProps={{
            htmlInput: {
              "aria-label": "Component note",
            },
          }}
        />
      </div>
    </ComponentTableRow>
  );
};

const useComponentsData = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["allComponents"],
    queryFn: fetchAllComponents,
    placeholderData: [],
  });
  const components = (data ?? []).map((c) => ({ label: c.name, gmoId: c.gmo_id }));
  return { components, isSuccess };
};

const useInputHandlers = (id: string) => {
  const dispatch = useAppDispatch();
  const handleChangeComponent = (
    _event: React.SyntheticEvent,
    value: ComponentOption | string | null,
  ) => {
    const component = typeof value === "string" ? value : (value?.label ?? "");
    const gmoId = typeof value === "string" ? "" : (value?.gmoId ?? "");
    dispatch(
      ComponentRowModelActions.updateComponentRow({
        id,
        changes: {
          gmoId,
          component,
        },
      }),
    );
  };

  const handleInputComponent = (_event: React.SyntheticEvent, value: string, reason: string) => {
    if (reason === "reset") {
      return;
    }
    dispatch(
      ComponentRowModelActions.updateComponentRow({
        id,
        changes: {
          gmoId: "",
          component: value,
        },
      }),
    );
  };

  const handleChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = parseNullableNumberInput(event.target.value);
    dispatch(
      ComponentRowModelActions.updateComponentRow({
        id,
        changes: {
          volume: Number.isNaN(nextVolume) ? 0 : nextVolume,
        },
      }),
    );
  };

  const handleChangeUnit = (_event: React.SyntheticEvent, value: UnitOption | string | null) => {
    updateUnit(getUnitValue(value));
  };

  const handleInputUnit = (_event: React.SyntheticEvent, value: string, reason: string) => {
    if (reason === "reset") {
      return;
    }
    updateUnit(value);
  };

  const updateUnit = (unit: string) => {
    dispatch(
      ComponentRowModelActions.updateComponentRow({
        id,
        changes: {
          unit,
        },
      }),
    );
  };

  const handleChangeConcentrationValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextConcentrationValue = parseNullableNumberInput(event.target.value);
    dispatch(
      ComponentRowModelActions.updateComponentRow({
        id,
        changes: {
          concentrationValue: nextConcentrationValue,
        },
      }),
    );
  };

  const handleChangeConcentrationUnit = (
    _event: React.SyntheticEvent,
    value: UnitOption | string | null,
  ) => {
    updateConcentrationUnit(getUnitValue(value));
  };

  const handleInputConcentrationUnit = (
    _event: React.SyntheticEvent,
    value: string,
    reason: string,
  ) => {
    if (reason === "reset") {
      return;
    }
    updateConcentrationUnit(value);
  };

  const updateConcentrationUnit = (concentrationUnit: string) => {
    dispatch(
      ComponentRowModelActions.updateComponentRow({
        id,
        changes: {
          concentrationUnit,
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

  return {
    handleChangeComponent,
    handleInputComponent,
    handleChangeVolume,
    handleChangeUnit,
    handleInputUnit,
    handleChangeConcentrationValue,
    handleChangeConcentrationUnit,
    handleInputConcentrationUnit,
    handleChangeNote,
  };
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

const formatNullableNumberInput = (value: number | null) => (value === null ? "" : String(value));

const parseNullableNumberInput = (value: string) => {
  if (value.trim() === "") {
    return null;
  }
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const getUnitOptionLabel = (option: UnitOption | string) =>
  typeof option === "string" ? option : option.label;

const getUnitValue = (value: UnitOption | string | null) =>
  typeof value === "string" ? value : (value?.value ?? "");

const ComponentTableRow = styled(TableRow)({
  gridColumn: "span 7",
});

const ComponentInputCell = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const GmoIdLabel = styled("span")({
  flex: "0 0 76px",
  fontSize: "0.75rem",
  lineHeight: 1.2,
  color: "rgba(0, 0, 0, 0.6)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
