import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import React, { ChangeEvent, FC, useEffect, useState } from "react";

type Mark = any;

type Props = {
  min: number;
  max: number;
  label: string;
  marks: Mark[];
  queryKey: string;
  handleEnabledChange: (key: string, enabled: boolean) => void;
  handleValueChange: (key: string, value: string) => void;
};

function valuetext(value: number) {
  return `${value}°C`;
}

export const RangeSlider: FC<Props> = ({
  min,
  max,
  label,
  marks,
  queryKey,
  handleValueChange,
  handleEnabledChange,
}) => {
  const [value, setValue] = useState<number[]>([min, max]);
  const [enabled, setEnabled] = useState(false);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setEnabled(checked);
  };
  const handleChangeCommitted = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    handleValueChange(queryKey, (newValue as number[]).join(","));
  };

  useEffect(() => {
    if (enabled) {
      handleValueChange(queryKey, value.join(","));
    } else {
      handleEnabledChange(queryKey, false);
    }
  }, [enabled]);
  return (
    <div>
      <div>
        <span>
          <FormControlLabel
            label={label}
            control={
              <Checkbox
                onChange={handleCheckChange}
                sx={{ paddingLeft: 0 }}
              />
            }
          />
        </span>
      </div>
      <Slider
        value={value}
        onChange={handleSliderChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={min}
        max={max}
        marks={marks}
        step={0.1}
        disabled={enabled ? undefined : true}
      />
    </div>
  );
};
