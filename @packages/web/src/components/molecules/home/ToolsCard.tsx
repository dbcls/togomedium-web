import { Link } from "@tanstack/react-router";
import { FC, ReactNode } from "react";

import { LinkTo } from "@/types/router.ts";

type Props = {
  title: string;
  to: LinkTo;
  icon: ReactNode;
};
export const ToolsCard: FC<Props> = ({ title, to, icon }) => {
  return (
    <li className={"rounded-md bg-white"}>
      <Link
        to={to}
        className={
          "flex h-full items-center gap-[clamp(8px,1.2vw,32px)] px-[clamp(8px,1.5vw,24px)] py-[clamp(8px,1.2vw,16px)]"
        }
      >
        <figure className={"text-primary w-1/8 max-w-16 min-w-8 shrink-0 grow-0"}>{icon}</figure>
        <span className={"font-wide text-xl leading-tight font-medium"}>{title}</span>
      </Link>
    </li>
  );
};
