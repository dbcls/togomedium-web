import { FC, useRef } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { SearchPane } from "@/components/organisms/SearchPane.tsx";

export const SearchSection: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = () => {};
  return (
    <section>
      <H2>Or search anything by IDs and keywords</H2>
      <SearchPane
        inputRef={inputRef}
        onSubmit={onSubmit}
        errorMsg={""}
        label={"Enter IDs or keywords for search"}
        buttonLabel={"Search"}
      />
    </section>
  );
};
