import React, { ComponentProps, FC } from "react";
import { Nullable } from "yohak-tools";
import { LineageList } from "%stanza/components/info-detail/LineageList";
import { ColorButton } from "%stanza/components/styled/ColorButton";
import { ColWrapper } from "%stanza/components/styled/ColWrapper";
import { InfoId } from "%stanza/components/styled/InfoId";
import { InfoTitle } from "%stanza/components/styled/InfoTitle";
import { StanzaWrapper } from "%stanza/components/styled/StanzaWrapper";
import { SubHeading } from "%stanza/components/styled/SubHeading";
import { TagList } from "%stanza/components/styled/TagList";

type Props = {
  strainId: string;
  strainName: string;
  infoSources: {
    label: string;
    url: string;
  }[];
  taxonomy: Nullable<{
    name: string;
    taxId: string;
    rank: string;
    authorityName: string;
    lineage: ComponentProps<typeof LineageList>["lineage"];
  }>;
};

export const StanzaView: FC<Props> = ({ strainId, strainName, infoSources, taxonomy }) => {
  return (
    <StanzaWrapper>
      <ColWrapper>
        <div>
          <InfoId>
            <span>Strain Id: </span>
            <span>{strainId}</span>
          </InfoId>
          <InfoTitle>{strainName}</InfoTitle>
          <SubHeading>{infoSources.length === 1 ? "Source strain" : "Source strains"}</SubHeading>
          <TagList>
            {infoSources.map((source, index) => (
              <ColorButton
                key={index}
                href={source.url}
                target={"_blank"}
                rel="noreferrer"
              >
                {source.label}
              </ColorButton>
            ))}
          </TagList>
          {taxonomy && (
            <div>
              <SubHeading>Taxonomic Lineage</SubHeading>
              <LineageList lineage={taxonomy.lineage} />
            </div>
          )}
        </div>
      </ColWrapper>
    </StanzaWrapper>
  );
};
