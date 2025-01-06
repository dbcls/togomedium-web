import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { ComponentIcon } from "@/components/atoms/svg/ComponentIcon.tsx";
import { MediumIcon } from "@/components/atoms/svg/MediumIcon.tsx";
import { OrganismIcon } from "@/components/atoms/svg/OrganismIcon.tsx";
import { StatsCard } from "@/components/molecules/home/StatsCard.tsx";
import { API_COMPONENT_LIST, API_MEDIA_LIST, API_STRAIN_LIST } from "@/consts/api.ts";
import { basicTextLink } from "@/consts/styles.ts";
import { ListResponse } from "@/types/responses.ts";
import { fetchData } from "@/utils/fetch.ts";

export const StatsSection: FC = () => {
  const mediumCount = useListCount(API_MEDIA_LIST);
  const strainCount = useListCount(API_STRAIN_LIST);
  const componentCount = useListCount(API_COMPONENT_LIST);

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

const useListCount = (apiUrl: string) => {
  const { data } = useQuery({
    queryKey: [apiUrl],
    queryFn: async () => {
      const response = await fetchData<ListResponse>(apiUrl);
      return response;
    },
    staleTime: Infinity,
  });
  return parseInt((data?.total ?? 0).toString());
};
