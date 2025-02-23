import { Autocomplete, Chip, FormControl, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import React, { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { THEME } from "%stanza/styles/theme";

type Props = {
  label: string;
  queryKey: string;
  items: [string, string][];
  handleEnabledChange: (key: string, enabled: boolean) => void;
  handleValueChange: (key: string, value: string) => void;
};

export const SelectBox: FC<Props> = ({
  label,
  items,
  queryKey,
  handleEnabledChange,
  handleValueChange,
}) => {
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);

  const handleSelectChange = (event: SyntheticEvent, value: [string, string] | null) => {
    if (value) {
      const [key, label] = value;
      setValue(key);
    } else {
      setValue("");
    }
  };
  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setEnabled(checked);
    setValue("");
  };
  useEffect(() => {
    if (enabled && value !== "") {
      handleValueChange(queryKey, value);
    } else {
      handleEnabledChange(queryKey, false);
    }
  }, [value, enabled]);

  return (
    <Wrapper>
      <Checkbox
        onChange={handleCheckChange}
        sx={{ paddingLeft: 0 }}
      />
      <FormControl sx={{ m: 0, minWidth: 200 }}>
        <Autocomplete
          filterSelectedOptions
          onChange={handleSelectChange}
          disablePortal={true}
          disableClearable={true}
          options={items}
          disabled={enabled ? undefined : true}
          getOptionLabel={(item) => item[1]}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                {...getTagProps({ index })}
                label={option[1]}
                key={option[0]}
              />
            ))
          }
        />
      </FormControl>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: THEME.COLOR.WHITE,
  width: "fit-content",
  marginLeft: "-11px",
});
