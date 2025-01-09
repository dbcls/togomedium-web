import { Link, useNavigate } from "@tanstack/react-router";
import { FC, useRef } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { SearchPane } from "@/components/organisms/SearchPane.tsx";
import { basicTextLink } from "@/consts/styles.ts";

export const SearchSection: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const onSubmit = () => {
    const query = encodeURIComponent(inputRef.current?.value ?? "");
    if (query !== "") {
      navigate({ to: "/search", search: { query } });
    }
  };
  return (
    <section>
      <H2>Or search anything by IDs and keywords</H2>
      <SearchPane
        inputRef={inputRef}
        onSubmit={onSubmit}
        errorMsg={""}
        label={"Enter IDs or keywords for search"}
        buttonLabel={"Search"}
      >
        <div className={"flex flex-col gap-3 rounded border-small p-3"}>
          <p>
            Try searching with any IDs and keyword you are come up with. Terms should be separated
            by "," if multiple queries are requested.{" "}
          </p>
          <div>
            <h3 className={"font-medium"}>Query examples</h3>
            <div className={"flex flex-wrap gap-x-2"}>
              <Link
                to={"/search"}
                search={{ query: "Glucose" }}
                className={basicTextLink}
              >
                Glucose
              </Link>
              <span>/</span>
              <Link
                to={"/search"}
                search={{ query: "M10" }}
                className={basicTextLink}
              >
                M10
              </Link>
              <span>/</span>
              <Link
                to={"/search"}
                search={{ query: "MRS Medium" }}
                className={basicTextLink}
              >
                MRS Medium
              </Link>
              <span>/</span>
              <Link
                to={"/search"}
                search={{ query: "Streptococcus gallolyticus" }}
                className={basicTextLink}
              >
                Streptococcus gallolyticus
              </Link>
            </div>
          </div>
        </div>
      </SearchPane>
    </section>
  );
};
