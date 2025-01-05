import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

type Props = {
  hasStanzaMargin?: boolean;
} & PropsWithChildren;

export const H3: FC<Props> = ({ children, hasStanzaMargin = true }) => {
  const className = clsx("font-wide text-2xl font-medium", hasStanzaMargin && ["mb-1", "pl-2"]);
  return <h3 className={className}>{children}</h3>;
};
