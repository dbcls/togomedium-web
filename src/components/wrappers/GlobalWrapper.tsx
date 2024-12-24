import { FC, PropsWithChildren } from "react";

export const GlobalWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex min-h-dvh w-full gap-4 border-b-small">{children}</div>;
};
