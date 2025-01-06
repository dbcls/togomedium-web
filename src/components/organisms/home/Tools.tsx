import { FC } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { FridgeIcon } from "@/components/atoms/svg/FridgeIcon.tsx";
import { GridIcon } from "@/components/atoms/svg/GridIcon.tsx";
import { SlidersIcon } from "@/components/atoms/svg/SlidersIcon.tsx";
import { TreeIcon } from "@/components/atoms/svg/TreeIcon.tsx";
import { ToolsCard } from "@/components/molecules/home/ToolsCard.tsx";

type Props = {};
export const Tools: FC<Props> = () => {
  return (
    <div>
      <H2>Find and compare media with various ways</H2>
      <ul className={"grid grid-cols-3 gap-4"}>
        <ToolsCard
          title={"Find media by components"}
          to={"/find-media-by-components"}
          icon={<FridgeIcon />}
        />
        <ToolsCard
          title={"Find media by taxonomic tree"}
          to={"/find-media-by-taxonomic-tree"}
          icon={<TreeIcon />}
        />
        <ToolsCard
          title={"Find media by organism phenotype"}
          to={"/find-media-by-organism-phenotype"}
          icon={<SlidersIcon />}
        />
        <ToolsCard
          title={"Compare media"}
          to={"/compare-media"}
          icon={<GridIcon />}
        />
        <ToolsCard
          title={"Compare media by TAX IDs"}
          to={"/compare-media-by-taxids"}
          icon={<GridIcon />}
        />
      </ul>
    </div>
  );
};
