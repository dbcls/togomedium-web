import { FC } from "react";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";

export const GlobalNavigation: FC = () => {
  return (
    <Listbox className="p-2 flex flex-col gap-8 w-72 h-full border-r-small">
      <ListboxItem href={"/medium"}>Home</ListboxItem>
      <ListboxSection title={"DATA"}>
        <ListboxItem href={"/medium"} title={"All media"} />
        <ListboxItem href={"/strain"} title={"All strains"} />
        <ListboxItem href={"/component"} title={"All components"} />
      </ListboxSection>
      <ListboxSection>
        <ListboxItem
          href={"/find-media-by-components"}
          title={"Find media by components"}
        />
        <ListboxItem
          href={"/find-media-by-taxonomic-tree"}
          title={"Find media by taxonomic tree"}
        />
        <ListboxItem
          href={"/find-media-by-organism-phenotype"}
          title={"Find media by organism phenotype"}
        />
      </ListboxSection>
      <ListboxSection title={"Tools"}>
        <ListboxItem
          href={"/find-media-by-organism-phenotype"}
          title={"Media by organism phenotype"}
        />
        <ListboxItem
          href={"/find-media-by-organism-phenotype"}
          title={"Media by organism phenotype"}
        />
      </ListboxSection>
      <ListboxSection title={"About"}>
        <ListboxItem href={"/about"} title={"About this site"} />
        <ListboxItem href={"/statistics"} title={"Statistics"} />
        <ListboxItem href={"/api"} title={"API"} />
      </ListboxSection>
      <ListboxItem
        href={"https://dbcls.rois.ac.jp/contact-en.html"}
        title={"Contact"}
        target={"_blank"}
      />
    </Listbox>
  );
};
