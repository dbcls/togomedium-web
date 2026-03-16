import { Link } from "@tanstack/react-router";
import { FC, ReactNode } from "react";

import { LinkTo } from "@/types/router.ts";

type Props = {
  count: number;
  label: string;
  to: LinkTo;
  icon: ReactNode;
};

export const StatsCard: FC<Props> = ({ count, label, to, icon }) => {
  return (
    <li className={"rounded-md bg-white"}>
      <Link
        to={to}
        className={"flex h-full items-center gap-[clamp(8px,1.5vw,32px)] p-[clamp(8px,1.5vw,24px)]"}
      >
        <figure className={"text-primary w-1/4 max-w-16 min-w-8 shrink-0 grow-0"}>{icon}</figure>
        <p className={"font-wide flex flex-col gap-1"}>
          <span className={"text-primary text-[clamp(16px,4vw,48px)] leading-none"}>
            {count.toLocaleString()}
          </span>
          <span className={"text-[clamp(8px,2vw,24px)] font-medium"}>{label}</span>
        </p>
      </Link>
    </li>
  );
};
