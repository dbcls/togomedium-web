import { Description, Label, ListBox, Select } from "@heroui/react";
import clsx from "clsx";
import type { FC } from "react";

export type ListFilterOption = {
  id: string;
  label: string;
  count?: number;
  /** Display order and depth are prepared by the caller, without API-specific ancestry. */
  depth?: number;
};

type Props = {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  options: readonly ListFilterOption[];
  countsStatus?: "ready" | "loading" | "error";
  noneLabel?: string;
  isDisabled?: boolean;
  className?: string;
};

export const ListFilterSelect: FC<Props> = ({
  label,
  value,
  onChange,
  options,
  countsStatus = "ready",
  noneLabel = "Any",
  isDisabled = false,
  className,
}) => {
  const items = [
    { key: "none", label: noneLabel, depth: 0, count: undefined },
    ...options.map((option) => ({ ...option, key: `option:${option.id}` })),
  ];
  const selectedLabel =
    value === null ? noneLabel : options.find((option) => option.id === value)?.label;

  return (
    <Select
      className={clsx("w-full min-w-0", className)}
      value={value === null ? "none" : `option:${value}`}
      onChange={(key) => onChange(key === "none" || key === null ? null : String(key).slice(7))}
      isDisabled={isDisabled}
      selectionMode="single"
    >
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value>{selectedLabel}</Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Description>
        <span role="status">
          {countsStatus === "loading"
            ? "Loading counts…"
            : countsStatus === "error"
              ? "Counts unavailable. You can still change the filter."
              : options.length === 0
                ? "No filter options."
                : "Counts show results for each option."}
        </span>
      </Description>
      <Select.Popover className="max-w-[calc(100vw-2rem)]">
        <ListBox items={items}>
          {(option) => (
            <ListBox.Item
              id={option.key}
              textValue={option.label}
              aria-label={[
                option.label,
                (option.depth ?? 0) > 0 ? `level ${(option.depth ?? 0) + 1}` : undefined,
                option.key === "none"
                  ? undefined
                  : countsStatus === "loading"
                    ? "count loading"
                    : countsStatus === "error"
                      ? "count unavailable"
                      : option.count !== undefined
                        ? `${option.count} results`
                        : undefined,
              ]
                .filter(Boolean)
                .join(", ")}
            >
              <span
                className="min-w-0 flex-1 break-words"
                style={{ paddingInlineStart: `${Math.max(0, option.depth ?? 0) * 12}px` }}
              >
                {(option.depth ?? 0) > 0 && <span aria-hidden="true">↳ </span>}
                {option.label}
              </span>
              {option.key !== "none" && (
                <span className="text-muted shrink-0 text-sm tabular-nums">
                  {countsStatus === "ready" ? (option.count ?? "—") : "—"}
                </span>
              )}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          )}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
