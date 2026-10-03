import { Button, Input, Label, TextField } from "@heroui/react";
import clsx from "clsx";
import type { FC } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  label?: string;
  placeholder?: string;
  buttonLabel?: string;
  isDisabled?: boolean;
  className?: string;
};

/** Owns only the search form. The caller keeps draft and applied values separate. */
export const ListSearchField: FC<Props> = ({
  value,
  onChange,
  onSubmit,
  label = "Name",
  placeholder = "Search by name",
  buttonLabel = "Search",
  isDisabled = false,
  className,
}) => (
  <form
    role="search"
    aria-label={label}
    className={clsx("flex flex-wrap items-end gap-3", className)}
    onSubmit={(event) => {
      event.preventDefault();
      if (!isDisabled) onSubmit(value);
    }}
  >
    <TextField
      className="min-w-0 flex-1 basis-48"
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
    >
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        type="search"
        onKeyDown={(event) => {
          // An Enter key used to confirm IME input must not apply the search.
          if (event.key === "Enter" && (event.nativeEvent.isComposing || event.keyCode === 229)) {
            event.preventDefault();
          }
        }}
      />
    </TextField>
    <Button type="submit" isDisabled={isDisabled}>
      {buttonLabel}
    </Button>
  </form>
);
