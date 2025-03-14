import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import React, { FC, useEffect, useMemo, useState } from "react";
import { THEME } from "%core/theme";
import { AngleLeftIcon } from "%stanza/components/icons/AngleLeftIcon";
import { AngleRightIcon } from "%stanza/components/icons/AngleRightIcon";
import { DoubleAngleLeftIcon } from "%stanza/components/icons/DoubleAngleLeftIcon";
import { DoubleAngleRightIcon } from "%stanza/components/icons/DoubleAngleRightIcon";
import { getPagination } from "%stanza/stanzas/gmdb-meta-list/utils/getPagination";

type Props = {
  total: number;
  offset: number;
  limit: number;
  setOffset: (offset: number) => void;
};

export const BottomController: FC<Props> = ({ total, offset, limit, setOffset }) => {
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);
  const currentPage = useMemo(() => Math.ceil(offset / limit) + 1, [offset, limit]);
  const [tempCurrentPage, setTempCurrentPage] = useState(currentPage);
  const pagination = useMemo(() => {
    return getPagination({ totalPages, currentPage: tempCurrentPage });
  }, [totalPages, currentPage, tempCurrentPage]);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const changePage = (page: number) => {
    setOffset((page - 1) * limit);
  };
  const commitPageInput = (val: number) => {
    if (val <= 0 || isNaN(val)) {
      changePage(1);
    } else if (val >= totalPages) {
      changePage(totalPages);
    } else {
      changePage(val);
    }
  };
  useEffect(() => {
    setTempCurrentPage(currentPage);
  }, [currentPage]);

  //
  if (totalPages <= 1) return null;
  return (
    <Wrapper>
      <Pagination>
        {!isFirst ? (
          <IconWrapper onClick={() => changePage(1)}>
            <DoubleAngleLeftIcon />
          </IconWrapper>
        ) : (
          <IconDummy />
        )}
        {!isFirst ? (
          <IconWrapper onClick={() => changePage(currentPage - 1)}>
            <AngleLeftIcon />
          </IconWrapper>
        ) : (
          <IconDummy />
        )}

        <PageNums>
          {pagination.map((p) => (
            <li
              key={p}
              onClick={() => {
                changePage(p);
              }}
              className={p === tempCurrentPage ? "active" : ""}
            >
              {p}
            </li>
          ))}
        </PageNums>
        {!isLast ? (
          <IconWrapper onClick={() => changePage(currentPage + 1)}>
            <AngleRightIcon />
          </IconWrapper>
        ) : (
          <IconDummy />
        )}
        {!isLast ? (
          <IconWrapper onClick={() => changePage(totalPages)}>
            <DoubleAngleRightIcon />
          </IconWrapper>
        ) : (
          <IconDummy />
        )}
      </Pagination>
      <Right>
        {totalPages > 5 && (
          <SliderWrapper>
            <StyledSlider
              value={tempCurrentPage}
              min={1}
              max={totalPages}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, v) => {
                setTempCurrentPage(v as number);
              }}
              onChangeCommitted={(e, v) => {
                changePage(v as number);
              }}
            />
          </SliderWrapper>
        )}
        <Info>
          <span>Page</span>
          <CurrentPageInput
            type={"number"}
            value={tempCurrentPage}
            onChange={(e) => {
              setTempCurrentPage(parseInt(e.target.value));
            }}
            onBlur={() => {
              commitPageInput(tempCurrentPage);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                commitPageInput(tempCurrentPage);
              }
            }}
          />
          <span>of {totalPages}</span>
        </Info>
      </Right>
    </Wrapper>
  );
};

const StyledSlider = styled(Slider)({
  color: THEME.STANZA_COLOR.PRIMARY,
});

const Wrapper = styled("div")({
  marginTop: 12,
  display: "flex",
  justifyContent: "space-between",
});

const CurrentPageInput = styled("input")({
  width: 64,
  display: "inline-block",
  marginInline: 8,
  paddingInline: 4,
});

const Right = styled("div")({
  display: "flex",
  gap: 20,
});

const Info = styled("div")({
  fontSize: "14px",
  whiteSpace: "nowrap",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const SliderWrapper = styled("div")({
  width: 240,
});

const Pagination = styled("div")({
  display: "flex",
  height: 26,
});

const IconWrapper = styled("div")({
  height: 24,
  width: 24,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  svg: {
    fill: THEME.COLOR.GRAY500,
    height: 18,
    width: "auto",
  },
});

const IconDummy = styled("div")({
  height: "24px",
  width: "24px",
});

const PageNums = styled("ul")({
  backgroundColor: THEME.STANZA_COLOR.PRIMARY,
  width: "fit-content",
  display: "flex",
  padding: "1px",
  gap: "1px",
  li: {
    backgroundColor: THEME.COLOR.WHITE,
    fontSize: "14px",
    minWidth: "28px",
    height: "24px",
    paddingInline: "2px",
    boxSizing: "border-box",
    lineHeight: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    "&.active": {
      backgroundColor: THEME.STANZA_COLOR.PRIMARY,
      color: THEME.COLOR.WHITE,
      fontWeight: "bold",
    },
  },
});
