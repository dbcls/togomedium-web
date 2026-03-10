import { TableRow } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { Autocomplete, TextField } from "@mui/material";
import React, { FC } from "react";

type Props = {};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];
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
  return (
    <TableRow>
      <div></div>
      <div>
        <Autocomplete
          size={"small"}
          disablePortal
          options={top100Films}
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
