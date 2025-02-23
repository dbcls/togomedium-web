import {
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
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
  // const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setEnabled(checked);
    if (!checked) {
      setSelectedValue("");
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (enabled && selectedValue !== "") {
      handleValueChange(queryKey, selectedValue);
    } else {
      handleEnabledChange(queryKey, false);
    }
  }, [selectedValue, enabled]);

  return (
    <Wrapper>
      <Checkbox
        onChange={handleCheckChange}
        sx={{ paddingLeft: 0 }}
      />
      <FormControl sx={{ m: 0, minWidth: 200 }}>
        <InputLabel id={"selectLabel"}>{label}</InputLabel>
        <Select
          labelId={"selectLabel"}
          label={label}
          value={selectedValue}
          disabled={enabled ? undefined : true}
          onChange={handleSelectChange}
          MenuProps={{ disablePortal: true }}
        >
          {items.map(([key, label]) => (
            <MenuItem
              key={key}
              value={key}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  // backgroundColor: THEME.COLOR.WHITE,
  width: "fit-content",
  marginLeft: "-11px",
});
