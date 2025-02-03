import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

type Props = {
  type?: "full" | "narrow";
  className?: string;
} & PropsWithChildren;
export const PageWrapper: FC<Props> = ({ children, type = "full", className }) => {
  const fullClasses = clsx(
    "flex grow flex-col gap-12 overflow-x-hidden px-6 pb-8 pt-10",
    className
  );
  const narrowClasses = clsx(
    "mx-auto flex max-w-[1200px] grow flex-col gap-12 px-6 pb-8 pt-10",
    className
  );
  const classes = type === "full" ? fullClasses : narrowClasses;
  return <div className={classes}>{children}</div>;
};
