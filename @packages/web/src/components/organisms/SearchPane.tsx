import { RefObject } from "@react-types/shared";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { Button } from "@/components/atoms/Button.tsx";

type Props = {
  inputRef: RefObject<HTMLInputElement | null>;
  onSubmit: () => void;
  errorMsg: string;
  label: string;
  className?: string;
  buttonLabel: string;
  placeHolder?: string;
  defaultWithPlaceHolder?: boolean;
} & PropsWithChildren;
export const SearchPane: FC<Props> = ({
  inputRef,
  onSubmit,
  errorMsg,
  label,
  className,
  buttonLabel,
  placeHolder = "",
  defaultWithPlaceHolder = true,
  children,
}) => {
  return (
    <div className={clsx("flex gap-8 rounded-small bg-white px-4 pb-5 pt-6 font-wide", className)}>
      <div className={"flex-col gap-2"}>
        <form
          className="flex gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="relative w-96">
            <label
              htmlFor="terms"
              className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
            >
              {label}
            </label>
            <input
              id="terms"
              type="text"
              placeholder={placeHolder}
              defaultValue={defaultWithPlaceHolder ? placeHolder : undefined}
              ref={inputRef}
              className="text-xl4 block h-full w-full rounded-md bg-white px-3 py-1.5 text-large text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
            />
          </div>
          <Button label={buttonLabel} />
        </form>
        {errorMsg && <p className={"text-red-800"}>{errorMsg}</p>}
      </div>
      {children}
    </div>
  );
};
