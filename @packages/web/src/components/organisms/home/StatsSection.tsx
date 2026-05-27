import { PATH_LIST_COMPONENTS } from "%api/listComponents/definitions.ts";
import { PATH_LIST_MEDIA } from "%api/listMedia/definitions.ts";
import { PATH_LIST_STRAINS } from "%api/listStrains/definitions.ts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { ComponentIcon } from "@/components/atoms/svg/ComponentIcon.tsx";
import { MediumIcon } from "@/components/atoms/svg/MediumIcon.tsx";
import { OrganismIcon } from "@/components/atoms/svg/OrganismIcon.tsx";
import { StatsCard } from "@/components/molecules/home/StatsCard.tsx";
import { basicTextLink } from "@/consts/styles.ts";
import { useListCount } from "@/hooks/useListCount.ts";

export const StatsSection: FC = () => {
  const mediumCount = useListCount(makeApiUrl(PATH_LIST_MEDIA));
  const strainCount = useListCount(makeApiUrl(PATH_LIST_STRAINS));
  const componentCount = useListCount(makeApiUrl(PATH_LIST_COMPONENTS));

  return (
    <section>
      <H2>In our database:</H2>
      <ul className={"grid grid-cols-3 justify-between gap-4"}>
        <StatsCard to={"/medium"} label={"media"} count={mediumCount} icon={<MediumIcon />} />

        <StatsCard to={"/strain"} label={"strains"} count={strainCount} icon={<OrganismIcon />} />
        <StatsCard
          to={"/component"}
          label={"components"}
          count={componentCount}
          icon={<ComponentIcon />}
        />
      </ul>
      <p className={"flex w-full justify-end pt-4 pr-10"}>
        <Link to={"/statistics"} className={clsx(basicTextLink, ["text-large", "font-wide"])}>
          More about the database &gt;
        </Link>
      </p>
    </section>
  );
};
