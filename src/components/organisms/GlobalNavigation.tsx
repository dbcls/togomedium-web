import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { FC } from "react";

export const GlobalNavigation: FC = () => {
  return (
    <Listbox
      aria-label={"nav"}
      className="flex w-72 shrink-0 grow-0 flex-col gap-8 border-r-small p-2"
    >
      <ListboxItem href={"/"} title={"Home"} />
      <ListboxSection title={"DATA"}>
        <ListboxItem href={"/medium"} title={"All media"} />
        <ListboxItem href={"/strain"} title={"All strains"} />
        <ListboxItem href={"/component"} title={"All components"} />
      </ListboxSection>
      <ListboxSection>
        <ListboxItem href={"/find-media-by-components"} title={"Find media by components"} />
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
        <ListboxItem href={"/compare-media"} title={"Compare media"} />
        <ListboxItem href={"/compare-media-by-taxids"} title={"Compare media by TAX IDs"} />
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
