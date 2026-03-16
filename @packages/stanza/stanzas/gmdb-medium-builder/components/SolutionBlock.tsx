import { VerticalEllipsisIcon } from "%stanza/components/icons/VerticalEllipsisIcon";
import { ComponentRow } from "%stanza/stanzas/gmdb-medium-builder/components/ComponentRow";
import { Block, TableRow } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { useAppDispatch, useAppSelector } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { selectSolutionComponentRows } from "%stanza/stanzas/gmdb-medium-builder/state/selectors/selectSolutionComponentRows";
import { DocumentSelectors } from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import {
  SolutionBlockModelActions,
  SolutionBlockSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";
import { addComponentRowThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/addComponentRowThunk";
import { deleteSolutionThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/deleteSolutionThunk";
import { duplicateSolutionThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/duplicateSolutionThunk";
import { moveSolutionThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/moveSolutionThunk";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";

type Props = { id: string };

export const SolutionBlock: FC<Props> = ({ id }) => {
  const solution = useAppSelector((state) => SolutionBlockSelectors.selectById(state, id));
  const componentRows = useAppSelector((state) => selectSolutionComponentRows(state, id));
  const { handleClickAddComponentRow, handleChangeTitle } = useInputHandlers(id);
  const {
    anchorEl,
    open,
    handleClose,
    handleClick,
    handleClickDeleteBlock,
    handleClickDuplicateBlock,
    handleClickMoveBlockUp,
    handleClickMoveBlockDown,
    disableDelete,
    disableMoveBlockUp,
    disableMoveBlockDown,
  } = useMenu(id);

  if (!solution) {
    return null;
  }

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
            <MenuItem onClick={handleClickDuplicateBlock}>Duplicate Block</MenuItem>
            <MenuItem onClick={handleClickDeleteBlock} disabled={disableDelete}>
              Delete Block
            </MenuItem>
            <MenuItem onClick={handleClickMoveBlockUp} disabled={disableMoveBlockUp}>
              Move Block up
            </MenuItem>
            <MenuItem onClick={handleClickMoveBlockDown} disabled={disableMoveBlockDown}>
              Move Block down
            </MenuItem>
          </Menu>
        </div>
        <div style={{ gridColumn: "span 4" }}>
          <TextField
            sx={{ width: "100%" }}
            placeholder={"Solution name"}
            size={"small"}
            value={solution.title}
            onChange={handleChangeTitle}
          />
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
          {componentRows.map((componentRow) => (
            <ComponentRow key={componentRow.id} id={componentRow.id} solutionBlockId={id} />
          ))}
        </ComponentTableBody>
        <ComponentTableFooter>
          <Button
            variant={"contained"}
            size={"small"}
            disableElevation={true}
            sx={{ textTransform: "none" }}
            onClick={handleClickAddComponentRow}
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

const useInputHandlers = (id: string) => {
  const dispatch = useAppDispatch();

  const handleClickAddComponentRow = () => {
    dispatch(addComponentRowThunk(id));
  };
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      SolutionBlockModelActions.updateSolutionBlock({
        id,
        changes: {
          title: event.target.value,
        },
      }),
    );
  };

  return {
    handleClickAddComponentRow,
    handleChangeTitle,
  };
};

const useMenu = (id: string) => {
  const dispatch = useAppDispatch();
  const solutionIds = useAppSelector(DocumentSelectors.selectSolutions);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const solutionIndex = solutionIds.indexOf(id);
  const disableDelete = solutionIds.length <= 1;
  const disableMoveBlockUp = solutionIndex <= 0;
  const disableMoveBlockDown = solutionIndex < 0 || solutionIndex >= solutionIds.length - 1;

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickDeleteBlock = () => {
    dispatch(deleteSolutionThunk(id));
    handleClose();
  };
  const handleClickDuplicateBlock = () => {
    dispatch(duplicateSolutionThunk(id));
    handleClose();
  };
  const handleClickMoveBlockUp = () => {
    dispatch(moveSolutionThunk(id, "up"));
    handleClose();
  };
  const handleClickMoveBlockDown = () => {
    dispatch(moveSolutionThunk(id, "down"));
    handleClose();
  };

  return {
    anchorEl,
    open,
    handleClose,
    handleClick,
    handleClickDeleteBlock,
    handleClickDuplicateBlock,
    handleClickMoveBlockUp,
    handleClickMoveBlockDown,
    disableDelete,
    disableMoveBlockUp,
    disableMoveBlockDown,
  };
};
