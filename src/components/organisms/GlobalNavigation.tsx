import { FC } from "react";
import { Logo } from "@/components/atoms/svg/logo.tsx";
import {
  ICON_COMPONENT,
  ICON_HOME,
  ICON_MEDIUM,
  ICON_ORGANISM,
} from "@/components/molecules/NavIcon.tsx";
import { NavItem } from "@/components/molecules/NavItem.tsx";
import { NavItemGroup } from "@/components/molecules/NavItemGroup.tsx";
import { URL_CONTACT } from "@/consts.ts";

export const GlobalNavigation: FC = () => {
  return (
    <div className="flex w-72 shrink-0 grow-0 flex-col border-r-small bg-white p-3">
      <Logo />
      <ul className="flex flex-col gap-0.5">
        <NavItem
          to={"/"}
          title={"Home"}
          icon={ICON_HOME}
        />
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
        <NavItemGroup title={"Find"}>
          <NavItem
            to={"/find-media-by-components"}
            title={"Find media by components"}
          />
          <NavItem
            to={"/find-media-by-taxonomic-tree"}
            title={"Find media by taxonomic tree"}
          />
          <NavItem
            to={"/find-media-by-organism-phenotype"}
            title={"Find media by organism phenotype"}
          />
        </NavItemGroup>
        <NavItemGroup title={"Tools"}>
          <NavItem
            to={"/compare-media"}
            title={"Compare media"}
          />
          <NavItem
            to={"/compare-media-by-taxids"}
            title={"Compare media by TAX IDs"}
          />
        </NavItemGroup>
        <NavItemGroup title={"About"}>
          <NavItem
            to={"/about"}
            title={"About this site"}
          />
          <NavItem
            to={"/statistics"}
            title={"Statistics"}
          />
          <NavItem
            to={"/api"}
            title={"API"}
          />
        </NavItemGroup>
        <NavItem
          href={URL_CONTACT}
          title={"Contact"}
        />
      </ul>
    </div>
  );
};
