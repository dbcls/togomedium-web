import { RefObject } from "@react-types/shared";
import { useLocation, useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { FC, useRef } from "react";
import { SearchIcon } from "@/components/atoms/svg/SearchiIcon.tsx";

type Props = {
  className?: string;
};

export const SearchInput: FC<Props> = ({ className }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { onSubmit } = useSubmit(inputRef);
  useLocationUpdate(inputRef);

  return (
    <form
      className={clsx(
        "flex w-full items-center rounded pl-2 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary",
        className
      )}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <figure className={"w-4 shrink-0 grow-0 text-gray-500"}>
        <SearchIcon />
      </figure>
      <input
        type="text"
        placeholder={"Search"}
        className={"grow p-2 focus:outline focus:outline-0"}
        ref={inputRef}
      />
    </form>
  );
};

const useSubmit = (inputRef: RefObject<HTMLInputElement | null>) => {
  const navigate = useNavigate();
  const onSubmit = () => {
    const query = encodeURIComponent(inputRef.current?.value ?? "");
    if (query !== "") {
      navigate({ to: "/search", search: { query } });
    }
    (document.activeElement as HTMLElement).blur();
  };

  return { onSubmit };
};

const useLocationUpdate = (inputRef: RefObject<HTMLInputElement | null>) => {
  const location = useLocation<any>();
  const query = decodeURIComponent(location.search.query);
  const path = location.pathname;
  if (inputRef.current) {
    if (path === "/search" && query) {
      inputRef.current.value = query;
    } else {
      inputRef.current.value = "";
    }
  }
};
