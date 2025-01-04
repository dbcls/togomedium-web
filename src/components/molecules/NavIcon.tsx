import clsx from "clsx";
import { FC } from "react";
import { HomeIcon } from "@/components/atoms/svg/HomeIcon.tsx";
import { MediumIcon } from "@/components/atoms/svg/MediumIcon.tsx";

export const ICON_HOME = "home";
export const ICON_MEDIUM = "medium";
export const ICON_ORGANISM = "organism";
export const ICON_COMPONENT = "component";
export const ICON_CONTACT = "contact";

const Icons = [ICON_HOME, ICON_MEDIUM, ICON_ORGANISM, ICON_COMPONENT, ICON_CONTACT] as const;
type NavIconId = (typeof Icons)[number];

type Props = {
  type: NavIconId;
  isActive?: boolean;
};

export const NavIcon: FC<Props> = ({ type, isActive }) => {
  const classes = clsx(
    "size-5 shrink-0 grow-0",
    isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600"
  );
  switch (type) {
    case ICON_HOME:
      return <HomeIcon className={classes} />;
    case ICON_MEDIUM:
      return <MediumIcon className={classes} />;
    default:
      return <></>;
  }
};
