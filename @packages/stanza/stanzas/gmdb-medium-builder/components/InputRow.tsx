import {
  ComponentsWithComponentsResponse,
  componentsWithComponentsURL,
  ComponentWithComponentsParams,
} from "%api/componentsWithComponents/definitions";
import { fetchAllComponents } from "%core/fetch/fetchAllComponents";
import { getData } from "%core/network/getData";
import { parseLabelInfo } from "%stanza/stanzas/gmdb-find-media-by-components/functions/parseLabelInfo";
import { TableRow } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
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
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["allComponents"],
    queryFn: fetchAllComponents,
    placeholderData: [],
  });
  const components = (data ?? []).map((c) => ({ label: c.name }));
  return (
    <TableRow>
      <div></div>
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
