import { FC, PropsWithChildren } from "react";

export const GlobalWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="border-b-small flex h-full min-h-[var(--view-height)] w-full items-stretch bg-stone-100">
      {children}
    </div>
  );
};
