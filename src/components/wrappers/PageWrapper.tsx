import { FC, PropsWithChildren } from "react";

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={"flex grow flex-col gap-12 overflow-x-hidden px-6 pb-16 pt-10"}>{children}</div>
  );
};
