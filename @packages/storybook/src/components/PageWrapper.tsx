import { FC, PropsWithChildren } from "react";
export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{ backgroundColor: "oklch(97% .001 106.424)", minHeight: "100vh", padding: "24px" }}
    >
      {children}
    </div>
  );
};
