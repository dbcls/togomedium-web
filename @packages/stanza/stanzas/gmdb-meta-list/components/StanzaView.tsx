import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { NotFound } from "%stanza/components/atoms/NotFound";
import { StanzaWrapper } from "%stanza/components/styled/StanzaWrapper";
import { BottomController } from "%stanza/stanzas/gmdb-meta-list/components/BottomController";
import { ListTable } from "%stanza/stanzas/gmdb-meta-list/components/ListTable";
import { LoadingCover } from "%stanza/stanzas/gmdb-meta-list/components/LoadingCover";
import { TopInfo } from "%stanza/stanzas/gmdb-meta-list/components/TopInfo";
import { ListApiBody } from "%stanza/stanzas/gmdb-meta-list/types";

type Props = {
  data: ListApiBody;
  title: string;
  showColumnNames: boolean;
  columnSizes: number[];
  offset: number;
  setOffset: (offset: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  showLoading: boolean;
  errorMessage: string;
};

export type StanzaViewParams = Props;

export const StanzaView: FC<Props> = ({
  data,
  title,
  showColumnNames,
  columnSizes,
  offset,
  setOffset,
  limit,
  setLimit,
  showLoading,
  errorMessage,
}) => {
  return (
    <div>
      {title && (
        <Header>
          <h2>{title}</h2>
        </Header>
      )}
      <StanzaWrapper>
        {data.contents.length === 0 ? (
          <NotFound />
        ) : (
          <>
            <TopInfo {...{ total: data.total, limit, setLimit, setOffset }} />
            <div style={{ position: "relative" }}>
              <ListTable {...{ data, showColumnNames, columnSizes, limit }} />
              <LoadingCover {...{ showLoading, errorMessage }} />
            </div>
            <BottomController {...{ total: data.total, offset, limit, setOffset }} />
          </>
        )}
      </StanzaWrapper>
    </div>
  );
};

const Header = styled("header")({
  h2: {
    WebkitFontSmoothing: "antialiased",
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "8px",
    paddingLeft: "8px",
  },
});
