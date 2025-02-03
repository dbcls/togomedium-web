import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

type Props = {
  hasStanzaMargin?: boolean;
} & PropsWithChildren;

export const H2: FC<Props> = ({ children, hasStanzaMargin = true }) => {
  const className = clsx("font-wide text-3xl font-medium", hasStanzaMargin && ["mb-1", "pl-2"]);
  return <h2 className={className}>{children}</h2>;
};
