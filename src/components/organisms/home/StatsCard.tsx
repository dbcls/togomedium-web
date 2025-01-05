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
        <figure className={"w-1/4 min-w-8 max-w-16 shrink-0 grow-0 text-primary"}>{icon}</figure>
        <p className={"font-wide flex flex-col gap-1"}>
          <span className={"text-[clamp(16px,4vw,48px)] leading-none text-primary"}>
            {count.toLocaleString()}
          </span>
          <span className={"text-[clamp(8px,2vw,24px)] font-medium"}>{label}</span>
        </p>
      </Link>
    </li>
  );
};
