import { css } from "@emotion/react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useMemo } from "react";
import { useDebounceValue } from "usehooks-ts";
import { AcceptsEmotion } from "yohak-tools";
import { API_TAXON_BY_NAME } from "../../../api/paths";
import { TaxonomyQueryResponse } from "../../../api/taxonomy_children/types";
import { COLOR_GRAY400, COLOR_WHITE } from "../../../styles/variables";
import { getData } from "../../../utils/getData";

type Props = {} & AcceptsEmotion;

type Opts = {
  tax_id: string;
  name: string;
  rank: string;
}[];

const useTaxonChildrenSearch = () => {
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["taxon_children", debouncedValue],
    queryFn: async () => {
      if (debouncedValue.length <= 3) return [];
      const response = await getData<TaxonomyQueryResponse, { q: string; max: number }>(
        API_TAXON_BY_NAME,
        { q: debouncedValue, max: 100 }
      );
      return response.body ?? [];
    },
    staleTime: Infinity,
    placeholderData: [],
  });

  const optionsText = useMemo(() => {
    switch (true) {
      case debouncedValue.length <= 3:
        return "Type at least 4 characters";
      case isFetching:
        return "Loading...";
      case isError:
        return "Error fetching data";
      case !data?.length:
        return "No results found";
      default:
        return "";
    }
  }, [isFetching, debouncedValue, data, isError]);

  const options = data ?? [];

  return { options, setValue, optionsText };
};

export const TaxonInput: FC<Props> = ({ css, className }) => {
  const { options, setValue, optionsText } = useTaxonChildrenSearch();
  return (
    <Autocomplete
      options={options}
      disablePortal={true}
      filterOptions={(options, params) => options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search taxon by name"
        />
      )}
      onInputChange={(e, v) => {
        setValue(v);
      }}
      renderTags={() => null}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li
            key={key}
            {...optionProps}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
              <span css={tagTip}>{option.rank}</span>
              <span css={taxId}>[tax_id:{option.tax_id}]</span>
              <span>{option.name}</span>
            </Box>
          </li>
        );
      }}
      noOptionsText={optionsText}
    ></Autocomplete>
  );
};

const taxonInput = css``;
const tagTip = css`
  font-size: 12px;
  background-color: ${COLOR_GRAY400};
  color: ${COLOR_WHITE};
  padding: 4px 6px;
  border-radius: 5px;
`;

const taxId = css`
  font-size: 13px;
`;
