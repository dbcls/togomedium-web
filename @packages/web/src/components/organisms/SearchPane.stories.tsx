import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ComponentProps, useRef, useState } from "react";
import { SearchPane } from "./SearchPane";

type ExampleProps = Omit<ComponentProps<typeof SearchPane>, "inputRef" | "onSubmit">;

const SearchPaneExample = (args: ExampleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [submittedValue, setSubmittedValue] = useState<string>();
  return (
    <>
      <SearchPane
        {...args}
        inputRef={inputRef}
        onSubmit={() => setSubmittedValue(inputRef.current?.value ?? "")}
      />
      {submittedValue !== undefined && (
        <p role="status">Submitted value: {submittedValue || "(empty)"}</p>
      )}
    </>
  );
};

const meta = {
  component: SearchPaneExample,
  args: {
    label: "Enter IDs or keywords for search",
    buttonLabel: "Search",
    errorMsg: "",
    placeHolder: "Glucose, M10",
    defaultWithPlaceHolder: false,
  },
} satisfies Meta<typeof SearchPaneExample>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
export const Prefilled = {
  args: { defaultWithPlaceHolder: true },
} satisfies Story;
export const Error = {
  args: { errorMsg: "Enter at least one ID or keyword." },
} satisfies Story;
export const WithHelp = {
  args: { children: <p>Separate multiple IDs or keywords with commas.</p> },
} satisfies Story;
