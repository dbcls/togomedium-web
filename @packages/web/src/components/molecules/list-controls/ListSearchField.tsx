import { Button, Input, TextField } from "@heroui/react";
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
  label = "Name or GMO ID",
  placeholder = "Search by name or GMO ID",
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
      aria-label={label}
      className="relative min-w-0 flex-1 basis-48"
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
    >
      <Input
        className="focus-visible:outline-primary-dark pr-10 shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-search-cancel-button]:appearance-none"
        placeholder={placeholder}
        type="search"
        onKeyDown={(event) => {
          // An Enter key used to confirm IME input must not apply the search.
          if (event.key === "Enter" && (event.nativeEvent.isComposing || event.keyCode === 229)) {
            event.preventDefault();
          }
        }}
      />
      {value !== "" && (
        <button
          type="button"
          aria-label="Clear search"
          disabled={isDisabled}
          className="focus-visible:outline-primary-dark absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-lg text-gray-600 hover:bg-gray-100 focus-visible:outline-2 disabled:opacity-50"
          onClick={() => {
            if (!isDisabled) {
              onChange("");
              onSubmit("");
            }
          }}
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </TextField>
    <Button type="submit" isDisabled={isDisabled}>
      {buttonLabel}
    </Button>
  </form>
);
