import { Link } from "@tanstack/react-router";
import { FC } from "react";
import { NavDivider } from "@/components/atoms/NavDivider.tsx";
import { Logo } from "@/components/atoms/svg/logo.tsx";
import {
  ICON_API,
  ICON_COMPONENT,
  ICON_DOC,
  ICON_FRIDGE,
  ICON_GRID,
  ICON_HOME,
  ICON_MAIL,
  ICON_MEDIUM,
  ICON_ORGANISM,
  ICON_SLIDER,
  ICON_STATS,
  ICON_TREE,
} from "@/components/molecules/NavIcon.tsx";
import { NavItem } from "@/components/molecules/NavItem.tsx";
import { NavItemGroup } from "@/components/molecules/NavItemGroup.tsx";
import { URL_CONTACT } from "@/consts/api.ts";

export const GlobalNavigation: FC = () => {
  return (
    <div className="relative w-72 shrink-0 grow-0 border-r-small bg-white p-3">
      <div className="sticky top-[36px] flex flex-col">
        <Link to={"/"}>
          <Logo className={"mt-3 w-[160px]"} />
        </Link>
        <ul className="mt-4 flex flex-col gap-0.5">
          <NavItem
            to={"/"}
            title={"Home"}
            icon={ICON_HOME}
          />
          <NavDivider />
          <NavItemGroup title={"Data"}>
            <NavItem
              to={"/medium"}
              title={"All media"}
              icon={ICON_MEDIUM}
            />
            <NavItem
              to={"/strain"}
              title={"All strains"}
              icon={ICON_ORGANISM}
            />
            <NavItem
              to={"/component"}
              title={"All components"}
              icon={ICON_COMPONENT}
            />
          </NavItemGroup>
          <NavDivider />
          <NavItemGroup title={"Tools"}>
            <NavItem
              to={"/find-media-by-components"}
              title={"Find media by components"}
              icon={ICON_FRIDGE}
            />
            <NavItem
              to={"/find-media-by-taxonomic-tree"}
              title={"Find media by taxonomic tree"}
              icon={ICON_TREE}
            />
            <NavItem
              to={"/find-media-by-organism-phenotype"}
              title={"Find media by organism phenotype"}
              icon={ICON_SLIDER}
            />
            <NavItem
              to={"/compare-media"}
              title={"Compare media"}
              icon={ICON_GRID}
              exactActive={false}
            />
            <NavItem
              to={"/compare-media-by-taxids"}
              title={"Compare media by TAX IDs"}
              icon={ICON_GRID}
              exactActive={false}
            />
          </NavItemGroup>
          <NavDivider />
          <NavItemGroup title={"About"}>
            <NavItem
              to={"/about"}
              title={"About this site"}
              icon={ICON_DOC}
            />
            <NavItem
              to={"/statistics"}
              title={"Statistics"}
              icon={ICON_STATS}
            />
            <NavItem
              to={"/api"}
              title={"API"}
              icon={ICON_API}
            />
          </NavItemGroup>
          <NavDivider />
          <NavItem
            href={URL_CONTACT}
            title={"Contact"}
            icon={ICON_MAIL}
          />
        </ul>
      </div>
    </div>
  );
};
