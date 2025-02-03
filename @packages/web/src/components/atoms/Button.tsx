import clsx from "clsx";
import { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type Props = {
  label: string;
} & Pick<ButtonProps, "type" | "className" | "onClick">;

export const Button: FC<Props> = ({ label, type = "submit", className }) => {
  return (
    <button
      type={type}
      className={clsx(
        "bg-primary-dark flex justify-center rounded-md px-8 pb-2.5 pt-3 text-sm/6 font-medium tracking-wider text-white hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
      value={label}
    >
      {label}
    </button>
  );
};
