import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { ComponentIcon } from "@/components/atoms/svg/ComponentIcon.tsx";
import { MediumIcon } from "@/components/atoms/svg/MediumIcon.tsx";
import { OrganismIcon } from "@/components/atoms/svg/OrganismIcon.tsx";
import { StatsCard } from "@/components/organisms/home/StatsCard.tsx";

export const Stats: FC = () => {
  return (
    <div>
      <H2>In our database:</H2>
      <ul className={"grid grid-cols-3 justify-between gap-4"}>
        <StatsCard
          to={"/medium"}
          label={"media"}
          count={9999}
          icon={<MediumIcon />}
        />

        <StatsCard
          to={"/strain"}
          label={"strains"}
          count={9999}
          icon={<OrganismIcon />}
        />
        <StatsCard
          to={"/component"}
          label={"components"}
          count={9999}
          icon={<ComponentIcon />}
        />
      </ul>
    </div>
  );
};
