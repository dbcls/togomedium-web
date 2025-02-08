import React, { ComponentProps, FC } from "react";
import { InfoId } from "%stanza/components/styled/InfoId";
import { InfoTitle } from "%stanza/components/styled/InfoTitle";
import { StanzaWrapper } from "%stanza/components/styled/StanzaWrapper";
import { SubHeading } from "%stanza/components/styled/SubHeading";
import { RecipeComment } from "%stanza/stanzas/gmdb-medium-by-gmid/components/RecipeComment";
import { RecipeTable } from "%stanza/stanzas/gmdb-medium-by-gmid/components/RecipeTable";
import { decodeHTMLEntities } from "%stanza/utils/string";

type Props = {
  id: string | undefined;
  originalId: string | undefined;
  srcUrl: string | undefined;
  srcLabel: string | undefined;
  name: string | undefined;
  ph: string | undefined;
  components: ComponentRecipe[];
  extraComponents: ReferencingRecipe[];
};

export type RecipeTableProps = ComponentProps<typeof RecipeTable>;
export type RecipeCommentProps = ComponentProps<typeof RecipeComment>;
export type ComponentRecipe = RecipeTableProps | RecipeCommentProps;
export type ReferencingRecipe = { components: ComponentRecipe[]; id: string };

export const StanzaView: FC<Props> = ({
  id,
  originalId,
  srcUrl,
  srcLabel,
  name,
  ph,
  components,
  extraComponents,
}) => {
  return (
    <StanzaWrapper>
      <InfoId>
        <span>Growth Medium ID:&nbsp;</span>
        <span>{id}</span>
      </InfoId>
      {srcUrl && (
        <InfoId>
          <span>Information source:&nbsp;</span>
          <a
            href={srcUrl}
            target={"_blank"}
            rel="noreferrer"
          >
            {originalId || srcLabel || id}
          </a>
        </InfoId>
      )}
      <InfoTitle>
        [{id}] {name && name !== "(Unnamed medium)" && decodeHTMLEntities(name)}
        {ph && <small>(pH{ph})</small>}
      </InfoTitle>
      {components.length && (
        <>
          <SubHeading>Components</SubHeading>
          {components.map((component, index) => {
            if ("comment" in component) {
              return (
                <RecipeComment
                  key={index}
                  {...component}
                />
              );
            } else {
              return (
                <RecipeTable
                  key={index}
                  {...component}
                />
              );
            }
          })}
        </>
      )}

      {extraComponents.map((item, i) => {
        return (
          <div key={i}>
            {item.components.map((component, index) => {
              if (!component) return <></>;
              if ("comment" in component) {
                return (
                  <RecipeComment
                    key={index}
                    {...component}
                  />
                );
              } else {
                return (
                  <RecipeTable
                    key={index}
                    {...component}
                    referenceId={item.id}
                  />
                );
              }
            })}
          </div>
        );
      })}
    </StanzaWrapper>
  );
};
