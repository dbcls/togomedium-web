import { styled } from "@mui/material/styles";
import React, { FC, useEffect, useState } from "react";

type Props = {
  total: number;
  limit: number;
  setLimit: (val: number) => void;
  setOffset: (val: number) => void;
};

export const TopInfo: FC<Props> = ({ total, limit, setLimit, setOffset }) => {
  const [tempLimit, setTempLimit] = useState(limit);
  const onCommitLimit = (val: number) => {
    let newLimit = val;
    if (val < 1 || isNaN(val)) {
      newLimit = 1;
    } else if (val >= 100) {
      newLimit = 100;
    } else if (val > total) {
      newLimit = total;
    }
    setLimit(newLimit);
    setTempLimit(newLimit);
    setOffset(0);
  };
  useEffect(() => {
    setTempLimit(limit);
  }, [limit]);

  return (
    <Wrapper>
      <Total>Total: {total} items</Total>
      <span>/</span>
      <p>
        <span>Show</span>
        <NumInput
          type={"number"}
          value={tempLimit}
          onChange={(e) => {
            setTempLimit(parseInt(e.target.value));
          }}
          onBlur={() => {
            onCommitLimit(tempLimit);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onCommitLimit(tempLimit);
            }
          }}
        />
        <span>items per page</span>
      </p>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  fontSize: "14px",
  gap: "8px",
  paddingBottom: "4px",
  paddingRight: "8px",
  alignItems: "baseline",
});

const Total = styled("p")({
  display: "flex",
  alignItems: "center",
});

const NumInput = styled("input")({
  width: "48px",
  display: "inline-block",
  marginInline: "8px",
  paddingInline: "4px",
});
