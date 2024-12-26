import { FC, PropsWithChildren } from "react";

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className={"flex grow flex-col gap-12 px-6 pb-10 pt-10"}>{children}</div>;
};
