import { ListboxItem } from "@nextui-org/react";
import { FC } from "react";

type Props = {};

export const NavItem: FC<Props> = () => {
  return <ListboxItem className={"bg-amber-500"} href={"/"} title={"Home"} />;
};
