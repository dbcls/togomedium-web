import React, { ComponentProps, FC } from "react";
import { Optional } from "yohak-tools";
import { CapsuleList } from "%stanza/components/info-detail/CapsuleList";
import { LineageList } from "%stanza/components/info-detail/LineageList";
import { WikipediaView } from "%stanza/components/info-detail/WikipediaView";
import { ColorButton } from "%stanza/components/styled/ColorButton";
import { ColWrapper } from "%stanza/components/styled/ColWrapper";
import { InfoId } from "%stanza/components/styled/InfoId";
import { InfoTitle } from "%stanza/components/styled/InfoTitle";
import { StandardParagraph } from "%stanza/components/styled/StandardParagraph";
import { StanzaWrapper } from "%stanza/components/styled/StanzaWrapper";
import { SubHeading } from "%stanza/components/styled/SubHeading";
import { WikipediaData } from "%stanza/utils/fetchWikipediaData";

const linkNCBI = "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=";
const linkTogoGenome = "http://togogenome.org/organism/";

type Props = {
  taxid: string;
  scientificName: string;
  authorityName: Optional<string>;
  lineage: ComponentProps<typeof LineageList>["lineage"];
  typeMaterials: string[];
  otherTypeMaterials: { key: string; labels: string[] }[];
  wikipediaData?: WikipediaData;
};

export const StanzaView: FC<Props> = ({
  taxid,
  scientificName,
  authorityName,
  lineage,
  typeMaterials,
  otherTypeMaterials,
  wikipediaData,
}) => {
  return (
    <StanzaWrapper>
      <ColWrapper>
        <div>
          <InfoId>
            <span>Taxonomy ID: </span>
            <span>{taxid}</span>
            <div className={"tag-list"}>
              <ColorButton
                target="_blank"
                href={`${linkNCBI}${taxid}`}
                rel="noreferrer"
              >
                NCBI
              </ColorButton>
              <ColorButton
                target="_blank"
                href={`${linkTogoGenome}${taxid}`}
                rel="noreferrer"
              >
                TogoGenome
              </ColorButton>
            </div>
          </InfoId>
          <InfoTitle>{scientificName}</InfoTitle>
          {authorityName && (
            <StandardParagraph>
              Authority name:
              <br />
              {authorityName}
            </StandardParagraph>
          )}
          <div>
            <SubHeading>Lineage</SubHeading>
            <LineageList lineage={lineage} />
          </div>
          {!!typeMaterials.length && (
            <div>
              <SubHeading>Type strains</SubHeading>
              <CapsuleList labels={typeMaterials} />
            </div>
          )}
          {!!otherTypeMaterials.length && (
            <div>
              {otherTypeMaterials.map((mat, index) => (
                <div key={index}>
                  <SubHeading>Heterotypic synonyms: {mat.key} </SubHeading>
                  <CapsuleList labels={mat.labels} />
                </div>
              ))}
            </div>
          )}
        </div>
        {wikipediaData?.description && !lineage.species && <WikipediaView {...wikipediaData} />}
      </ColWrapper>
    </StanzaWrapper>
  );
};
