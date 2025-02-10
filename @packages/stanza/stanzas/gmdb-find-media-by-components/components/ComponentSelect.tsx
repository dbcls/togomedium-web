import { Autocomplete, Chip, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useState } from "react";
import {
  ComponentsWithComponentsResponse,
  componentsWithComponentsURL,
  ComponentWithComponentsRequest,
} from "%api/componentsWithComponents/definitions";
import { getData } from "%core/network/getData";
import { parseLabelInfo } from "%stanza/stanzas/gmdb-find-media-by-components/functions/parseLabelInfo";

type Props = {
  onChangeSelection: (ids: string[]) => void;
};
export const ComponentSelect: FC<Props> = ({ onChangeSelection }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { data, isPending } = useQuery({
    queryKey: ["componentsOfComponents", { selectedIds }],
    queryFn: async () => {
      const gmo_ids = selectedIds.join(",");
      const response = await getData<
        ComponentsWithComponentsResponse,
        ComponentWithComponentsRequest
      >(componentsWithComponentsURL, { gmo_ids });
      if (!response.body) throw new Error("No response body");
      return parseLabelInfo(response.body, selectedIds);
    },
  });

  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      filterOptions={(options, params) => {
        return options.filter((option) => {
          const label = option.label.toLowerCase();
          const japaneseName = option.japaneseName.toLowerCase();
          const filter = params.inputValue.toLowerCase();
          return label.includes(filter) || japaneseName.includes(filter);
        });
      }}
      onChange={(_e, v) => {
        const ids = v.map((v) => v.id);
        setSelectedIds(ids);
        onChangeSelection(ids);
      }}
      disablePortal={true}
      options={data || []}
      loading={isPending}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Components"
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            {...getTagProps({ index })}
            label={option.label}
            key={option.id}
          />
        ))
      }
    />
  );
};
