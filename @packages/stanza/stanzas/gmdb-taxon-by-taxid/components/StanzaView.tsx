import { css } from "@emotion/react";
import React, { ComponentProps, FC } from "react";
import { AcceptsEmotion, Optional } from "yohak-tools";
import { CapsuleList } from "../../../components/info-detail/capsuleList";
import { LineageList } from "../../../components/info-detail/LineageList";
import {
  ColorButton,
  ColWrapper,
  InfoId,
  InfoTitle,
  StandardParagraph,
  SubHeading,
} from "../../../components/info-detail/styles";
import { WikipediaView } from "../../../components/info-detail/WikipediaView";
import { stanzaWrapper } from "../../../styles/common";
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
} & AcceptsEmotion;

export const StanzaView: FC<Props> = ({
  css,
  className,
  taxid,
  scientificName,
  authorityName,
  lineage,
  typeMaterials,
  otherTypeMaterials,
  wikipediaData,
}) => {
  return (
    <div
      css={[stanzaView, css, stanzaWrapper]}
      className={className}
    >
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
    </div>
  );
};

const stanzaView = css``;
