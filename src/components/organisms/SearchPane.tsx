import { RefObject } from "@react-types/shared";
import { FC } from "react";

type Props = {
  inputRef: RefObject<HTMLInputElement | null>;
  onClickButton: () => void;
  errorMsg: string;
  defaultIds: string[];
  label: string;
};
export const SearchPane: FC<Props> = ({ inputRef, onClickButton, errorMsg, defaultIds, label }) => {
  return (
    <div className={"font-wide mt-4 flex flex-col gap-2 rounded-small bg-white pb-5 pl-4 pt-6"}>
      <fieldset className="flex gap-4">
        <div className="relative w-96">
          <label
            htmlFor="ids"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            {label}
          </label>
          <input
            id="ids"
            type="text"
            placeholder={defaultIds.join(",")}
            defaultValue={defaultIds.join(",")}
            ref={inputRef}
            className="text-xl4 block h-full w-full rounded-md bg-white px-3 py-1.5 text-large text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-dark flex justify-center rounded-md px-8 pb-2.5 pt-3 text-sm/6 font-medium text-white hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          value="compare"
          onClick={onClickButton}
        >
          Compare
        </button>
      </fieldset>
      {errorMsg && <p className={"text-red-800"}>{errorMsg}</p>}
    </div>
  );
};
