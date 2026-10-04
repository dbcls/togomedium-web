import { ListBox, Select } from "@heroui/react";
import clsx from "clsx";
import type { FC } from "react";
import {
  listSelectIndicatorClasses,
  listSelectItemClasses,
  listSelectLabelClasses,
  listSelectTriggerClasses,
  listSelectValueClasses,
} from "./listSelectStyles";

export type ListSelectOption = { id: string; label: string };

type Props = {
  label: string;
  options: readonly ListSelectOption[];
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  className?: string;
};

export const ListSelect: FC<Props> = ({
  label,
  options,
  value,
  onChange,
  isDisabled = false,
  className,
}) => (
  <Select
    aria-label={label}
    className={clsx("w-full min-w-0", className)}
    value={value}
    onChange={(key) => {
      if (key !== null) onChange(String(key));
    }}
    isDisabled={isDisabled}
    selectionMode="single"
  >
    <Select.Trigger className={listSelectTriggerClasses}>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left">
        <span aria-hidden="true" className={listSelectLabelClasses}>
          {label}
        </span>
        <Select.Value className={listSelectValueClasses} />
      </div>
      <Select.Indicator />
    </Select.Trigger>
    <Select.Popover className="max-w-[calc(100vw-2rem)]">
      <ListBox>
        {options.map((option) => (
          <ListBox.Item
            key={option.id}
            id={option.id}
            textValue={option.label}
            className={listSelectItemClasses}
          >
            <span className="min-w-0 flex-1 truncate">{option.label}</span>
            <ListBox.ItemIndicator className={listSelectIndicatorClasses} />
          </ListBox.Item>
        ))}
      </ListBox>
    </Select.Popover>
  </Select>
);
