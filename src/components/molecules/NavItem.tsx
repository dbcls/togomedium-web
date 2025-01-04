import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { ComponentProps, FC } from "react";
import { NavIcon } from "@/components/molecules/NavIcon.tsx";
import { LinkTo } from "@/types/router.ts";

type Props = {
  to?: LinkTo;
  href?: string;
  icon?: ComponentProps<typeof NavIcon>["type"];
  exactActive?: boolean;
} & Pick<ComponentProps<typeof Link>, "title">;

export const NavItem: FC<Props> = ({ title, to, href, icon, exactActive = true }) => {
  const isExternal = href !== undefined;
  const baseClasses = clsx(
    "group flex items-center gap-x-1.5 rounded-md p-2 align-middle text-sm/6 font-medium"
  );
  const activeClasses = clsx("bg-gray-50 text-indigo-600");
  const inactiveClasses = clsx("text-gray-700 hover:bg-gray-50 hover:text-indigo-600");
  return (
    <li className={"text-sm"}>
      {isExternal ? (
        <a
          href={href}
          target={"_blank"}
          className={clsx(baseClasses, inactiveClasses)}
        >
          {icon && <NavIcon type={icon} />}
          <span className="pt-1">{title}</span>
        </a>
      ) : (
        <Link
          to={to}
          title={title}
          activeOptions={{ exact: exactActive }}
          activeProps={{ className: activeClasses }}
          inactiveProps={{ className: inactiveClasses }}
          className={baseClasses}
        >
          {({ isActive }) => {
            return (
              <>
                {icon && (
                  <NavIcon
                    type={icon}
                    isActive={isActive}
                  />
                )}
                <span className="pt-1">{title}</span>
              </>
            );
          }}
        </Link>
      )}
    </li>
  );
};
