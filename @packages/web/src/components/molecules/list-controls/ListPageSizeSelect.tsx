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

export type ListPageSize = 20 | 50 | 100;

type Props = {
  value: ListPageSize;
  onChange: (value: ListPageSize) => void;
  isDisabled?: boolean;
  className?: string;
};

export const ListPageSizeSelect: FC<Props> = ({
  value,
  onChange,
  isDisabled = false,
  className,
}) => (
  <Select
    aria-label="Items per page"
    className={clsx("w-full min-w-0", className)}
    value={String(value)}
    onChange={(key) => {
      const next = Number(key);
      if (next === 20 || next === 50 || next === 100) onChange(next);
    }}
    isDisabled={isDisabled}
    selectionMode="single"
  >
    <Select.Trigger className={listSelectTriggerClasses}>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left">
        <span aria-hidden="true" className={listSelectLabelClasses}>
          Items per page
        </span>
        <Select.Value className={listSelectValueClasses} />
      </div>
      <Select.Indicator />
    </Select.Trigger>
    <Select.Popover>
      <ListBox>
        {([20, 50, 100] as const).map((size) => (
          <ListBox.Item
            key={size}
            id={String(size)}
            textValue={`${size} items`}
            className={listSelectItemClasses}
          >
            <span className="min-w-0 flex-1 truncate">{size} items</span>
            <ListBox.ItemIndicator className={listSelectIndicatorClasses} />
          </ListBox.Item>
        ))}
      </ListBox>
    </Select.Popover>
  </Select>
);
