import { Autocomplete, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useMemo } from "react";
import { useDebounceValue } from "usehooks-ts";
import {
  TaxonomySearchByNameParams,
  TaxonomySearchByNameResponse,
  taxonomySearchByNameURL,
} from "%api/taxonomySearchByName/definitions";
import { getData } from "%core/network/getData";
import { THEME } from "%stanza/styles/theme";

type Props = {};

const useTaxonChildrenSearch = () => {
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["taxon_children", debouncedValue],
    queryFn: async () => {
      if (debouncedValue.length <= 3) return [];
      const response = await getData<TaxonomySearchByNameResponse, TaxonomySearchByNameParams>(
        taxonomySearchByNameURL,
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

export const TaxonInput: FC<Props> = () => {
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
              <TagTip>{option.rank}</TagTip>
              <TaxId>[tax_id:{option.tax_id}]</TaxId>
              <span>{option.name}</span>
            </Box>
          </li>
        );
      }}
      noOptionsText={optionsText}
    ></Autocomplete>
  );
};

const TagTip = styled("div")({
  fontSize: 12,
  backgroundColor: THEME.COLOR.GRAY400,
  color: THEME.COLOR.WHITE,
  borderRadius: THEME.ROUND.BASE,
  paddingBlock: 4,
  paddingInline: 6,
});

const TaxId = styled("span")({
  fontSize: 13,
});
