import React, { FC } from "react";
import { ComponentDetailResponse } from "%api/componentDetail/definitions";
import { decodeHTMLEntities } from "%core/string/decodeHtmlEntities";
import { ColorButton } from "%stanza/components/styled/ColorButton";
import { ColWrapper } from "%stanza/components/styled/ColWrapper";
import { InfoId } from "%stanza/components/styled/InfoId";
import { InfoTitle } from "%stanza/components/styled/InfoTitle";
import { LinkList } from "%stanza/components/styled/LinkList";
import { StandardParagraph } from "%stanza/components/styled/StandardParagraph";
import { StanzaWrapper } from "%stanza/components/styled/StanzaWrapper";
import { SubHeading } from "%stanza/components/styled/SubHeading";
import { TagList } from "%stanza/components/styled/TagList";
import { WikipediaView } from "%stanza/components/styled/WikipediaView";
import { LinkInfo } from "%stanza/stanzas/gmdb-component-by-gmoid/functions/LinkLabelInfo";
import { WikipediaData } from "%stanza/utils/fetchWikipediaData";

type ComponentClass = ComponentDetailResponse["super_classes"][0];

type Props = {
  prefLabel: string;
  gmoId: string;
  altLabels: string[];
  properties: ComponentClass[];
  roles: ComponentClass[];
  superClasses: ComponentClass[];
  subClasses: ComponentClass[];
  links: LinkInfo[];
  wikipediaData?: WikipediaData;
};
export type ViewProps = Props;

export const StanzaView: FC<Props> = ({
  prefLabel,
  gmoId,
  altLabels,
  properties,
  roles,
  superClasses,
  subClasses,
  links,
  wikipediaData,
}) => {
  return (
    <StanzaWrapper>
      <ColWrapper>
        <div>
          <InfoId>
            <span>GMO ID: </span>
            <span>{gmoId}</span>
          </InfoId>
          <InfoTitle>{decodeHTMLEntities(prefLabel)}</InfoTitle>
          {!!altLabels.length && (
            <StandardParagraph>
              {altLabels.length === 1 ? "Alternative label" : "Alternative labels"}:
              <br />
              {altLabels.map((str, i, arr) => (
                <span key={str}>{`${decodeHTMLEntities(str)}${addLastComma(i, arr)}`}</span>
              ))}
            </StandardParagraph>
          )}
          <div>
            {!!properties.length && (
              <>
                <SubHeading>
                  {properties.length === 1 ? "Component type" : "Component types"}
                </SubHeading>
                <StandardParagraph>
                  {properties.map((item, i, arr) => (
                    <span key={i}>{`${item.label_en}${addLastComma(i, arr)}`}</span>
                  ))}
                </StandardParagraph>
              </>
            )}
            {!!roles.length && (
              <>
                <SubHeading>{roles.length === 1 ? "Role" : "Roles"}</SubHeading>
                <ul>
                  {roles.map((item, i) => (
                    <li key={i}>{item.label_en}</li>
                  ))}
                </ul>
              </>
            )}
            {!!superClasses.length && (
              <>
                <SubHeading>
                  {superClasses.length === 1 ? "Super class" : "Super classes"}
                </SubHeading>
                <LinkList>
                  {superClasses.map((item, i) => (
                    <li key={i}>
                      <a href={`/component/${item.gmo_id}`}>{item.gmo_id}</a>
                      <span>{decodeHTMLEntities(item.label_en)}</span>
                    </li>
                  ))}
                </LinkList>
              </>
            )}
            {!!subClasses.length && (
              <>
                <SubHeading>{subClasses.length === 1 ? "Sub class" : "Sub classes"}</SubHeading>
                <LinkList>
                  {subClasses.map((item, i) => (
                    <li key={i}>
                      <a href={`/component/${item.gmo_id}`}>{item.gmo_id}</a>
                      <span>{decodeHTMLEntities(item.label_en)}</span>
                    </li>
                  ))}
                </LinkList>
              </>
            )}
            {!!links.length && (
              <>
                <SubHeading>{links.length === 1 ? "External link" : "External links"}</SubHeading>
                <TagList>
                  {links.map((item, i) => (
                    <ColorButton
                      key={i}
                      href={item.uri}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.label}
                    </ColorButton>
                  ))}
                </TagList>
              </>
            )}
          </div>
        </div>
        {wikipediaData && <WikipediaView {...wikipediaData} />}
      </ColWrapper>
    </StanzaWrapper>
  );
};

const addLastComma = (index: number, arr: any[]): "" | ", " => {
  return index === arr.length - 1 ? "" : ", ";
};
