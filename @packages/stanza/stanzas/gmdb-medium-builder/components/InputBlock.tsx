import { InputRow } from "%stanza/stanzas/gmdb-medium-builder/components/InputRow";
import { Block, TableRow } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";

type Props = {};

export const InputBlock: FC<Props> = () => {
  return (
    <Block>
      <TitleRow>
        <TextField sx={{ width: "100%" }} placeholder={"Solution name"} size={"small"} />
      </TitleRow>
      <ComponentTable>
        <TableRow>
          <div></div>
          <div>Component</div>
          <div>volume</div>
          <div>Unit</div>
          <div>Note</div>
        </TableRow>
        <ComponentTableBody>
          <InputRow />
          <InputRow />
        </ComponentTableBody>
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

const TitleRow = styled("div")({
  gridColumn: "2/6",
});
