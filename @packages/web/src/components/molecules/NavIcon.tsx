import clsx from "clsx";
import { FC } from "react";
import { ApiIcon } from "@/components/atoms/svg/ApiIcon.tsx";
import { ComponentIcon } from "@/components/atoms/svg/ComponentIcon.tsx";
import { DocIcon } from "@/components/atoms/svg/DocIcon.tsx";
import { FridgeIcon } from "@/components/atoms/svg/FridgeIcon.tsx";
import { GridIcon } from "@/components/atoms/svg/GridIcon.tsx";
import { HomeIcon } from "@/components/atoms/svg/HomeIcon.tsx";
import { MailIcon } from "@/components/atoms/svg/MailIcon.tsx";
import { MediumIcon } from "@/components/atoms/svg/MediumIcon.tsx";
import { OrganismIcon } from "@/components/atoms/svg/OrganismIcon.tsx";
import { SlidersIcon } from "@/components/atoms/svg/SlidersIcon.tsx";
import { StatsIcon } from "@/components/atoms/svg/StatsIcon.tsx";
import { TreeIcon } from "@/components/atoms/svg/TreeIcon.tsx";

export const ICON_HOME = "home";
export const ICON_MEDIUM = "medium";
export const ICON_ORGANISM = "organism";
export const ICON_COMPONENT = "component";
export const ICON_SLIDER = "slider";
export const ICON_TREE = "tree";
export const ICON_FRIDGE = "fridge";
export const ICON_API = "api";
export const ICON_STATS = "stats";
export const ICON_GRID = "grid";
export const ICON_MAIL = "mail";
export const ICON_DOC = "doc";

const Icons = [
  ICON_HOME,
  ICON_MEDIUM,
  ICON_ORGANISM,
  ICON_COMPONENT,
  ICON_SLIDER,
  ICON_TREE,
  ICON_FRIDGE,
  ICON_API,
  ICON_STATS,
  ICON_GRID,
  ICON_MAIL,
  ICON_DOC,
] as const;
type NavIconId = (typeof Icons)[number];

type Props = {
  type: NavIconId;
  isActive?: boolean;
};

export const NavIcon: FC<Props> = ({ type, isActive }) => {
  const classes = clsx(
    "size-5 shrink-0 grow-0",
    isActive ? "text-primary-dark" : "group-hover:text-primary-dark text-gray-400"
  );
  switch (type) {
    case ICON_HOME:
      return <HomeIcon className={classes} />;
    case ICON_MEDIUM:
      return <MediumIcon className={classes} />;
    case ICON_ORGANISM:
      return <OrganismIcon className={classes} />;
    case ICON_COMPONENT:
      return <ComponentIcon className={classes} />;
    case ICON_FRIDGE:
      return <FridgeIcon className={classes} />;
    case ICON_TREE:
      return <TreeIcon className={classes} />;
    case ICON_SLIDER:
      return <SlidersIcon className={classes} />;
    case ICON_GRID:
      return <GridIcon className={classes} />;
    case ICON_MAIL:
      return <MailIcon className={classes} />;
    case ICON_DOC:
      return <DocIcon className={classes} />;
    case ICON_API:
      return <ApiIcon className={classes} />;
    case ICON_STATS:
      return <StatsIcon className={classes} />;
    default:
      return <></>;
  }
};
