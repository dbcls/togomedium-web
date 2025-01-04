import { FC, PropsWithChildren } from "react";
type Props = {
  title: string;
} & PropsWithChildren;

export const NavItemGroup: FC<Props> = ({ title, children }) => {
  return (
    <li>
      <div className={"text-xs/6 font-semibold text-gray-400"}>{title}</div>
      <ul role="list" className={"flex flex-col gap-0.5"}>
        {children}
      </ul>
    </li>
  );
};
