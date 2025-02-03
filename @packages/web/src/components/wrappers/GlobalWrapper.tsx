import { FC, PropsWithChildren } from "react";

export const GlobalWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full min-h-[var(--view-height)] w-full items-stretch border-b-small bg-stone-100">
      {children}
    </div>
  );
};
