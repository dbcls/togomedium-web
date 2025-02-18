import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { FC } from "react";
import { listComponentsUrl } from "%api/listComponents/definitions.ts";
import { listMediaURL } from "%api/listMedia/definitions.ts";
import { listStrainsUrl } from "%api/listStrains/definitions.ts";
import { H2 } from "@/components/atoms/H2.tsx";
import { ComponentIcon } from "@/components/atoms/svg/ComponentIcon.tsx";
import { MediumIcon } from "@/components/atoms/svg/MediumIcon.tsx";
import { OrganismIcon } from "@/components/atoms/svg/OrganismIcon.tsx";
import { StatsCard } from "@/components/molecules/home/StatsCard.tsx";
import { basicTextLink } from "@/consts/styles.ts";
import { useListCount } from "@/hooks/useListCount.ts";

export const StatsSection: FC = () => {
  const mediumCount = useListCount(listMediaURL);
  const strainCount = useListCount(listStrainsUrl);
  const componentCount = useListCount(listComponentsUrl);

  return (
    <section>
      <H2>In our database:</H2>
      <ul className={"grid grid-cols-3 justify-between gap-4"}>
        <StatsCard
          to={"/medium"}
          label={"media"}
          count={mediumCount}
          icon={<MediumIcon />}
        />

        <StatsCard
          to={"/strain"}
          label={"strains"}
          count={strainCount}
          icon={<OrganismIcon />}
        />
        <StatsCard
          to={"/component"}
          label={"components"}
          count={componentCount}
          icon={<ComponentIcon />}
        />
      </ul>
      <p className={"flex w-full justify-end pr-10 pt-4"}>
        <Link
          to={"/statistics"}
          className={clsx(basicTextLink, ["text-large", "font-wide"])}
        >
          More about the database &gt;
        </Link>
      </p>
    </section>
  );
};
