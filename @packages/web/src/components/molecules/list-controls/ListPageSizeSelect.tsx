import { Label, ListBox, Select } from "@heroui/react";
import clsx from "clsx";
import type { FC } from "react";

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
    className={clsx("w-full min-w-0", className)}
    value={String(value)}
    onChange={(key) => {
      const next = Number(key);
      if (next === 20 || next === 50 || next === 100) onChange(next);
    }}
    isDisabled={isDisabled}
    selectionMode="single"
  >
    <Label>Items per page</Label>
    <Select.Trigger>
      <Select.Value />
      <Select.Indicator />
    </Select.Trigger>
    <Select.Popover>
      <ListBox>
        {([20, 50, 100] as const).map((size) => (
          <ListBox.Item key={size} id={String(size)} textValue={`${size} items`}>
            {size} items
            <ListBox.ItemIndicator />
          </ListBox.Item>
        ))}
      </ListBox>
    </Select.Popover>
  </Select>
);
